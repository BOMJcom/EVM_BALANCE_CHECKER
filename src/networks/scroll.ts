import { MULTICALL3_CONTRACT } from "../data/abis";
import { Chain } from "./interface";

export const RPC = "https://scroll-mainnet.public.blastapi.io";


const USDC = "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4";
const USDT = "0xf55bec9cafdbe8730f096aa55dad6d22d44099df";
const DAI = "0xca77eb3fefe3725dc33bccb54edefc3d9f764f97";
const WBTC = "0x3c1bca5a656e69edcd0d4e36bebb3fcdaca60cf1";
const WETH = "0x5300000000000000000000000000000000000004";


function getTokenList() {
    return [USDC, USDT, DAI, WBTC, WETH];
}

export const Scroll: Chain = {rpc: RPC, name: 'Scroll', MULTICALL3_CONTRACT: MULTICALL3_CONTRACT, tokenAddresses: getTokenList()};
