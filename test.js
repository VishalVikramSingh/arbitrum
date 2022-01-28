var Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction;

web3 = new Web3(new Web3.providers.HttpProvider('https://arb1.arbitrum.io/rpc'));


var gasPrice = "2";//or get with web3.eth.gasPrice
var gasLimit = 3000000;
var addr = "0x32bcd8b5D657928de06eeB5F9f2F08c9ccC3C76c";
var toAddress = "0x98389A05B6C4aee2706b881707d520FcE3b03d34";
var amountToSend = "1";
var nonce = web3.eth.getTransactionCount(addr); //211;


var rawTransaction = {
"from": addr,
"nonce": web3.utils.toHex(nonce),
"gasPrice": web3.utils.toHex(gasPrice * 1e9),
"gasLimit": web3.utils.toHex(gasLimit),
"to": toAddress,
"value": web3.utils.toHex(amountToSend) ,
"chainId": 42161 //remember to change this
};


var privateKey = 'my private key without 0x suffix';
var privKey = Buffer.from(privateKey, 'hex');
console.log("privKey  : ", privKey);
var tx = new Tx(rawTransaction);
tx.sign(privKey);
var serializedTx = tx.serialize();
console.log('serializedTx : '+serializedTx);
web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
if (!err)
{
console.log('Txn Sent and hash is '+hash);
}
else
{
console.error(err);
}
});
