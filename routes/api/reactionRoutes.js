const router = require('express').Router();
const {
    createReaction,
    deleteReaction
} = require('../../controllers/reactionController.js');

router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;