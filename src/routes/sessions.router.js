import { Router } from "express";
import userModel from "../models/users.model.js";

const router = Router();

router.post("/register", async (req, res) => {
	try {
		const { username, password, email } = req.body;
		// define user
		const user = {
			username,
			password,
			email,
		};
		console.log({ user });

		// check if user exists
		const userExists = await userModel.findOne({ email });
		if (userExists) {
			return res
				.status(400)
				.send({ status: "Error", error: "User already exists" });
		}

		// create user
		await userModel.create(user);
		return res
			.status(201)
			.send({ status: "Success", message: "User registered!" });
	} catch (error) {
		console.log(error);
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		// check if user exists
		const user = await userModel.findOne({ email, password });

		if (!user) {
			return res
				.status(400)
				.send({ status: "Error", error: "Invalid credentials" });
		}

		// create session
		req.session.user = { username: user.username, email: user.email };

		return res.status(200).send({
			status: "Success",
			message: "Logged in!",
			payload: req.session.user,
		});
	} catch (error) {
		console.error(error);
	}
});

router.get("/failRegister", (req, res) => {
	console.log("Failed Register");
	return res.send({ status: "error", error: "authentication error" });
});

router.get("/failLogin", (req, res) => {
	res.send({ status: "error", error: "failed login" });
});

export default router;
