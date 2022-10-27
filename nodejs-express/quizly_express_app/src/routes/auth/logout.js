module.exports = (req, res) => {
    // Clear the stored JWT token
    res.cookie('jwtToken', '', { maxAge: 900000, httpOnly: true })
    res.redirect('/auth/login')
}