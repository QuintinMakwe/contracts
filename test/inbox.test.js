const assert = require('assert');
const ganache = require('ganache-cli');
const { isRegExp } = require('util');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider)
const {interface, bytecode } = require('../compile');

let accounts;
let inbox

beforeEach(async ()=>{
    //get accounts
    accounts = await web3.eth.getAccounts();

    //deploy contract 
    inbox = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({data: bytecode, arguments: ['Hi there!']})
            .send({from: accounts[0], gas: 1000000})

})

describe('Inbox', ()=>{
    it('deploys a contractt', ()=>{
        assert.ok(inbox.options.address)
    })

    it('has a default message', async ()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!')
    })

    it('can change the message', async () => {
        await inbox.methods.setMessage('new message').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'new message')
    })
})