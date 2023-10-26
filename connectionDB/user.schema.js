
const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    cPassword: { type: String, required: true, ref: "passowrd" },
    role: { type: String, default: "user", enum: ["user", "admin", "superAdmin"] },
    isLogin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false }
},
    {
        timestamps: true
    }
)

const User = mongoose.model("user", userSchema)
module.exports = User;