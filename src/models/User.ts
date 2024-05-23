import mongoose, { Schema } from "mongoose";


const UserModel = new Schema({
  first_name: {type: String, require: true},
  last_name : {type: String, require: true},
  student_id: {type: String, require: true, unique: true},
  licenseKey: {type: String, require: true},
  img: {
        data   : Buffer,
        contentType: String,
  }
});

export const User = mongoose.model('User', UserModel);
