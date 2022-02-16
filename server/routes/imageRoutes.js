const express = require('express');
const controller = require('../controllers/controller');
const multer = require('multer');

const upload = multer({
    dest: 'uploads/'
});

const router = express.Router();

router.get('/', controller.getImages);
router.get('/image/:id', controller.getImage);
router.get('/getImageInfo/:id', controller.getImageInfo);
router.post('/', upload.single('image'), controller.uploadImage);

module.exports = router;