// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PingToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // mint 100000000 token
        _mint(msg.sender, 100000000 * 10**uint256(decimals()));
    }
}
