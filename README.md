# Decentralized Exchange with Automated Market Makers

Decentralized Exchange to Swap ERC20 tokens for ETH using Automated Market Makers. Deposit / Withdraw Liquidity. 

![---](https://raw.githubusercontent.com/alcalawil/DEX-ERC20-AMM/master/ui/Screen%20Shot%202022-10-25%20at%2019.43.44.png "x")
[]()


This is a PoC decentralized exchange (like uniswap) that serves to exchange ERC20 tokes for eth. Currently version is working with a single token (injected in the constructor at deploying time). This project have the purpose of learning how about how DApps work. By building this project I learned:

- *How to code a ERC20 Token*
- *How to sent ERC20 tokens*
- *How Liquidity Pools Work*
- *How Automated Market Makers work*
- *How to use payable functions*
- *How to interact with metamask*
- *How to interact with Smart Contracts from a webapp*
- *How to deploy contracts to a public testnet*

## Project Structure

It is structured in two main folders: ***UI*** and ***Contracts.*** 

The ***UI folder*** has a frontend project vite + tailwind and the web3 library is implemented twice: one implementation using **ether.js**  and the other one using **web3.js**. 

On the other side the ***Contracts folder*** contain a truffle project with the **Token.sol** and **Dex.sol** contracts.

## How to run

Make sure you have truffle installed.

You will need a Infura key if you want to  order to deploy the contracts, but if you want to run a local blockchain (e.g ganache) you only have to make sure your the port it is running is the same as in the truffle-config.js (e.g port: 7545). 

***Deploy the Contracts*** 

```bash
npm install

truflle compile

truflle deploy --network development
```

After deploying the contracts your deployer address will have a ton of ERC20 tokens that were minted at deploying stage.

***Run the frontend DApp***

go to the UI folder and follow the README instructions.

**NOTE:** You have to put the deployed addresses in the following file:
`/ui/packages/dapp-final/src/config/ping-contract.js`

## Acknowlegments

This project was built as Academic tool while I was working for Settle Network. The frontend code was entirely wrote by [Jose Jimenez](https://www.linkedin.com/in/jos%C3%A9-alberto-jim%C3%A9nez-hern%C3%A1ndez/) and [Charly Iglesias](https://www.linkedin.com/in/cdiglesias/). If you want to know what they are building, go and check [the ping app](https://www.holaping.com/)