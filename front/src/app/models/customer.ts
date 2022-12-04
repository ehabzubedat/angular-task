import { Types } from 'mongoose';
import { Task } from './task';

export interface Customer {
    _id: Types.ObjectId,
    name: string,
    occupation: String,
    phone: String,
    email: String,
    tasks: Array<Task>
}