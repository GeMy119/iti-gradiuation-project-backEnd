const statusCodes = require("http-status-codes");
const User = require("../../../connectionDB/user.schema");

const getUser = async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await User.findById(userId)

        if (!userId) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: "User ID is missing" });
        }
        if (!user || user.isDeleted) {
            res.status(statusCodes.NOT_FOUND).json({ message: "user is not founded" })
        }
        if (!user.isVerified) {
            res.status(statusCodes.FORBIDDEN).json({ message: "user is not verified" })
        }
        if (!user.isLogin) {
            res.status(statusCodes.FORBIDDEN).json({ message: "user is not login" })
        }
        console.log(user)
        res.status(statusCodes.OK).json({ message: "user:", user })

    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });
    }
}

const updateUser = async (req, res) => {

    try {
        const userId = req.params.userId; // Assuming userId is a parameter key
        const dataPayload = req.body;
        console.log(userId)
        if (!userId) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: "User ID is missing" });
        }
        if (Object.keys(dataPayload).length === 0) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: "No data provided for update" });
        }
        const user = await User.findByIdAndUpdate(userId, dataPayload, { new: true });
        res.status(statusCodes.OK).json({ message: "User updated", user });
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", error });
    }
}

const deleteSoftUser = async (req, res) => {
    try {
        const userId = req.params.userId
        if (!userId) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: "User ID is missing" });
        }
        User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true })
        res.status(statusCodes.OK).json({ message: "user deleted" })
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });
    }
}
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId
        if (!userId) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: "User ID is missing" });
        }
        User.findByIdAndDelete(userId)
        res.status(statusCodes.OK).json({ message: "user deleted" })
    } catch (error) {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });
    }
}


module.exports = { getUser, deleteSoftUser, updateUser, deleteUser }