// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.18;

import "./SafeMath.sol";
import "./IERC20.sol";
import "./Address.sol";


library SafeERC20 {
    using SafeMath for uint256;
    using Address for address;

    function safeApprove(IERC20 token, address spender, uint256 value) internal {
        // safeApprove should only be called when setting an initial allowance,
        // or when resetting it to zero. To increase and decrease it, use
        // 'safeIncreaseAllowance' and 'safeDecreaseAllowance'
        // solhint-disable-next-line max-line-length
        require((value == 0) || (token.allowance(address(this), spender) == 0),
            "SafeERC20: approve from non-zero to non-zero allowance"
        );
        _callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, value));
    }

    /**
     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement
     * on the return value: the return value is optional (but if data is returned, it must not be false).
     * @param token The token targeted by the call.
     * @param data The call data (encoded using abi.encode or one of its variants).
     */
    function _callOptionalReturn(IERC20 token, bytes memory data) private {
        // We need to perform a low level call here, to bypass Solidity's return data size checking mechanism, since
        // we're implementing it ourselves.

        // A Solidity high level call has three parts:
        //  1. The target address is checked to verify it contains contract code
        //  2. The call itself is made, and success asserted
        //  3. The return value is decoded, which in turn checks the size of the returned data.
        // solhint-disable-next-line max-line-length
        require(address(token).isContract(), "SafeERC20: call to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = address(token).call(data);
        require(success, "SafeERC20: low-level call failed");

        if (returndata.length > 0) { // Return data is optional
            // solhint-disable-next-line max-line-length
            require(abi.decode(returndata, (bool)), "SafeERC20: ERC20 operation did not succeed");
        }
    }
}


interface IUniswapV2Router01 {
    function factory() external pure returns (address);
    function WETH() external pure returns (address);

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity);
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB);
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountToken, uint amountETH);
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountA, uint amountB);
    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountToken, uint amountETH);
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts);
    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        returns (uint[] memory amounts);
    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        returns (uint[] memory amounts);
    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts);

    function quote(uint amountA, uint reserveA, uint reserveB) external pure returns (uint amountB);
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut);
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) external pure returns (uint amountIn);
    function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
    function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts);
}

interface IUniswapV2Router02 is IUniswapV2Router01 {
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountETH);
    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountETH);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable;
    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
}


interface IUniswapV2Pair {
  event Approval(address indexed owner, address indexed spender, uint value);
  event Transfer(address indexed from, address indexed to, uint value);

  function name() external pure returns (string memory);
  function symbol() external pure returns (string memory);
  function decimals() external pure returns (uint8);
  function totalSupply() external view returns (uint);
  function balanceOf(address owner) external view returns (uint);
  function allowance(address owner, address spender) external view returns (uint);

  function approve(address spender, uint value) external returns (bool);
  function transfer(address to, uint value) external returns (bool);
  function transferFrom(address from, address to, uint value) external returns (bool);

  function DOMAIN_SEPARATOR() external view returns (bytes32);
  function PERMIT_TYPEHASH() external pure returns (bytes32);
  function nonces(address owner) external view returns (uint);

  function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

  event Mint(address indexed sender, uint amount0, uint amount1);
  event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
  event Swap(
      address indexed sender,
      uint amount0In,
      uint amount1In,
      uint amount0Out,
      uint amount1Out,
      address indexed to
  );
  event Sync(uint112 reserve0, uint112 reserve1);

  function MINIMUM_LIQUIDITY() external pure returns (uint);
  function factory() external view returns (address);
  function token0() external view returns (address);
  function token1() external view returns (address);
  function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
  function price0CumulativeLast() external view returns (uint);
  function price1CumulativeLast() external view returns (uint);
  function kLast() external view returns (uint);

  function mint(address to) external returns (uint liquidity);
  function burn(address to) external returns (uint amount0, uint amount1);
  function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;
  function skim(address to) external;
  function sync() external;
}

contract TokenEvents {
    
    //when a user stakes tokens
    event TokenStake(
        address indexed user,
        uint value
    );

    //when a user unstakes tokens
    event TokenUnstake(
        address indexed user,
        uint value
    );
    
    //when a user burns tokens
    event TokenBurn(
        address indexed user,
        uint value
    );
    
}

contract MEMEKONG is IERC20, TokenEvents {

    using SafeMath for uint256;
    using SafeMath for uint64;
    using SafeMath for uint32;
    using SafeMath for uint16;
    using SafeMath for uint8;

    using SafeERC20 for MEMEKONG;
    
    
    mapping (address => uint256) private _balances;

    mapping (address => mapping (address => uint256)) private _allowances;

    //uniswap setup
    address public uniPool;
    
    //burn setup
    uint256 public burnAdjust = 10;
    uint256 public poolBurnAdjust = 100;

    //stake setup
    //Nitish - Setting numer of days of stacking
    uint constant internal MINUTESECONDS = 60;
    uint constant internal DAYSECONDS = 86400;
    uint constant internal MINSTAKEDAYLENGTH = 9;
    uint256 public totalStaked;
    
    //tokenomics
    //Nitish - Changing values according to meme kong
    uint256 internal _totalSupply;
    string public constant name = "MEME KONG";
    string public constant symbol = "MKONG";
    uint8 public constant decimals = 9;

    //admin
    address private _P1;
    bool public isLocked = false;
    bool private sync;
    
    mapping(address => bool) admins;
    mapping (address => Staker) public staker;
    
    struct Staker{
        uint256 stakedBalance;
        uint256 stakeStartTimestamp;
        uint256 totalStakingInterest;
        uint256 totalBurnt;
        bool activeUser;
    }
    
    modifier onlyAdmins(){
        require(admins[msg.sender], "not an admin");
        _;
    }
    
    //protects against potential reentrancy
    modifier synchronized {
        require(!sync, "Sync lock");
        sync = true;
        _;
        sync = false;
    }

    constructor(uint256 initialTokens) {
        _P1 = msg.sender;
        admins[_P1] = true;
        admins[msg.sender] = true;
        //mint initial tokens
        mintInitialTokens(initialTokens);
    }
    
    function totalSupply() external view override returns (uint256) {
        return _totalSupply;
    }
    
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
    
    function transfer(address recipient, uint256 amount) external override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }
    
    function allowance(address owner, address spender) external view override returns (uint256) {
        return _allowances[owner][spender];
    }
    
    function approve(address spender, uint256 amount) external override returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }
     
    function transferFrom(address sender, address recipient, uint256 amount) external override returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, _allowances[sender][msg.sender].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
    
    function increaseAllowance(address spender, uint256 addedValue) external returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender].add(addedValue));
        return true;
    }
    
    function decreaseAllowance(address spender, uint256 subtractedValue) external returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender].sub(subtractedValue, "ERC20: decreased allowance below zero"));
        return true;
    }
    
    function _mint(address account, uint256 amount) internal {
        uint256 amt = amount;
        require(account != address(0), "ERC20: mint to the zero address");
        _totalSupply = _totalSupply.add(amt);
        _balances[account] = _balances[account].add(amt);
        emit Transfer(address(0), account, amt);
    }
    
    function _burn(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: burn from the zero address");
        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
    
    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");
        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
    
    function _burnFrom(address account, uint256 amount) internal {
        _burn(account, amount);
        _approve(account, msg.sender, _allowances[account][msg.sender].sub(amount, "ERC20: burn amount exceeds allowance"));
    }
    
    // Nitish - Commission on transfer.
    // 2% burned
    // 7% to ADMIN _P1
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }

    //mint memekong initial tokens (only ever called in constructor)
    function mintInitialTokens(uint amount)
        internal
        synchronized
    {
        _mint(_P1, amount);
    }

    ////////////////////////////////////////////////////////
    /////////////////PUBLIC FACING - MEMEKONG CONTROL//////////
    //////////////////////////////////////////////////////
    
    
    ////////STAKING FUNCTIONS/////////
    
    //stake MKONG tokens to contract and claims any accrued interest
    function StakeTokens(uint amt)
        external
        synchronized
    {
        require(amt > 0, "zero input");
        require(mkongBalance() >= amt, "Error: insufficient balance");//ensure user has enough funds
        //claim any accrued interest
        claimInterest();
        //update balances
        staker[msg.sender].activeUser = true;
        staker[msg.sender].stakedBalance = staker[msg.sender].stakedBalance.add(amt);
        totalStaked = totalStaked.add(amt);
        _transfer(msg.sender, address(this), amt);//make transfer
        emit TokenStake(msg.sender, amt);
    }
    
    //Nitish - tokens cannot be unstaked yet. min 9 day stake
    //unstake MKONG tokens from contract and claims any accrued interest
    function UnstakeTokens()
        external
        synchronized
    {
        require(staker[msg.sender].stakedBalance > 0,"Error: unsufficient frozen balance");//ensure user has enough staked funds
        require(isStakeFinished(msg.sender), "tokens cannot be unstaked yet. min 9 day stake");
        uint amt = staker[msg.sender].stakedBalance;
        //claim any accrued interest
        claimInterest();
        //zero out staking timestamp
        staker[msg.sender].stakeStartTimestamp = 0;
        staker[msg.sender].stakedBalance = 0;
        totalStaked = totalStaked.sub(amt);
        _transfer(address(this), msg.sender, amt);//make transfer
        emit TokenUnstake(msg.sender, amt);
    }
    
    //Nitish - claim interest
    //claim any accrued interest
    function ClaimStakeInterest()
        external
        synchronized
    {
        require(staker[msg.sender].stakedBalance > 0, "you have no staked balance");
        claimInterest();
    }
    
    //roll any accrued interest
    function RollStakeInterest()
        external
        synchronized
    {
        require(staker[msg.sender].stakedBalance > 0, "you have no staked balance");
        rollInterest();
    }
    
    //Nitish - Calculate Staking interest
    //Nitish - 7% admin P1 copy - 2% admin P2 copy
    function rollInterest()
        internal
    {
        //calculate staking interest
        uint256 interest = calcStakingRewards(msg.sender);
        //mint interest to contract, ref and devs
        if(interest > 0){
            _mint(address(this), interest);
            //roll interest
            staker[msg.sender].stakedBalance = staker[msg.sender].stakedBalance.add(interest);
            totalStaked = totalStaked.add(interest);
            staker[msg.sender].totalStakingInterest += interest;
            //reset staking timestamp
            staker[msg.sender].stakeStartTimestamp = block.timestamp;
            _mint(_P1, interest.mul(7).div(100));//7% admin P1 copy
        }
    }
    
    //Nitish - 7% admin P1 copy - 2% admin P2 copy
    function claimInterest()
        internal
    {
        //calculate staking interest
        uint256 interest = calcStakingRewards(msg.sender);
        //reset staking timestamp
        staker[msg.sender].stakeStartTimestamp = block.timestamp;
        //mint interest if any
        if(interest > 0){
            _mint(msg.sender, interest);
            staker[msg.sender].totalStakingInterest += interest;
            _mint(_P1, interest.mul(7).div(100));//7% admin P1 copy
        }
    }

    //Nitish - can only burn equivalent of x10 total staking interest
    //Nitish - minimize vamp bots by keeping max burn pamp slippage low
    function BurnMkong(uint amt)
        external
        synchronized
    {
        require(staker[msg.sender].totalBurnt.add(amt) <= staker[msg.sender].totalStakingInterest.mul(burnAdjust), "can only burn equivalent of x10 total staking interest");
        require(amt > 0, "value must be greater than 0");
        require(balanceOf(msg.sender) >= amt, "balance too low");
        //burn tokens of user
        _burn(msg.sender, amt);
        staker[msg.sender].totalBurnt += amt;
        //burn tokens of uniswap liquidity - pamp it (minimize vamp bots by keeping max burn pamp slippage low)
        uint256 poolDiv = _balances[uniPool].div(poolBurnAdjust);
        if(poolDiv > amt)
        {
            _balances[uniPool] = _balances[uniPool].sub(amt, "ERC20: burn amount exceeds balance");
            _totalSupply = _totalSupply.sub(amt);
            emit TokenBurn(msg.sender, amt);
        }
        else{
            _balances[uniPool] = _balances[uniPool].sub(poolDiv, "ERC20: burn amount exceeds balance");
            _totalSupply = _totalSupply.sub(poolDiv);
            emit TokenBurn(msg.sender, poolDiv);
        }
        IUniswapV2Pair(uniPool).sync();

        emit TokenBurn(msg.sender, amt);
    }

    ///////////////////////////////
    ////////VIEW ONLY//////////////
    ///////////////////////////////

    //Nitish - totalstaked * minutesPast / 10000 / 1314 @ 4.00% APY
    //returns staking rewards in MKONG
    function calcStakingRewards(address _user)
        public
        view
        returns(uint)
    {
        // totalstaked * minutesPast / 10000 / 1314 @ 4.00% APY
        // (adjustments up to a max of 40.0% APY via burning of MKONG)
        uint mkongBurnt = staker[_user].totalBurnt;
        uint staked = staker[_user].stakedBalance;
        //Nitish - 1%
        uint apyAdjust = 10000;
        if(mkongBurnt > 0){
            if(mkongBurnt >= staked.sub(staked.div(10)))
            {
                //Nitish - 10%
                apyAdjust = 1000;
            }
            else{
                uint burntPercentage = ((mkongBurnt.mul(100) / staked));
                uint v = (apyAdjust * burntPercentage) / 100;
                apyAdjust = apyAdjust.sub(v);
                if(apyAdjust < 1000)
                {
                    apyAdjust = 1000;
                }
            }
        }
        
        return (staked.mul(minsPastStakeTime(_user)).div(apyAdjust).div(1251));
        // return (staked.mul(minsPastStakeTime(_user)).div(apyAdjust).div(1314));
    }

    //returns amount of minutes past since stake start
    function minsPastStakeTime(address _user)
        public
        view
        returns(uint)
    {
        if(staker[_user].stakeStartTimestamp == 0){
            return 0;
        }
        uint minsPast = (block.timestamp).sub(staker[_user].stakeStartTimestamp).div(MINUTESECONDS);
        if(minsPast >= 1){
            return minsPast;// returns 0 if under 1 min passed
        }
        else{
            return 0;
        }
    }
    
    //Nitish - check stack finished
    //check if stake is finished, min 9 days
    function isStakeFinished(address _user)
        public
        view
        returns(bool)
    {
        if(staker[_user].stakeStartTimestamp == 0){
            return false;
        }
        else{
            return staker[_user].stakeStartTimestamp.add((DAYSECONDS).mul(MINSTAKEDAYLENGTH)) <= block.timestamp;             
        }
    }

    //MKONG balance of caller
    function mkongBalance()
        public
        view
        returns (uint256)
    {
        return balanceOf(msg.sender);
    }
    
    ///////////////////////////////
    ////////ADMIN ONLY//////////////
    ///////////////////////////////
     function setUnipool(address _lpAddress)
        external
        onlyAdmins
    {
        require(!isLocked, "cannot change native pool");
        uniPool = _lpAddress;
    }

    //adjusts amount users are eligible to burn over time
    function setBurnAdjust(uint _v)
        external
        onlyAdmins
    {
        require(!isLocked, "cannot change burn rate");
        burnAdjust = _v;
    }
    
    //adjusts max % of liquidity tokens that can be burnt from pool
    function uniPoolBurnAdjust(uint _v)
        external
        onlyAdmins
    {
        require(!isLocked, "cannot change pool burn rate");
        poolBurnAdjust = _v;
    }
    
    function revokeAdmin()
        external
        onlyAdmins
    {
        isLocked = true;
    }

}
