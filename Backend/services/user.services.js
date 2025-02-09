import { User } from '../models/users.model.js';
import jwt from 'jsonwebtoken';
import { Vendor } from '../models/vendor.model.js';
import bcrypt from 'bcrypt';
// import dotenv from 'dotenv';
// dotenv.config();

export class UserService {
  static async signIn(data) {
    try {
      const { email, password } = data;
      const user = await User.findOne({ email });
      if (user) {
        const status = bcrypt.compareSync(password, user.password);
        if (status) {
          const secretKey = 'gdbjsbhgdyebfh';
          const token = jwt.sign(
            { _id: user._id, email: user.email, role: user.role },
            secretKey,
            { expiresIn: '1h' }
          );

          return { "success": true, token, user };
        } else {
          return { "success": false, "message": 'Invalid password' };
        }
      } else {
        return { "success": false, "message": 'Invalid email id' };
      }
    } catch (err) {
      console.log(err);
      return { success: false, message: 'Internal Server Error' };
    }
  }

  static async signUp(data) {
    try {
      const saltKey = bcrypt.genSaltSync(10);
      const encryptedPassword = bcrypt.hashSync(data.password, saltKey);
      data.password = encryptedPassword;

      const isExist = await User.findOne({ email: data.email });

      if (isExist) {
        return { success: false, message: 'Email already in use' };
      }

      let user = await User.create(data);
      let admin_regex = /^[a-zA-Z0-9._%+-]+@haritbazaar\.com$/;
      if (admin_regex.test(data.email)) {
        user = await User.findByIdAndUpdate({ _id: user._id }, { role: 'admin' },{new: true});
      }
      if (user) {
        const secretKey = 'gdbjsbhgdyebfh';
        const token = jwt.sign(
          { _id: user._id, email: user.email, role: user.role },
          secretKey,
          { expiresIn: '1h' }
        );

        return { success: true, token, user };
      } else {
        return { success: false, message: 'Unable to create user' };
      }
    } catch (err) {
      console.log(err);
      return { success: false, message: 'Services Internal Server Error' };
    }
  }

  static async findByEmail(email) {
    try {
      let user = await User.findOne({ email });
      if (user) return user || null;
    } catch (err) {
      console.log(err);
    }
  }

  static async updatePassword(email, password) {
    try {
      const saltKey = bcrypt.genSaltSync(10);
      const encryptedPassword = bcrypt.hashSync(password, saltKey);
      password = encryptedPassword;
      let user = await User.updateOne({ email }, { password });
      if (user) return user || null;
    } catch (err) {
      console.log(err);
    }
  }

  static async showUsers() {
    try {
      const users = await User.find({},{password:0,isActive:0});
      return users ? users : false;
    } catch (err) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default UserService;
