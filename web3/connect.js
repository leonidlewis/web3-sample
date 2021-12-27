import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider';

import { InjectedConnector } from '@web3-react/injected-connector'
export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
})
let web3;


function startApp(provider) {
    if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
    }
}

function handleChainChanged(_chainId) {
    console.log('chainId--', _chainId)
}
export const conMetaMask = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
        startApp(provider);
        web3 = new Web3(Web3.givenProvider);
        console.log('222222', web3)
    } else {
        console.log('Please install MetaMask!');
    }
    const chainId = await ethereum.request({ method: 'eth_chainId' });

    ethereum.on('chainChanged', handleChainChanged);

    handleChainChanged(chainId);

    try {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        return accounts[0];
    } catch (error) {
        console.log('connet error----', error)
    }
}

export const disConnectMetaMask = () => {
    ethereum.on('disconnect');
}
const tokenABI = [{
    "constant": true,
    "inputs": [
        {
            "name": "_owner",
            "type": "address"
        }
    ],
    "name": "balanceOf",
    "outputs": [
        {
            "name": "balance",
            "type": "uint256"
        }
    ],
    "payable": false,
    "type": "function"
}];
const tokenAddresses = [{
    address: '0xCEE1042e662aD23f0b7DD7FBBFCDc01d7F88dcd7',
    token: 'ATHL'
}, {
    address: '0x6157fa53E48A726303ab0ca793eD66B23787abC5',
    token: 'ATHL'
}]
export const userBalance = async (address) => {
    tokenAddresses.map((token) => {
        const tokenIns = new web3.eth.Contract(tokenABI, token.address);
        const givenTokenBalance = tokenIns.methods.balanceOf(address).call();
        console.log('givenTokenBalance', givenTokenBalance)
    }
    )
    const balance = await web3.eth.getBalance(address);
    const weiBalance = web3.utils.fromWei(balance, 'ether');
    console.log(weiBalance);
    return weiBalance;
}