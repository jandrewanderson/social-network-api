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
        const updatedUser = await User.updateOne(req.params.userId);
        res.status(200).json(updatedUser);
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.deleteOne(req.params.userId);
        res.status(200).json(deletedUser);
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
const addFriend = async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
const deleteFriend = async (req, res) => {
    try {
    
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