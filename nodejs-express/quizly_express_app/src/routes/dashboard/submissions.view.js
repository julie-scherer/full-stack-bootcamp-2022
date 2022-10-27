module.exports = (req, res) => {
    res.render('submissions', { user: req.verifiedUser.user })
}
