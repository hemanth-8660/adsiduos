
const cloudinary = require('cloudinary');
const logger = require('../utils/log4js').getLogger('FILE-UPLOAD');
const Models = require('../utils/mongo').getModels();
const {ObjectId} = require('mongodb')

module.exports.upload = async (req, res) => {
    console.log(req.user);
    try {
        const file = req.file;
        await Models.files.insertOne({
            originalFileName: file.originalname,
            size: file.size,
            secure_url: file.path,
            public_id: file.filename,
            views: 0,
            updatedAt: new Date(),
            userName: req.user.userName,
            uploadedBy: new ObjectId(req.user.id)
        })
        return res.status(200).json({
            secure_url: file.path,       // Cloudinary secure URL
            public_id: file.filename     // Public ID in Cloudinary
        });
    } catch (err) {
        logger.error(err.toString());
        return res.status(500).json({error: 'Something Went Wrong....'});
    }
}

module.exports.getAllFiles = async(req, res) => {
    let files;
    try {
        files = await Models.files.find({}).toArray();
    } catch (err) {
        logger.error(err.toString());
        return res.status(500).json({error: 'Internal Server Error...'});
    }
    logger.info('Successfully fetched all files....');
    return res.status(200).json(files);
}

module.exports.updateViewCount = async (req, res) => {
    const id = req.params.id;
    try {
        await Models.files.updateOne({_id: new ObjectId(id)}, {$inc:{views: 1}});
    } catch (err) {
        return res.status(500).json({error: err.toString()});
    } 
    logger.info('Updated File View Count Successfully...');
    return res.status(200).json({});
}


module.exports.search = async (req, res) => {
    const { tab, keyWord } = req.body;

    const query = [
      {
        $match: {
          $or: [
            { originalFileName: { $regex: keyWord, $options: 'i' } },
          ]
        }
      },
      {
        $addFields: {
          score: {
            $add: [
              {
                $cond: [
                  { $regexMatch: { input: "$originalFileName", regex: keyWord, options: "i" } },
                  10,
                  0
                ]
              },
              { $multiply: [0.1, "$views"] },
              {
                $divide: [
                  { $subtract: [new Date(), "$uploadedAt"] },
                  1000 * 60 * 60 * 24 // days ago
                ]
              }
            ]
          }
        }
      },
      { $sort: { score: -1 } },
      { $limit: 50 }
    ]
    
  if (tab === 'myFiles') {
    query[0].$match.uploadedBy = new ObjectId(req.user.id);
  }
  try {

    const results = await Models.files.aggregate(query).toArray();
    logger.info('Successfully Fetched Searched Files')
    return res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
}
