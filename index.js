const db = require('./firestore');

const awaitPaymentQuery = db.collection('Transactions').where('minting_state', '==', 'await_payment');

const awaitPaymentObserver = awaitPaymentQuery.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        let doc = change.doc

        if (change.type === 'added') {
            console.log('new transaction: ', doc.data());
            onNewTransaction(doc);
        }
    });
}, err => {
    console.log(`Encountered error: ${err}`)
});

async function onNewTransaction(doc) {
    await listenForWalletTransaction(doc)
    updateTransactionToPaymentReceived(doc);
}

async function listenForWalletTransaction(doc) {
    let lovelaceAmount = doc.data()['amount_lovelace']
    console.log(`listening for wallet changes for lovelace amount: ${lovelaceAmount}`)
    const _ = await resolveAfter5Seconds();
    console.log(`received funds for lovelace amount: ${lovelaceAmount}`);
}

function updateTransactionToPaymentReceived(doc) {
    let senderWalletAddres = "test_addr1asgasdfasdfjasdgh";
    doc.ref.update({ minting_state: "payment_received", sender_wallet_address: senderWalletAddres });
    console.log(`set minting_state to payment_received for id: ${doc.id}`);
}

function resolveAfter5Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 5000);
    });
}

  