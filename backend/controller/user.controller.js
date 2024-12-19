import User from "../model/user.model.js";

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const allUsers = await User.find({ _id: { $ne: loggedInUserId } })

        res.status(200).json(allUsers)
    } catch (error) {
        console.error("Error in getUserForSidebar: ", error.message);

        res.status(500).json({ error: "Internal server error" })
    }
}