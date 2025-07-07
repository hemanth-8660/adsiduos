// require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('log4js').getLogger('INDEX');
const Mongo = require('../utils/mongo');
const routes = require('../routes/index');
const cors = require('cors');
app.use(cors());

const config = process.env;
const mongo = new Mongo(config.MONGO_URL);

app.use((req, res, next) => {
    mongo.connect().then(() => {
        logger.info('Connected to mongo...');
        next();
    }).catch((err) => {
        logger.error(err.toString());
    })
})

app.use(express.json({limit: '20mb'}));

app.get('/', (req, res) => {
    return res.send('Express on Vercel')
})
routes(app);
app.listen(config.PORT, () => {
    console.log(`Server ready on port ${config.PORT}.`)
})
module.exports = app;
