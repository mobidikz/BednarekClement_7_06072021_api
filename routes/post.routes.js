const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require('multer');
const upload = multer();

router.get('/', postController.readPost);
router.post('/', upload.single('file'), postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

// likes
router.patch('/:id/like', postController.likePost);

//comments
router.post('/:id/comment', postController.commentPost);
router.put('/:postId/comment/:id', postController.editCommentPost);
router.delete('/:postId/comment/:id', postController.deleteCommentPost);

module.exports = router;