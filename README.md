# Decentralized Exchange with Automated Market Makers

Decentralized Exchange to Swap ERC20 tokens for ETH using Automated Market Makers. Deposit / Withdraw Liquidity. 


This is a PoC decentralized exchange (like uniswap) that serves to exchange ERC20 tokes for eth. Currently version is working with a single token (injected in the constructor at deploying time). This project have the purpose of learning how about how DApps work. By building this project I learned:

- How to code a ERC20 Token
- How to sent ERC20 tokens
- How Liquidity Pools Work
- How Automated Market Makers work
- How to use payable functions
- How to interact with metamask
- How to interact with Smart Contracts from a webapp
- How to deploy contracts to a public testnet

## Project Structure

It is structured in two main folders: ************************UI************************ and ************************Contracts.************************ 

The **UI folder** has a frontend project vite + tailwind and the web3 library is implemented twice: one implementation using ******************ether.js******************  and the other one using **web3.js**. 

On the other side the ********************************Contracts folder******************************** contain a truffle project with the **Token.sol** and **Dex.sol** contracts.
