const express = require('express');
const postController = require('./controller/post');
const Auth = require('./middlware/auth');

const router = express.Router();


//Post CURD routes
router.get('/todos', postController.get_posts);
router.post('/todos', postController.add_post);
router.get('/todos/:id', postController.add_post);
router.put('/todos', postController.edit_post);
router.delete('/todos', postController.delete_post);






module.exports = router;