import { MULTICALL3_CONTRACT } from "../data/abis";
import { Chain } from "./interface";

export const RPC = "https://optimism-mainnet.public.blastapi.io";

const USDC = "0x7f5c764cbc14f9669b88837ca1490cca17c31607";
const USDT = "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58";
const DAI = "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1";
const OP = "0x4200000000000000000000000000000000000042";
const BTCB = "0x2297aEbD383787A160DD0d9F71508148769342E3";
const STG = "0x296F55F8Fb28E498B858d0BcDA06D955B2Cb3f97";
const WETH = "0x4200000000000000000000000000000000000006";


function getTokenList() {
    return [USDC, USDT, DAI, OP, BTCB, STG, WETH];
}

export const Optimism: Chain = {rpc: RPC, name: 'Optimism', MULTICALL3_CONTRACT: MULTICALL3_CONTRACT, tokenAddresses: getTokenList()};