const HDwalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDwalletProvider(
    'idea journey track just wish health melt couch gallery casual safe game',
    'https://rinkeby.infura.io/v3/a6b0b1853cbb4f18804c9ce62676e228'
);

const web3 = new Web3(provider);

(async function(){  
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account ', accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: '0x' + bytecode, arguments: ['Hi there!']}) // add 0x bytecode
        .send({from: accounts[0]});

    console.log('contract deployed to ', result.options.address)
})()     