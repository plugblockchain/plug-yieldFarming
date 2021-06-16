import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

pragma solidity ^0.6.0;

contract USDCToken is ERC20 {

    constructor(uint256 initialSupply) public ERC20("USDC Token", "USDC") {
        _setupDecimals(6);
        _mint(_msgSender(), initialSupply * (10 ** uint256(decimals())));
    }

    bool public transferFromCalled = false;

    bool public transferCalled = false;
    address public transferRecipient = address(0);
    uint256 public transferAmount = 0;

    function mint(address user, uint256 amount) public {
        _mint(user, amount);
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        transferFromCalled = true;

        return super.transferFrom(sender, recipient, amount);
    }

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        transferCalled = true;
        transferRecipient = recipient;
        transferAmount = amount;

        return super.transfer(recipient, amount);
    }
}
