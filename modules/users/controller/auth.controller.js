const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../../../connectionDB/user.schema");
const bcrypt = require("bcrypt");
const transporter  = require("../../../config/sendEmail");
// const  transporter  = require("../../../config/sendEmail");

const register = async (req, res) => {
    try {
        const { userName, email, password, gender, cPassword, age, phone, address } = req.body;
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        // console.log(existingUser)
        if (existingUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Email is already registered" });
        }
        // Check if the provided password matches the confirm password
        if (password !== cPassword) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Password and confirm password do not match" });
        }
        // Create a new user document
        const newUser = new User({
            userName,
            email,
            password,
            age,
            phone,
            address,
            gender
        });
        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY)
        const mailOptions = {
            from: '"verify your account 👻" <foo@example.com>',
            to: `${email}`,
            subject: 'Verification Email',
            text: `Please verify your email address by clicking on the link below:`,
            html: `<div>
                   <a href="https://itigradiuation.onrender.com/verifyAccount/${token}">verify</a>
                    </div>`, // html body
        };

        // Send the email.
       await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error sending email:', error);
              // Handle the error and return a response to the client
              return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error sending verification email", error });
            } else {
              console.log('Email sent:', info.response);
              // Send a success response to the client
              res.status(StatusCodes.CREATED).json({ message: "Registration successful", token });
            }
          });
        await newUser.save();

        res.status(StatusCodes.CREATED).json({ message: "Registration successful"});
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Check if the user exists and is not deleted
        if (!user || user.isDeleted) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Email is not found or user is deleted" });
        }
        // Check if the password matches
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Password is incorrect" });
        }

        // Check if the user is verified
        // if (!user.isVerified) {
        //     return res.status(StatusCodes.FORBIDDEN).json({ message: "Email is not verified" });
        // }

        // Sign a token with user information
        const token = jwt.sign(
            {
                id: user._id,
                userName: user.userName,
                isVerified: user.isVerified,
                isDeleted: user.isDeleted,
                isLogin: user.isLogin,
                role: user.role
            },
            process.env.JWT_SECRET_KEY
            // { expiresIn: '10h' } // Set a reasonable token expiration time
        );

        // Update the user's login status
        user.isLogin = true;
        await user.save();

        res.status(StatusCodes.OK).json({ message: "Welcome", token });
    } catch (error) {
        // Handle errors and log them for debugging
        console.error("Login error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });
    }
};
const resetPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const id = req.params.id;

        // Check if currentPassword and newPassword are provided
        // if (!currentPassword || !newPassword) {
        //     return res.status(StatusCodes.BAD_REQUEST).json({ message: "Both currentPassword and newPassword are required" });
        // }

        // Find the user by ID
        const userData = await User.findById(id);

        if (!userData) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        }

        // Compare the provided currentPassword with the stored hash
        const isPasswordMatch = await bcrypt.compare(currentPassword, userData.password);

        if (isPasswordMatch) {
            // Hash the new password
            // const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update the user's password
            userData.password = newPassword;
            await userData.save();

            // Return success response
            return res.status(StatusCodes.OK).json({ message: "Password updated" });
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Password does not match" });
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};
const verifyAccount = async (req, res) => {
    try {
        const token = req.params.token; // Extract the token from the request parameters

        if (!token) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Token is missing." });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findOne({ email: decodedToken.email });

        if (user) {
            await User.updateOne({ email: decodedToken.email }, { isVerified: true });
            return res.status(StatusCodes.OK).json({ message: "Your account is now verified. You can log in." });
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid verification token." });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" })
    }
}
module.exports = { register, login, resetPassword, verifyAccount };
