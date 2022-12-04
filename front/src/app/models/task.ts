import { Types } from "mongoose";

export interface Task {
    _id: Types.ObjectId;
    customer?: String | Types.ObjectId;
    description: String,
    isDone: Boolean,
    createdAt: Date,
}