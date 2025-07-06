const jwtToken = require('jsonwebtoken');
const {SECRET_KEY} = require('../utils/config');
const logger = require('../utils/log4js').getLogger('AUTHENTICATION');
// const Models = require('../utils/mongo').getModels();

const authMiddleWare = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        logger.error('No Token Provided');
        return res.status(401).json({error: 'Token Is Missing'});
    }
    const token = authHeader.split('Bearer ')[1];

    let decodedObj;
    try {
        decodedObj = jwtToken.verify(token, SECRET_KEY); 
        if (decodedObj) {
            req.user = decodedObj;
        }
    } catch (err) {
        logger.error(err.toString());
        return res.status(401).json({'error': 'Token Verification Failed'});
    }
    next();
};

module.exports = authMiddleWare;
