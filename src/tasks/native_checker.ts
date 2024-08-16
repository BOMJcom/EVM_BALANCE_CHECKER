import { formatEther } from "ethers";
import {
  ContractCallContext,
  ContractCallResults,
  Multicall,
} from "ethereum-multicall";
import { Chain } from "../networks/interface";
import { MULTICALL3_ABI, MULTICALL3_CONTRACT } from "../data/abis";
import { TokenBalance, updateEvmBalance } from "../utils/files_utils";

export async function getNativeBalance(network: Chain, addresses: string[]): Promise<TokenBalance[]> {
    const nodeUrl = network.rpc;
    const multicallContractAddress = network.MULTICALL3_CONTRACT ?? MULTICALL3_CONTRACT;

    const multicall = new Multicall({
        nodeUrl,
        multicallCustomContractAddress: multicallContractAddress,
        tryAggregate: true,
    });

    const balanceCalls: ContractCallContext[] = [{
        reference: "multicall3",
        contractAddress: multicallContractAddress,
        abi: MULTICALL3_ABI,
        calls: [
            ...addresses.map((item) => ({
                reference: item,
                methodName: "getEthBalance",
                methodParameters: [item],
            })),
        ],
    }];

    const call: ContractCallResults = await multicall.call(balanceCalls);

    const { callsReturnContext } = call.results.multicall3;

    const tokenBalances: TokenBalance[] = callsReturnContext.map((item, index) => {
        const result = BigInt(item.returnValues as unknown as string);
        const balance = result ? parseFloat(formatEther(result)) : 0;
        return {
            token: 'NATIVE',
            address: addresses[index],
            balance: parseFloat(balance.toFixed(6)),
        };
    });

    // Обновляем баланс в Excel
    updateEvmBalance(network.name, tokenBalances);

    return tokenBalances;
}