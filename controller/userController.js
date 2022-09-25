const User = require('../model/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config()
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    User.findOne({username: req.body.username}, async (err, user) => {
        if (err) {
            res.send({
                error: err
            })
        } else if (user === null) {
            res.status(400).send("Can't find user")
        } else {
            try {
                if (await bcrypt.compare(req.body.password, user.password)) {
                    const temp = {username: user.username, role: user.role}
                    const accessToken = jwt.sign(temp, process.env.JWT_SECRET)
                    res.cookie('jwt', accessToken, { httpOnly: true})
                    res.json({ 
                        message: 'success'
                    })
                } else {
                    res.json({
                        message: 'wrong login credentials'
                    })
                }
            } catch {
                res.status(500).send()
            }
        }
    })

}

exports.signup = async (req, res) => {
    User.findOne({username: req.body.username}, async (err, user) => {
        if (err) {
            res.send({
                error: err
            })
        } else if (user === null) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = new User()
            user.username = req.body.username
            user.password = hashedPassword
            user.role = req.body.role
            user.save((err) => {
                if (err) {
                    res.json({
                        message: 'failed to create account',
                        error: err
                    })
                } else {
                    res.json({
                        message: 'account created',
                        data: user
                    })
                }
            })
        } else {
            res.json({
                message: 'username already exists'
            })
        }
    })
}

exports.viewPosts = (req, res) => {
    res.send('Viewing posts as ' + req.user.username)
}

exports.viewAdmin = (req, res) => {
    res.send('Accessing Admin Page as ' + req.user.username + ' with role ' + req.user.role)
}

exports.viewPost = (req, res) => {
    res.send('Viewing posts by '+ req.params.username + ' as ' + req.user.username)
}

exports.logout = (req, res) => {
    res.clearCookie('jwt').send('Logged out')
}
