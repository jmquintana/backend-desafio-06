import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
		},
		email: {
			type: String,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
