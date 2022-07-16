/**********************************************************************
* This program assumes you have an account(wallet) the test validator
* knows about it, and the account has sufficient funds.
* It also assumes you have deployed your on-chain program.
* You should see the on-chain entry point message in the terminal
* running 'solana logs' when you run this client.
*
* It may also assume you have deployed TWO different versions of
* the on-chain program, each under different program ids.
*
* To find out if your program(s) are deployed on the test validator,
* make sure you're running it in one window, and in another window,
* Enter:   "solana program show --programs"
**********************************************************************/
const solanaWeb3 = require('@solana/web3.js');
const Connection = solanaWeb3.Connection;
const Keypair = solanaWeb3.Keypair;
const Transaction = solanaWeb3.Transaction;
const TransactionInstruction = solanaWeb3.TransactionInstruction;

const wallet = Keypair.fromSecretKey(
  new Uint8Array([
    //the numbers go here (343, 234, 23, etc)
  ])
);

/************************************************************
* you can run either the old or new deployed program
* by just commenting out one of these below.
* (latest or old/original prog id keypair.
************************************************************/
/*
// fill this by copy-pasting what you have in your deployed program keypair json file, but
// DONT copy the brackets, just the numbers and commas
// the deployed program keypair json file should have same name as and be in
// same directory as the deployed eBPF  blahblah.so lib file.
//deployed program keypair
//
// latest program id (deployment)
const program = Keypair.fromSecretKey(
  new Uint8Array([
    //the numbers go here (343, 234, 23, etc)
  ])
);
*/


// fill this by copy-pasting what you have in your deployed program keypair json file, but
// DONT copy the brackets, just the numbers and commas
// the deployed program keypair json file should have same name as and be in
// same directory as the deployed eBPF  blahblah.so lib file.
//deployed program keypair
//
// old/original program id (deployment)
const program = Keypair.fromSecretKey(
  new Uint8Array([
    //the numbers go here (343, 234, 23, etc)
  ])
);

let accountKeypairString = '';
let theKeys = [];
if (process.argv.length > 2) {
  accountKeypairString = process.argv[2];
  let keypair = Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(accountKeypairString))
  );
  console.log(keypair);
  let thePublicKey = keypair.publicKey;
  console.log(thePublicKey);
  theKeys = [{ pubkey: thePublicKey }];
}
console.log(theKeys);


let theInstruction = 'Not Set.';
if (process.argv.length > 3) {
  console.log('\nThe Instruction: ', process.argv[3]);
  theInstruction = process.argv[3];
}

(async () => {
  console.log('Establishing Connection...');
  let rpcUrl = 'http://localhost:8899';
  let connection = new Connection(rpcUrl, 'confirmed');

  console.log('Get Version...');
  const version = await connection.getVersion()
  console.log('Version: ', version);

  let instruction = new TransactionInstruction({
    programId: program.publicKey,
    //keys: [{ pubkey: Keypair.generate().publicKey }],
    //keys: [{ pubkey: thePublicKey }],
    keys: theKeys,
    data: Buffer.from(theInstruction)
  })
  let transaction = new Transaction();
  transaction.add(instruction);

  await connection.sendTransaction(transaction, [wallet]);

  console.log('Done.');

})()
