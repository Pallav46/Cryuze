const User = require("../models/userModel");

exports.createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to create user" });
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch users" });
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updateUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, data: updateUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to update user" });
    }
}
