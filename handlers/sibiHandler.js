const storage = require('../config/storage');

const getAllSibiAlphabet = async (bucketName, folderName) => {
  try {
    const bucket = storage.bucket(bucketName);
    const [files] = await bucket.getFiles({
      prefix: folderName + '/',
    });

    const signedUrls = [];
    const validExtensions = ['.png', '.jpg', '.jpeg', '.gif']; 

    console.log(`Found files in ${folderName}:`, files.map(file => file.name));

    for (const file of files) {
  
      if (!file.name.endsWith('/') && validExtensions.some(ext => file.name.endsWith(ext))) {
        const [signedUrl] = await file.getSignedUrl({
          action: 'read',
          expires: Date.now() + 15 * 60 * 1000, 
        });
        const fileName = file.name.split('/').pop().split('.')[0];
        signedUrls.push({ name: fileName, image: signedUrl });
        console.log(`File included: ${file.name}`);
      } else {
        console.log(`File excluded: ${file.name}`);
      }
    }

    return {
      status: 200,
      message: 'All SIBI Words retrieved successfully',
      data: signedUrls,
    };
  } catch (err) {
    console.error('Error generating signed URLs:', err);
    throw err;
  }
};

const getAllSibiWords = async (bucketName, folderName) => {
  try {
    const bucket = storage.bucket(bucketName);
    const [files] = await bucket.getFiles({
      prefix: folderName + '/',
    });

    const signedUrls = [];
    const validExtensions = ['.png', '.jpg', '.jpeg', '.gif']; 

    console.log(`Found files in ${folderName}:`, files.map(file => file.name));

    for (const file of files) {
      if (!file.name.endsWith('/') && validExtensions.some(ext => file.name.endsWith(ext))) {
        const [signedUrl] = await file.getSignedUrl({
          action: 'read',
          expires: Date.now() + 15 * 60 * 1000, 
        });
        const fileName = file.name.split('/').pop().split('.')[0];
        signedUrls.push({ name: fileName, image: signedUrl });
        console.log(`File included: ${file.name}`);
      } else {
        console.log(`File excluded: ${file.name}`);
      }
    }

    return {
      status: 200,
      message: 'All SIBI Words retrieved successfully',
      data: signedUrls,
    };
  } catch (err) {
    console.error('Error generating signed URLs:', err);
    throw err;
  }
};
  

module.exports = {
    getAllSibiAlphabet,
    getAllSibiWords
};
