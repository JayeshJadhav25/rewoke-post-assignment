const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
const auth = require('../auth/checkAuth');

router.post('/create',auth,postController.createPost);

router.get('/get',auth,postController.get);

router.delete('/delete/:id',auth,postController.deletePost);

router.put('/update/:id',auth,postController.update);


router.delete('/delete/:id',(req,res) => {
    console.log('delete post',req.params);
    
})

module.exports = router;