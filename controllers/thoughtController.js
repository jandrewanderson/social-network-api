const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

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
        res.status(200).json(createdThought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
const updateThought = async (req, res) => {
    try {
        const updatedThought = await Thought.updateOne(req.params.thoughtId);
        res.status(200).json(updatedThought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
const deleteThought = async (req, res) => {
    try {
        const deletedThought = await Thought.deleteOne(req.params.thoughtId);
        res.status(200).json(deletedThought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
const createReaction = async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
const deleteReaction = async (req, res) => {
    try {
        
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