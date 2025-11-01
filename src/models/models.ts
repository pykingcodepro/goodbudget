import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    u_name: { type: String, require: true },
    u_email: { type: String, require: true },
    u_pass: { type: String, require: true },
    u_bal: { type: Number, require: true }
}, { timestamps: true });

// Export the User model either 
// 1. newly created (mongoose.model<IUser>("User", UserSchema)) or
// 2. already created one (mongoose.model.User).

export const User = models.User || model("User", UserSchema);

const CategorySchema = new Schema({
    c_name: {type: String, required: true},
    u_id: {type: Schema.ObjectId, ref: "User", required: true},
    c_type: {
        type: String,
        enum: [ "income", "expense" ],
    },
}, { timestamps: true });

export const Category = models.Category || model("Category", CategorySchema);

const TransactionSchema = new Schema({
    u_id: { type: Schema.ObjectId, require: true, ref: "User" },
    t_party: { type: String, require: true },
    t_amt: { type: Number, require: true },
    t_cat: { type: Schema.ObjectId, require: true, ref: "Category" },
    t_mode: { type: String, require: true },
    t_new_bal: { type: Number, require: true },
    t_desc: String
}, { timestamps: true });

export const Transaction = models.Transaction || model("Transaction", TransactionSchema);