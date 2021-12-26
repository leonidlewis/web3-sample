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

export const userBalance = async => {
    
}