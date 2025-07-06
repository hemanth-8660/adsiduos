const jwtMiddleWare = require('../authentication/auth-middleware');
const users = require('./users');
const media = require('./media');

module.exports = (app) => {
    // Route registration
    app.use('/api/v1', users);
    app.use('/api/v1', jwtMiddleWare, media);
};
