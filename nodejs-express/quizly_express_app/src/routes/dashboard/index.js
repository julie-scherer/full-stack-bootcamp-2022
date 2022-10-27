const MainDashboardRouter = require("express").Router();

MainDashboardRouter.route('/')
    .get(require('./dashboard.view'))

MainDashboardRouter.route('/submissions')
    .get(require('./submissions.view'))

module.exports = MainDashboardRouter