require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('log4js').getLogger('INDEX');
const Mongo = require('../utils/mongo');

const cors = require('cors');
app.use(cors({
    origin: ['https://adsiduos-admin.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD']
}));
app.options('*',cors()) // handling preflight

const routes = require('../routes/index');
const config = process.env;
const mongo = new Mongo(config.MONGO_URL);


mongo.connect().then(() => {
    logger.info('Connected to mongo...');
}).catch((err) => {
    logger.error(err.toString());
})

app.use(express.json({limit: '20mb'}));

routes(app);
app.get('/', (req, res) => {
    return res.send('Express on Vercel')
})

app.listen(config.PORT, () => {
    console.log(`Server ready on port ${config.PORT}.`)
})
module.exports = app;
