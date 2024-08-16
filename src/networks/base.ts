import { MULTICALL3_CONTRACT } from "../data/abis";
import { Chain } from "./interface";

export const RPC = "https://base-mainnet.public.blastapi.io";

const USDC = "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913";
const DAI = "0x50c5725949a6f0c72e6c4a641f24049a917db0cb";
const STG = "0xE3B53AF74a4BF62Ae5511055290838050bf764Df";
const WETH = "0x4200000000000000000000000000000000000006";

function getTokenList() {
    return [USDC, DAI, WETH, STG];
}

export const Base: Chain = {rpc: RPC, name: 'Base', MULTICALL3_CONTRACT: MULTICALL3_CONTRACT, tokenAddresses: getTokenList()};