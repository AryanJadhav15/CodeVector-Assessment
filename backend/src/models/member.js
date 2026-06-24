import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["Basic", "Premium", "Elite"],
        },
        duration: {
            type: Number,
            required: true,
            enum: [1, 3, 6, 12],
        },
        price: {
            type: Number,
            required: true,
        },
        joinDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

memberSchema.index({ category: 1 });
memberSchema.index({ duration: 1 });
memberSchema.index({ price: 1 });
memberSchema.index({ joinDate: -1 });

const MemberModel = mongoose.model("Member", memberSchema);

export default MemberModel;
