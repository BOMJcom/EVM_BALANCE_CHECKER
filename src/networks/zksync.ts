import { Chain } from "./interface";

export const RPC = "https://zksync-mainnet.public.blastapi.io";

export const MULTICALL3_CONTRACT = "0x47898B2C52C957663aE9AB46922dCec150a2272c";

const USDC = "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4";
const USDT = "0x493257fD37EDB34451f62EDf8D2a0C418852bA4C";
const DAI = "0x4B9eb6c0b6ea15176BBF62841C6B2A8a398cb656";
const WBTC = "0xBBeB516fb02a01611cBBE0453Fe3c580D7281011";
const STG = "0xe538C412011a793588A34849aCb0A7138275975E";
const WETH = "0xf00DAD97284D0c6F06dc4Db3c32454D4292c6813";


function getTokenList() {
    return [USDC, USDT, DAI, WBTC, WETH];
}

export const zkSync: Chain = {rpc: RPC, name: 'zkSync', MULTICALL3_CONTRACT: MULTICALL3_CONTRACT, tokenAddresses: getTokenList()};