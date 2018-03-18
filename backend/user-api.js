const users = require('./database/users');
const express = require('express')
const auth = require('./auth')();
const multer = require('multer');
const cloudinary = require('cloudinary');
const fs = require('fs');

const UPLOADS_FOLDER = 'uploads';
const upload = multer({ dest: `${UPLOADS_FOLDER}/` });

cloudinary.config({
  cloud_name: 'dkw3mduxl',
  api_key: '292767666371397',
  api_secret: '5xN65n3aU7B87Kntoa0g-60h_gI'
});

const router = express.Router()

router.use(auth.initialize());

router.get('/me', auth.authenticate(), async (req, res) => {
  const id = req.user.id;
  const result = await users.readOne(id);
  if (result.error) {
    res.status(result.code).json(result.error);
  } else {
    res.json(result);
  }
});

router.patch('/me', auth.authenticate(), async (req, res) => {
  const id = req.user.id;
  let user = await users.readOne(id);
  const { name, password } = req.body;

  if (name) {
    user.name = name;
  }

  if (password) {
    user.password = password;
    user = await users.preparePotentialUser(user);
  }

  const result = await users.update(id, user);
  if (result.error) {
    res.status(result.code).json(result.error);
  } else {
    res.json(result);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await users.readOne(id);
  if (result.error) {
    res.status(result.code).json(result.error);
  } else {
    res.json(result);
  }
});

router.post('/me/profile', [auth.authenticate(), upload.single('avatar')], async (req, res) => {
  const id = req.user.id;
  let user = await users.readOne(id);

  const fileToUpload = `${UPLOADS_FOLDER}/${req.file.filename}`;
  cloudinary.uploader.upload(fileToUpload, async (result) => {
    user.image = result.url;
    await users.update(id, user)

    fs.unlink(fileToUpload, (err) => { if (err) { console.log('Error deleting file: ' + err); } });
    res.send();
  });
});

module.exports = router
