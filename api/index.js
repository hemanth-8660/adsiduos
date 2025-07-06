require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('log4js').getLogger('INDEX');
const routes = require('../routes/index');
const Mongo = require('../utils/mongo');
const config = process.env;
const mongo = new Mongo(config.MONGO_URL);
const cors = require('cors');

mongo.connect().then(() => {
    logger.info('Connected to mongo...');
}).catch((err) => {
    logger.error(err.toString());
})

app.use(express.json({limit: '20mb'}));

// allwoing frontend to hit api's
app.use(cors({
    origin: ['https://adsiduos-admin.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD']
}));
app.options('*',cors()) // handling preflight

routes(app);

app.listen(config.PORT, () => {
    console.log(`Server ready on port ${config.PORT}.`)
})
module.exports = app;
