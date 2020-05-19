const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ROPSTEN_INFURA))

web3.eth.getTransactionCount(process.env.METAMASK_ETH2).then(console.log)


const EthereumTx = require('ethereumjs-tx').Transaction
const privateKey = Buffer.from(
  process.env.METAMASK_PRIV2,
  'hex',
)

const txParams = {
  nonce: web3.utils.numberToHex('17'),
  gasPrice: web3.utils.numberToHex('20000000000'),
  gasLimit: web3.utils.numberToHex('21000'),
  to: process.env.METAMASK_ETH1,
  value: web3.utils.numberToHex('110000000000000000'),
  data: '0x',
}

// The second parameter is not necessary if these values are used
const tx = new EthereumTx(txParams, { chain: 'ropsten', hardfork: 'petersburg' })
tx.sign(privateKey)
const serializedTx = tx.serialize()
console.log(tx)
console.log(serializedTx)

console.log(serializedTx.toString('hex'));
console.log('sender:', tx.getSenderAddress().toString('hex'))


web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
.on('receipt', console.log);

