const storage = require('../storage/storage');
const multer = require('multer');
const upload = multer({storage});
const express = require('express');
const router = express.Router();
const media = require('../controllers/media');

router.route('/upload').post(upload.single('file'), media.upload);
router.route('/getAllFiles').get(media.getAllFiles);
router.route('/files/:id/view').patch(media.updateViewCount);
router.route('/search').post(media.search);

module.exports = router;