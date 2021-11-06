const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'nft-startup-330907',
  keyFilename: './keys/firestore-key-file.json',
});

module.exports = db