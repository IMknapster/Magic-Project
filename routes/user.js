const User = require("../models/User");


const router = require("express").Router();


const Cryptojs=require('crypto-js');

// SignUp

router.post('/signup', async (req, res) => {
    const user = User({
        name: req.body.name,
        email: req.body.email,
        password:Cryptojs.AES.encrypt(req.body.password,process.env.PASS_SEC).toString()
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ message: error.mssg });
    }
})


// Login

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne(
            {
                name: req.body.name
            }
        );

        if(!user)
         return res.status(401).json("Wrong User Name");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
console.log(user.name);

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;
        
        if(originalPassword != inputPassword )
           return res.status(401).json("Wrong Password");

       return res.status(200).json(user);

    }catch(err){
       return res.status(500).json(err);
    }

});

//UPDATE
router.put("/:id",  async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id",  async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json("User has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET USER
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET ALL USER
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});



module.exports = router;
