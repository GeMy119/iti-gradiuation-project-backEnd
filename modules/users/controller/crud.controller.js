const { StatusCodes } = require("http-status-codes");
const User = require("../../../connectionDB/user.schema");
const cloud = require("../../../connectionDB/config");

const getUser = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User ID is missing" });
        }
        const user = await User.findById(userId).select("-password").populate(["hotelId", "restaurantId", "visitPlaceId", "carId", "eventId"]);

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        }
        res.status(StatusCodes.OK).json({ message: "User:", user });
    } catch (error) {
        console.error("Error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error: error.message });
    }
};
const getAllUsers = async (req, res) => {
    try {
        // let { page, size } = req.query;
        // if (!page) {
        //     page = 1;
        // }
        // if (!size) {
        //     size = 15;
        // }

        // const limit = parseInt(size);
        // const skip = (page - 1) * size;

        const allUsers = await User.find({ isDeleted: false }).select("-password")

        // const all = await User.countDocuments({ isDeleted: false });
        // const allPages = Math.ceil(all / limit);

        res.status(StatusCodes.OK).json({ message: "All users:", allUsers });
    } catch (error) {
        console.error("Error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error: error.message });
    }
};
const getAllUsersDeleted = async (req, res) => {
    try {
        // let { page, size } = req.query;
        // if (!page) {
        //     page = 1;
        // }
        // if (!size) {
        //     size = 15;
        // }
        // const limit = parseInt(size);
        // const skip = (page - 1) * size;
        const allUsersDeleted = await User.find({ isDeleted: true }).select("-password");
        // const all = await User.countDocuments({ isDeleted: true });
        // const allPages = Math.ceil(all / limit);
        res.status(StatusCodes.OK).json({ message: "All users deleted:", allUsersDeleted });
    } catch (error) {
        console.error("Error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error: error.message });
    }
};
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const dataPayload = req.body;
        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User ID is missing" });
        }
        if (Object.keys(dataPayload).length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "No data provided for update" });
        }
        const user = await User.findByIdAndUpdate(userId, dataPayload, { new: true });
        res.status(StatusCodes.OK).json({ message: "User updated", user });
    } catch (error) {
        console.error("Error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", error: error.message });
    }
};
const deleteSoftUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User ID is missing" });
        }
        await User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
        res.status(StatusCodes.OK).json({ message: "User soft-deleted" });
    } catch (error) {
        console.error("Error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error: error.message });
    }
};
const unDeleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User ID is missing" });
        }
        await User.findByIdAndUpdate(userId, { isDeleted: false }, { new: true });
        res.status(StatusCodes.OK).json({ message: "User unDeleted" });
    } catch (error) {
        console.error("Error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error: error.message });
    }
};
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User ID is missing" });
        }
        await User.findByIdAndDelete(userId);
        res.status(StatusCodes.OK).json({ message: "User deleted" });
    } catch (error) {
        console.error("Error:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error: error.message });
    }
};
const addNewAdmin = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User not found" });
        }
        user.role = "admin";
        await user.save();

        res.status(StatusCodes.OK).json({ message: "User role updated to admin" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error: error.message });
    }
};
const removeAdmin = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User not found" });
        }

        user.role = "user";
        await user.save();

        res.status(StatusCodes.OK).json({ message: "Admin role removed" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error: error.message });
    }
};
const getAllAdmins = async (req, res) => {
    try {
        const allAdmins = await User.find({ role: "admin" });

        if (!allAdmins || allAdmins.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "No admins found" });
        }

        res.status(StatusCodes.OK).json({ message: "All admins:", admins: allAdmins });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error: error.message });
    }
};
const uploadImageProfile = async (req, res) => {
    try {
        const id = req.user.id;

        // Check if the user with the provided ID exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        }

        // Check if the user is logged in (adjust the condition based on your authentication method)
        if (!user.isLogin) {
            return res.status(StatusCodes.FORBIDDEN).json({ message: "Login first" });
        }

        // Assuming you have Multer configured correctly, you can access the uploaded file using req.file
        if (!req.file) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "No file uploaded" });
        }
        const result = await cloud(req.file.path)
        // Assuming you have a Post model defined and it contains a 'photo' field
        // Update the user's profile picture
        const updatedUser = await User.findByIdAndUpdate(id, {
            image: result.secure_url, // Adjust the path accordingly
        });

        // Check if the update was successful
        if (!updatedUser) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to update profile" });
        }

        res.status(StatusCodes.OK).json({ message: "Profile Updated" });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};
const searchUser = async (req, res) => {
    const { searchChar } = req.query;
    try {
        // Use find to retrieve all documents that match the partialUsername

        const searchCriteria = {
            userName: { $regex: new RegExp(searchChar, 'i') },
        };
        const users = await User.find(searchCriteria);

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'Users not found' });
        }

        return res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = {
    getUser,
    deleteSoftUser,
    updateProfile,
    deleteUser,
    getAllUsers,
    getAllUsersDeleted,
    addNewAdmin,
    getAllAdmins,
    removeAdmin,
    uploadImageProfile,
    unDeleteUser,
    searchUser
};
