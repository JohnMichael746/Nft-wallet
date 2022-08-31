// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EvoToken is ERC20 {

    constructor (address to, uint256 totalsupp) ERC20("Evo Bulls token", "Evo") 
    {
        _mint(to, totalsupp * (10 ** 18));
    }
}
