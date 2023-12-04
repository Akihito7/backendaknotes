const multer = require('multer');

const memoryStorage = multer.memoryStorage();

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: memoryStorage, 
  memoryStorage: memoryStorage,
});

module.exports = upload;