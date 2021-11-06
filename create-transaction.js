const db = require('./firestore');

async function setDocument(db) {
    const data = {
        amount_lovelace: '5123456',
        description: 'My third Space Bud',
        ipfs_hash: 'some hash value',
        minting_state: 'started',
        title: 'Space Bud 3'
    };

    // Add a new document in collection "transactions" with ID 'new_transaction'
    const res = await db.collection('Transactions').doc('new_transaction').set(data);    

    console.log('Set: ', res)
}

setDocument(db)

