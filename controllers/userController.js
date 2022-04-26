const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200).json(user);
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
const createUser = async (req, res) => {
    try {
        const createdUser = await User.create(req.body);
        res.status(200).json(createdUser);
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.userId},
            { $set: req.body },
            { runValidators: true, new: true }
        );
        res.status(200).json(updatedUser);
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.deleteOne(
            {_id: req.params.userId}
        );
        res.status(200).json(deletedUser);
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
const addFriend = async (req, res) => {
    try {
        const addedFriend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true, runValidators: true,},
        );
        res.status(200).json(addedFriend);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
const deleteFriend = async (req, res) => {
    try {
        const deletedFriend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true, runValidators: true,},
        );
        res.status(200).json(deletedFriend);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
}