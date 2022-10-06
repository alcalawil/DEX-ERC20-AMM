const ethers = require('ethers')
const genericErc20Abi = require('../build/contracts/ERC20.json').abi;
const dexAbi = require('../build/contracts/DEX.json').abi;

// local web3 provider
// const provider = new ethers.providers.JsonRpcProvider('http://localhost:7545');

const provider = new ethers.getDefaultProvider('ropsten');

const contractAddress = '0xc3fB289412071ad2C346b0BB4b2d5F618E5a876E'; // PING Token Ropsten Address: 0xc3fB289412071ad2C346b0BB4b2d5F618E5a876E
const accountAddress = '0xabe41A0010483F8927750D2A3Aebb468E44d6dd0'; // DEX contract address

async function main() {
	const ethBalance = await getETHBalance(accountAddress);
	console.log(`ETH balance: ${ethBalance}`);

	const erc20Balance = await getERC20Balance(contractAddress, accountAddress);
	console.log(`PING balance: ${erc20Balance}`);

	// check allowance
	// const dexAddress = '0xe16876B2C17dBBd8850A96E234A45d20f154b661';
	// const myWallet = '0xC9eBA01b7249EB0d7F019946e5358a28E31edE33';
	// const allowance1 = await checkAllowance(contractAddress, myWallet, dexAddress);
	// console.log(`Allowance before approve: ${allowance1}`);


	// const approved = await approve(contractAddress, myWallet, dexAddress);
	// console.log(`Approved?? ${approved}`);

	// const allowance2 = await checkAllowance(contractAddress, dexAddress);
	// console.log(`Allowance after approve: ${allowance2}`);


}

async function getETHBalance(address) {
	const balance = await provider.getBalance(address);

	// convert a currency unit from wei to ether
	const balanceInEth = ethers.utils.formatEther(balance)
	return balanceInEth;
}

async function getERC20Balance(erc20ContractAddress, address) {
	const contract = new ethers.Contract(erc20ContractAddress, genericErc20Abi, provider);
	const balance = ethers.utils.formatEther(await contract.balanceOf(address));
	return balance;
}

async function checkAllowance(erc20Address, owner, spender) {
	const contract = new ethers.Contract(erc20Address, genericErc20Abi, provider);
	const balance = ethers.utils.formatEther(await contract.allowance(owner, spender));
	return balance;
}


async function approve(erc20Address, spender, tokens) {
	const contract = new ethers.Contract(erc20Address, genericErc20Abi, provider);
	const balance = ethers.utils.formatEther(await contract.approve(spender, 1000000000000000));
	return balance;
}

async function dexInit() {
	const dex = new ethers.Contract(dexAbi, genericErc20Abi, provider);
	console.log("INIT exchange...");
	await dex.init(ethers.utils.parseEther("5"), { value: ethers.utils.parseEther("5"), gasLimit: 200000 })
	console.log(">>>> after init...");
	// const balance = ethers.utils.formatEther(await contract.approve(spender, 1000000000000000));
	// return balance;

}

// dexInit();

main();