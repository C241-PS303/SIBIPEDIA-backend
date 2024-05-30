
const { Storage } = require('@google-cloud/storage');
require('dotenv').config()
const storage = require('../config/storage');

const getAllSibiAlphabet = async (bucketName, folderName) => {
    try {
        const bucket = storage.bucket(bucketName);
        const [files] = await bucket.getFiles({
          prefix: folderName + '/', 
        });
    
        const signedUrls = [];
        for (const file of files) {
          const [signedUrl] = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000, 
          });
          signedUrls.push({ name: file.name, image: signedUrl }); 
        }
    
        return {
          status: 200,
          message: 'All SIBI Alphabet retrieved successfully',
          data: signedUrls
        };
      } catch (err) {
        console.error('Error generating signed URLs:', err);
        throw err;
      }
    };

module.exports = {
    getAllSibiAlphabet
};
