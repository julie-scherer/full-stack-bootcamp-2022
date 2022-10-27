module.exports = function(app){
    app.use('/auth', require('./auth'))
    app.use('/', require('./dashboard'))
    app.use('/quiz', require('./quiz'))
}