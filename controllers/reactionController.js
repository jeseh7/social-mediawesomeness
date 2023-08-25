const { Thought } = require('../models/Social');

module.exports = {
  // create a new user
  async createReaction(req, res) {
    try {
      const dbReactionData = await Reaction.create(req.body);
      const thought = await Thought.findOneAndUpdate(
        { _id: req.body.thoughtId },
        { $push: { reactions: dbReactionData.reactionId } },
        { new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'reaction created, but no thoughts with this ID' });
      }

      res.json(dbReactionData);
    } catch (err) {
      res.status(500).json({message: 'Something went wrong!'});
      console.log("Something went wrong!!")
    }
  },
  async deleteReaction(req, res) {
    try {
      const dbReactionData = await Reaction.deleteOne(req.body);
      res.json(dbReactionData);
    } catch (err) {
      res.status(500).json(err);
      console.log("Something went wrong!!")
    }
  }
};