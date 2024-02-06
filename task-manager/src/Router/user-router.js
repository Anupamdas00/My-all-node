const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");
const { sendWelcomeMail } = require("../emails/account");
const { sendGoodByeMail } = require('../emails/account')


const app = express();
app.use(express.json());

const upload = multer({
  limit: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      cb(new Error("Select valid file"));
    }

    cb(undefined, true);
  },
});

router.post(
  "/user/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => { 

    const buffer = await sharp(req.file.buffer).resize(350, 300).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ msg: error.message });
  }
);

router.delete('/user/me/avatar', auth, (req, res) => {
  req.user.avatar = undefined;
  req.user.save();
  res.send();
})


router.get('/user/:id/avatar', async (req, res) => {
  try{
    const user = await User.findById(req.params.id);
    if(!user || !user.avatar){
      throw new Error('Content Not Available')
    }
    res.set('Content-Type', 'image/jpg');
    res.send(user.avatar)
  }catch(e){
    res.status(404).send(e)
  }

})

router.post("/user", async (req, res) => {
  const user = new User(req.body);
  try {
    const saveUser = await user.save();
    const jwtToken = await saveUser.generateAuthToken();
    if (!saveUser && !jwtToken) {
      return res.status(501).send();
    }
    sendWelcomeMail(saveUser.name, saveUser.email)
    res.status(201).send({ user, token: jwtToken });
  } catch (e) {
    res.status(500).send("Email aleady exist!");
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredential(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    if (!user) {
      return res.status(404).send("Not Registered!");
    }
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send("Logout succesful!");
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
});

router.post("/user/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("Loggout From All Device!");
  } catch (e) {
    res.status(500).send("Something went wrong!");
  }
});

router.post("/user/me", auth, (req, res) => {
  res.send(req.user);
});

router.get("/user", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(204).send("Data does not exist");
    }
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send();
  }
});

// router.get('/user/me',auth,async (req, res) => {
//   try{
//     const user = req.user;
//     res.send(user);
//   }catch(e){
//     res.status(500).send()
//   }
// })

router.get("/user/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      res.status(501).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/user/me", auth, async (req, res) => {
  const newDataToUpdate = Object.keys(req.body);
  const allowedToUpdata = ["name", "age", "email", "password"];
  const isValidToUpdate = newDataToUpdate.every((item) =>
    allowedToUpdata.includes(item)
  );

  if (!isValidToUpdate) {
    return res.status(400).send("Invalid Updates");
  }

  try {
    newDataToUpdate.forEach(
      (keyData) => (req.user[keyData] = req.body[keyData])
    );
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
    
});

router.delete("/user/me", auth, async (req, res) => {
  try {
    const userToDelete = await User.findById({ _id: req.user._id });
    await userToDelete.deleteOne();
    sendGoodByeMail(req.user.name, req.user.email)
    res.send(userToDelete);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

// router.post('/user/me/avatar')

module.exports = router;
