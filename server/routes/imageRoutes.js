const express = require('express');
const controller = require('../controllers/controller');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
});

const router = express.Router();

router.get('/', controller.getImages);
router.get('/getImageInfo/:id', controller.getImageInfo);
router.post('/', upload.single('image'), controller.uploadImage);

module.exports = router;