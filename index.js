const express = require('express');
const app = express();
const config = require('./utils/config');
const logger = require('log4js').getLogger('INDEX');
const PORT = config.PORT;
const routes = require('./routes/index');
const Mongo = require('./utils/mongo');

const mongo = new Mongo();
mongo.connect().then(() => {
    logger.info('Connected to mongo...');
}).catch((err) => {
    logger.error(err.toString());
})

app.use(express.json({limit: '20mb'}));

// allwoing frontend to hit api's
app.use(require('cors')({origin: '*'}));
routes(app);

app.listen(config.PORT, () => {
    logger.info('Server Listening At ' + config.PORT);
})
