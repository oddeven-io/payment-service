const db = require('./firestore');

const awaitPaymentQuery = db.collection('Transactions').where('minting_state', '==', 'await_payment');

const awaitPaymentObserver = awaitPaymentQuery.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        let doc = change.doc

        if (change.type === 'added') {
            console.log('New transaction: ', doc.data());
            onNewTransaction(doc);
        }
    });
}, err => {
    console.log(`Encountered error: ${err}`)
});

async function onNewTransaction(doc) {
    await listenForWalletTransaction(doc)
    updateTransactionToMinting(doc);
    await mintNFT(doc);
    updateTransactionToMinted(doc)
}

async function listenForWalletTransaction(doc) {
    let lovelaceAmount = doc.data()['amount_lovelace']
    console.log(`listening for wallet changes for lovelace amount: ${lovelaceAmount}`)
    const result = await resolveAfter2Seconds();
    console.log(`received funds for lovelace amount: ${lovelaceAmount}`);
}

function updateTransactionToMinting(doc) {
    let senderWalletAddres = "test_addr1asgasdfasdfjasdgh";
    doc.ref.update({ minting_state: "minting", sender_wallet_address: senderWalletAddres });
    console.log(`set minting_state to minting for id: ${doc.id}`);
}

function updateTransactionToMinted(doc) {
    doc.ref.update({ minting_state: "minted"});
    console.log(`set minting_state to minted for id: ${doc.id}`);
}

async function mintNFT(doc) {
    const res = await doc.ref.get();
    const senderWalletAddress = res.data()['sender_wallet_address'];
    console.log(`start minting NFT for wallet address: ${senderWalletAddress}`);
    resolveAfter2Seconds();
    console.log('minting NFT completed');
}

function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  }
  