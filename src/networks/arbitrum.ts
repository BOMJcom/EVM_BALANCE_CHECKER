import { MULTICALL3_CONTRACT } from "../data/abis";
import { Chain, Token } from "./interface";
export const RPC = 'https://arbitrum-one.public.blastapi.io';

const USDC = "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8";
const USDT = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";
const DAI = "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1";
const ARB = "0x912ce59144191c1204e64559fe8253a0e49e6548";
const BTCB = "0x2297aEbD383787A160DD0d9F71508148769342E3";
const STG = "0x6694340fc020c5e6b96567843da2df01b2ce1eb6";
const WETH = "0x82af49447d8a07e3bd95bd0d56f35241523fbab1";


function getTokenList() {
    return [USDC, USDT, DAI, ARB, BTCB, STG, WETH];
}

export const Arbitrum: Chain = {rpc: RPC, name: 'Arbitrum', MULTICALL3_CONTRACT: MULTICALL3_CONTRACT, tokenAddresses: getTokenList()};