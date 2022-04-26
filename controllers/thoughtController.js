const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');
const { updateUser } = require('./userController');

const getThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        res.status(200).json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
const createThought = async (req, res) => {
    try {
        const createdThought = await Thought.create(req.body);
        const updatedUser = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $addToSet: {thoughts: createdThought} },
            { runValidators: true, new: true },
        )
        res.status(200).json(createdThought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
const updateThought = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true },
            );
        const updatedUser = await User.findOne(
            {username: updatedThought.username}
        );
        await updatedUser.thoughts.id(req.params.thoughtId).remove();
        await updatedUser.thoughts.push(updatedThought);
        await updatedUser.save((err) => console.error(err));
        res.status(200).json(updatedThought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
const deleteThought = async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(
            {_id: req.params.thoughtId}
            );
        const updatedUser = await User.findOne(
            {username: deletedThought.username}
        );
        await updatedUser.thoughts.id(req.params.thoughtId).remove();
        await updatedUser.save((err) => console.error(err));
        res.status(200).json(deletedThought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
const createReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate({ _id: req.params.thoughtId});
        console.log(thought);
        await thought.reactions.push(req.body)
        await thought.save((err) => console.error(err))
        const updatedUser = await User.findOne(
            {username: thought.username}
        );
        await updatedUser.thoughts.id(req.params.thoughtId).remove();
        await updatedUser.thoughts.push(thought);
        await updatedUser.save((err) => console.error(err));
        res.status(200).json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
const deleteReaction = async (req, res) => {
    try {
        const thought = await Thought.findById({ _id: req.params.thoughtId});
        await thought.reactions.id(req.params.reactionId).remove()
        await thought.save((err) => console.error(err));
        const updatedUser = await User.findOne(
            {username: thought.username}
        );
        await updatedUser.thoughts.id(req.params.thoughtId).remove();
        await updatedUser.thoughts.push(thought);
        await updatedUser.save((err) => console.error(err));
        res.status(200).json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

module.exports = {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
}