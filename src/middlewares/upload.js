const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(
      null,
      new Date().getTime() +
        '' +
        Math.round(Math.random() * 1000000000) +
        '.' +
        //เอานามสกุลไฟล์มาด้วย
        file.mimetype.split('/')[1]
    );
  },
});

module.exports = multer({ storage });
