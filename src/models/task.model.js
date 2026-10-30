import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	title: {
		type: String,
		required: true,
	},
	isChecked: {
		type: Boolean,
		default: false,
	},
});

export default mongoose.model("Task", taskSchema);
