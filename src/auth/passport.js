import passport from "passport";
import local from "passport-local";
import userModel from "../models/users.model.js";
import { createHash, isValidPassword } from "../utils.js";

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
					console.log({ linea: 18, first_name, last_name, email, age, role });
					console.log(username);
					let user = await userModel.findOne({ email: username });
					console.log(user);
					if (user) {
						console.log("User already exists");
						return done(null, false);
					}

					const newUser = {
						first_name,
						last_name,
						email,
						age,
						role,
						password: createHash(password),
					};

					let result = await userModel.create(newUser);
					console.log(result);

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
