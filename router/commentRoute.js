const express = require('express');
const auth = require('../auth/checkAuth');
const router = express.Router();
const commentController = require('../controller/commentController');

router.post('/add',auth,commentController.add);

router.get('/getCommentByPost/:id',auth,commentController.getCommentByPost);

router.delete('/deletComment/:id',auth,commentController.deleteComment);

router.put('/update',auth,commentController.updateComment);


module.exports = router;