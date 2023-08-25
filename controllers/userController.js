const { User } = require('../models/Social');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
      console.log("Something went wrong!!")
    }
  },
  async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
      console.log("Something went wrong!!")
    }
  },
  async deleteUser(req, res) {
    try {
      const dbUserData = await User.deleteOne(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
      console.log("Something went wrong!!")
    }
  }
};
