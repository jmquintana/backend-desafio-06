import passport from "passport";
import local from "passport-local";
import userModel from "../models/users.model.js";
import { cartsModel } from "../models/carts.model.js";
import CartsManager from "../controllers/carts.js";
import { createHash, isValidPassword } from "../utils.js";

const cartsManager = new CartsManager();
const LocalStrategy = local.Strategy;
const initializePassport = () => {
	passport.use(
		"register",
		new LocalStrategy(
			{
				passReqToCallback: true,
				usernameField: "email",
			},
			async (req, username, password, done) => {
				try {
					const { first_name, last_name, email, age, role } = req.body;
					let user = await userModel.findOne({ email: username });
					console.log("linea 20", { user });
					if (user) {
						console.log("User already exists");
						return done(null, false);
					}

					const cart = await cartsManager.addCart({ products: [] });
					const cartId = cart._id;
					console.log("linea 23", { cartId });

					const newUser = {
						first_name,
						last_name,
						email,
						age,
						role,
						cartId,
						password: createHash(password),
					};

					let result = await userModel.create(newUser);

					return done(null, result);
				} catch (error) {
					return done("Error when trying to find user:" + error);
				}
			}
		)
	);

	passport.use(
		"login",
		new LocalStrategy(
			{ usernameField: "email" },
			async (username, password, done) => {
				try {
					const user = await userModel.findOne({ email: username });
					if (!user) return done(null, false);

					if (!isValidPassword(user, password)) return done(null, false);

					return done(null, user);
				} catch (error) {
					return done(error);
				}
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser(async (id, done) => {
		let user = await userModel.findById(id);
		done(null, user);
	});
};

export default initializePassport;
