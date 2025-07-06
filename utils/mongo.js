const { MONGO_URL } = require('./config');
const { MongoClient } = require('mongodb');
const logger = require('log4js').getLogger('MONGO');
const config = require('./config');
let models = {};
// add all the collection into models object

class Mongo {
    
    constructor (uri) {
        this.uri = config.MONGO_URL;
    }

    async connect () {
        let db, client;

        try {
            client = await MongoClient.connect(this.uri)
            db = client.db('ads');
            logger.info('Connection Established Succesfully!!!');

            models.users = db.collection('users');
            models.files = db.collection('files');

            logger.debug('Generated all Models');
        } catch (err) {
            logger.error(err.toString());
            process.exit(1);
        }
    }

    static getModels() {
        return models;
    }
    
    
}

module.exports = Mongo ;