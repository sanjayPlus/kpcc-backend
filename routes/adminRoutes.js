const router = require('express').Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploads = multer({ storage: storage }).single('file');


router.post('/login', adminController.login);

router.get('/get-bearers',adminController.getBearers);
router.get('/get-blogs',adminController.getBlogs);
router.get('/get-organizations',adminController.getOrganizations);


router.post('/add-bearers', uploads,adminAuth,adminController.addBearers);
router.post('/add-blogs', uploads,adminAuth,adminController.addBlogs);
router.post('/add-organizations', uploads,adminAuth,adminController.addOrganizations);

// router.post('/update-bearers', adminAuth,adminController.updateBearers);
// router.post('/update-blogs', adminAuth,adminController.updateBlogs);

router.post('/delete-bearers', adminAuth,adminController.deleteBearers);
router.post('/delete-blogs', adminAuth,adminController.deleteBlogs);
router.post('/delete-organizations', adminAuth,adminController.deleteOrganizations);

module.exports = router; 