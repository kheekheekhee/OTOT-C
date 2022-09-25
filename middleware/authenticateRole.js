const authenticateRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        res.status(403)
        return res.send('Not allowed')
    }
    next()
}

module.exports = authenticateRole