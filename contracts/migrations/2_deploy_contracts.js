const { ethers } = require("ethers");

const PingToken = artifacts.require("PingToken");
const Dex = artifacts.require("DEX");

module.exports = async function (deployer) {
	await deployer.deploy(PingToken, "PingToken", "PINGT");
	const pingToken = await PingToken.deployed();
	await deployer.deploy(Dex, pingToken.address);
	const dex = await Dex.deployed();

	console.log("Approving DEX (" + dex.address + ") to take PING Tokens from deployer account...");

	// NOTE: Make sure your deployer account has enough ETH
	await pingToken.approve(dex.address, ethers.utils.parseEther("10"));
	console.log("INIT exchange...");

	// call init function which takes 5 erc20 tokens and 5 eth from deployer account and transfer them to dex
	await dex.init(ethers.utils.parseEther("5"), {
		value: ethers.utils.parseEther("5"),
		gasLimit: 200000,
	});
};
