const {StatusCodes} = require("http-status-codes");
const User = require("../../../connectionDB/user.schema");

const getUser = async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await User.findById(userId).select("-password")

        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User ID is missing" });
        }
        // if (!user || user.isDeleted) {
        //     res.status(StatusCodes.NOT_FOUND).json({ message: "user is not founded" })
        // }
        // if (!user.isVerified) {
        //     res.status(StatusCodes.FORBIDDEN).json({ message: "user is not verified" })
        // }
        // if (!user.isLogin) {
        //     res.status(StatusCodes.FORBIDDEN).json({ message: "user is not login" })
        // }
        console.log(user)
        res.status(StatusCodes.OK).json({ message: "user:", user })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });
    }
}
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({ isDeleted: false }).select("-password");
        console.log(allUsers)
        if (allUsers) {
            res.status(StatusCodes.OK).json({ message: "All users:", allUsers });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: "No users found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error: error.message });
    }
};


const updateProfile = async (req, res) => {

    try {
        const userId = req.params.userId; // Assuming userId is a parameter key
        const dataPayload = req.body;
        console.log(userId)
        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User ID is missing" });
        }
        if (Object.keys(dataPayload).length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "No data provided for update" });
        }
        const user = await User.findByIdAndUpdate(userId, dataPayload, { new: true });
        res.status(StatusCodes.OK).json({ message: "User updated", user });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", error });
    }
}

const deleteSoftUser = async (req, res) => {
    try {
        const userId = req.params.userId
        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User ID is missing" });
        }
        User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true })
        res.status(StatusCodes.OK).json({ message: "user deleted" })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });
    }
}
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId
        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User ID is missing" });
        }
        User.findByIdAndDelete(userId)
        res.status(StatusCodes.OK).json({ message: "user deleted" })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });
    }
}


module.exports = { getUser, deleteSoftUser, updateProfile, deleteUser,getAllUsers }