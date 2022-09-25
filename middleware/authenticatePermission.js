const ROLE = require("../common/roles")

const authenticatePermission = (req, res, next) => {
    if (req.user.role !== ROLE.ADMIN && req.user.username !== req.params.username) {
        res.status(403).send('Not allowed')
    }
    next()
}

module.exports = authenticatePermission