const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt ? req.cookies.jwt : null
    if (token === null) {
        return res.status(401).send('You need to sign in')
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Access denied')
        }
        req.user = user
        next()
    })
}

module.exports = authenticateToken