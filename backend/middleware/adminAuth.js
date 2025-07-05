import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const adminAuth = async(req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not authorization login again ",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    const email = token_decode.slice(0, process.env.ADMIN_EMAIL.length); 
    const user =await userModel.findOne({email})
    console.log(user);
    if(!user){
      return res.json({
        success: false,
        message: "Not authorization login again ",
      });
    }
    
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
