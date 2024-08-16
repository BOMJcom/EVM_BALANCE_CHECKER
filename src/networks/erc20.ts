import { MULTICALL3_CONTRACT } from "../data/abis";
import { Chain } from "./interface";

export const RPC = "https://eth.drpc.org";

const USDC = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
const USDT = "0xdac17f958d2ee523a2206206994597c13d831ec7";
const DAI = "0x6b175474e89094c44da98b954eedeac495271d0f";


function getTokenList() {
    return [USDC, DAI, USDT];
}

export const ERC20: Chain = {rpc: RPC, name: 'ERC20', MULTICALL3_CONTRACT: MULTICALL3_CONTRACT, tokenAddresses: getTokenList()};