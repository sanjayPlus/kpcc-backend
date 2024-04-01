const router = require('express').Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');
const multer = require('multer');

// Bearers
const BearersStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      // destination is used to specify the path of the directory in which the files have to be stored
      cb(null, "./public/bearersImage");
    },
    filename: function (req, file, cb) {
      // It is the filename that is given to the saved file.
      const uniqueSuffix =Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}-${file.originalname}`);
      console.log(`${uniqueSuffix}-${file.originalname}`);
      // console.log(file);
    },
  });
  
  // Configure storage engine instead of dest object.
  const BearersImage = multer({
    storage: BearersStorage,
    limits: {
      fileSize: 20 * 1024 * 1024, // 20MB in bytes
    },
  });

//blog
const BlogStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      // destination is used to specify the path of the directory in which the files have to be stored
      cb(null, "./public/blogImage");
    },
    filename: function (req, file, cb) {
      // It is the filename that is given to the saved file.
      const uniqueSuffix =Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}-${file.originalname}`);
      console.log(`${uniqueSuffix}-${file.originalname}`);
      // console.log(file);
    },
  });
  
  // Configure storage engine instead of dest object.
  const BlogImage = multer({
    storage: BearersStorage,
    limits: {
      fileSize: 20 * 1024 * 1024, // 20MB in bytes
    },
  });

//organizations
const OrganizationStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      // destination is used to specify the path of the directory in which the files have to be stored
      cb(null, "./public/organizationsImage");
    },
    filename: function (req, file, cb) {
      // It is the filename that is given to the saved file.
      const uniqueSuffix =Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}-${file.originalname}`);
      console.log(`${uniqueSuffix}-${file.originalname}`);
      // console.log(file);
    },
  });
  
  // Configure storage engine instead of dest object.
  const OrganizationImage = multer({
    storage: BearersStorage,
    limits: {
      fileSize: 20 * 1024 * 1024, // 20MB in bytes
    },
  });


router.post('/login', adminController.login);

router.get('/get-bearers', adminAuth, adminController.getBearers);
router.get('/get-blogs', adminAuth, adminController.getBlogs);
router.get('/get-organizations', adminAuth, adminController.getOrganizations);
router.get('/protected', adminAuth, adminController.Protected);


router.post('/add-bearers', BearersImage.single('image'),adminAuth,adminController.addBearers);
router.post('/add-blogs', BlogImage.single('image'),adminAuth,adminController.addBlogs);
router.post('/add-organizations',OrganizationImage.single('image'), adminAuth,adminController.addOrganizations);

// router.post('/update-bearers', adminAuth,adminController.updateBearers);
// router.post('/update-blogs', adminAuth,adminController.updateBlogs);

router.post('/delete-bearers/:id', adminAuth,adminController.deleteBearers);
router.post('/delete-blogs/:id', adminAuth,adminController.deleteBlogs);
router.post('/delete-organizations/:id', adminAuth,adminController.deleteOrganizations);

module.exports = router; 