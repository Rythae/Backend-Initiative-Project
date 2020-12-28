const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let users = []

router.get('/', function (req, res) {
    res.status(200).json(users)
})

router.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = { name: req.body.name, password: hashedPassword };

    users.push(user);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/login', async (req, res) => {
    try {
         const user = users.find((user) => user.name === req.body.name);
         if (user === null) {
           return res.status(404).send("User does not exist");
         }
        if (await bcrypt.compare(req.body.password, user.password)) {
                const name = req.body.name;
                const accessToken = jwt.sign(
                  user,
                  process.env.ACCESS_TOKEN_SECRET
                );
                res.json({  name: name, accessToken: accessToken });
                res.status(201).send("success"); 
        }    
    } catch (error) {
        res.status(500).send('User not allowed')
    }
})

module.exports = router;