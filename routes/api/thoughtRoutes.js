const router = require('express').Router();
const {
  getAllThoughts,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser
} = require('../../controllers/thoughtController.js');

router.route('/').get(getAllThoughts);

router.route('/:thoughtId').get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;