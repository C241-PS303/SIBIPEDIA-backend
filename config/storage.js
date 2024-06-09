const { Storage } = require('@google-cloud/storage');

const hardcodedCredentials = {
    
};

const storage = new Storage({
  credentials: hardcodedCredentials,
});

module.exports = storage;
