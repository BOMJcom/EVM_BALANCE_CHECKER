import { Arbitrum } from "./arbitrum";
import { Base } from "./base";
import { ERC20 } from "./erc20";
import { Chain } from "./interface";
import { Linea } from "./linea";
import { Optimism } from "./optimism";
import { Scroll } from "./scroll";
import { zkSync } from "./zksync";
import { Zora } from "./zora";

export const chainList: Chain[] = [
    Arbitrum,
    Scroll,
    zkSync,
    Zora,
    Base,
    ERC20,
    Linea,
    Optimism
]

export async function getChain(chainName: string): Promise<Chain | undefined> {
    return chainList.find(chain => chain.name === chainName);
}