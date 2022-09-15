import mongoose, { Schema, Types } from "mongoose";

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  links: [{type: Types.ObjectId, ref: 'Link'}]
});

export default mongoose.model('User', schema);