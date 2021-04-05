const express = require("express");

const googleAuth = require("../middleware/googleAuth");
const User = require("../../db/models/user");
const Tag = require('../../db/models/tag');

const router = new express.Router();

router.post("/googleAuth", googleAuth, async (req, res) => {
        const requiredUser = req.user;
        try {
                const user = await User.findOne({
                        firstName: requiredUser.firstName,
                        lastName: requiredUser.lastName,
                        email: requiredUser.email
                });
                if (user) {
                        res.status(200).send({ user });
                } else {
                        const newUser = new User(requiredUser);
                        newUser.save();
                        res.status(201).send({ user: newUser });
                }
        } catch (e) {
                res.status(500).send({
                        error: e
                });
        }
});

router.post('/tag', googleAuth, async (req, res) => {
        const tag = new Tag({
                _id: req.body.tag
        })
        try{
                await tag.save()
                res.status(201).send({ tag })
        }catch(e){
                res.status(409).send({ error: e })
        }
})

router.get('/all_tags', googleAuth, async (req, res) => {
        try{
                const tagList = await Tag.find({})
                res.send({ tagList })
        }catch(e){
                res.status(404).send({ error: e })
        }
})

module.exports = router;
