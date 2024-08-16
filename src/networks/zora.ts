import { MULTICALL3_CONTRACT } from "../data/abis";
import { Chain } from "./interface";

export const RPC = "https://rpc.zora.energy";

const USDT = "0x42aa4D3275aaf1e47589825639936EFcBC9F9b65";
const DAI = "0x80DBdF647338aF309d65AFe29A201d74B4F9B0b2";
const MERK = "0xD838D5b87439e17B0194fd43e37300cD99Aa3DE0";
const WETH = "0x4200000000000000000000000000000000000006";

function getTokenList() {
    return [MERK, USDT, DAI, WETH];
}

export const Zora: Chain = {rpc: RPC, name: 'Zora', MULTICALL3_CONTRACT: MULTICALL3_CONTRACT, tokenAddresses: getTokenList()};