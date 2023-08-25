const { Thought, User } = require('../models/Social');

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'thought created, but no users with this ID' });
      }

      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
      console.log("Something went wrong!!")
    }
  },
  async updateThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(req.body);
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
      console.log("Something went wrong!!")
    }
  },
  async deleteThought(req, res) {
    try {
      const dbThoughtData = await Thought.deleteOne(req.body);
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
      console.log("Something went wrong!!")
    }
  }
};