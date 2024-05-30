const { Storage } = require('@google-cloud/storage');
require('dotenv').config()

const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, 
  projectId: 'capstone-testing-424513', 
});

module.exports = storage;
