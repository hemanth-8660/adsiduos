const Models = require('../utils/mongo').getModels();

const jwtToken = require('jsonwebtoken')
const logger = require('../utils/log4js').getLogger('USERS');
const bcrypt = require('bcrypt');
const { SECRET_KEY } = require('../utils/config');

module.exports.register = async (req, res) => {
    const { email, userName, password } = req.body;

    if (!email) {
        logger.error('Missing email');
        res.status(401);
        return res.json({error: 'Missing email'})
    }
    if (!userName) {
        logger.error('Missing username');
        res.status(401);
        return res.json({error: 'Missing username'})
    }
    if (!password) {
        logger.error('Missing password');
        res.status(401);
        return res.json({error: 'Missing Password'})
    }
    let userExists;
    try {
        userExists = await Models.users.findOne({ email });
    } catch (err) {
        logger.error(err.toString());
    }

    if (userExists) {
        logger.error('User Already Exists');
        return res.status(400).json({error: 'User Already Exists'});
    }

    const hashPassword = await bcrypt.hash(password, 10);
    try {
        await Models.users.insertOne({
            email,
            userName,
            password: hashPassword
        });
    } catch (err) {
        logger.error({ error: err.toString()});
        return res.status(500).json({ error: 'Internal Server Error'});
    }
    logger.info('User Created Successfully...')
    return res.status(200).json({message: 'User Created Successfully...'});
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    let user;
    try {
        user = await Models.users.findOne({email});

        if (!user) {
            logger.info('User Not Found');
            res.status(401);
            return res.json({error: 'User Not Found'});
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            logger.error('Incorrect Password...');
            res.status(401);
            return res.json({error: 'Incorrect Password...'});
        }

        // generate token
        const payload = {
            id: user._id,
            email: user.email,
            userName: user.userName
        }
        const token = await jwtToken.sign(payload, SECRET_KEY, { expiresIn: '2h' });
        delete user.password;
        user.token = token;
        logger.info("login Successful ");
        return res.status(200).json(user);
    } catch (err) {
        logger.error(err.toString());
        return res.status(500).json({error: 'Internal Server Error...'});
    }
}