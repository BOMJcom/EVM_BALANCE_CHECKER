import { formatUnits, Interface } from "ethers";
import {
  CallReturnContext,
  ContractCallContext,
  ContractCallResults,
  Multicall,
} from "ethereum-multicall";
import { ERC20_ABI, MULTICALL3_CONTRACT } from "../data/abis";
import { Chain } from "../networks/interface";
import { TokenBalance, updateEvmBalance } from "../utils/files_utils";

function getDecimals(context: CallReturnContext[]) {
  const result = context.find((item) => item.reference === "decimals");
  return BigInt(result?.returnValues as unknown as string);
}

function getSymbol(context: CallReturnContext[]) {
  const result = context.find((item) => item.reference === "symbol");
  const iface = new Interface(ERC20_ABI);

  const [symbol] = iface.decodeFunctionResult(
    "symbol",
    result?.returnValues as unknown as string,
  );

  return symbol;
}

export async function getErc20Balance(
    network: Chain,
    addresses: string[],
    tokenContractAddress: string,
  ) {
    const nodeUrl = network.rpc;
    const multicallCustomContractAddress = network.MULTICALL3_CONTRACT ?? MULTICALL3_CONTRACT;
    const multicall = new Multicall({
      nodeUrl,
      multicallCustomContractAddress,
      tryAggregate: true,
    });
  
    const erc20Calls: ContractCallContext[] = [{
      reference: "erc20",
      contractAddress: tokenContractAddress,
      abi: ERC20_ABI,
      calls: [
        {
          reference: "decimals",
          methodName: "decimals",
          methodParameters: [],
        },
        {
          reference: "symbol",
          methodName: "symbol",
          methodParameters: [],
        },
        ...addresses.map((item) => ({
          reference: item,
          methodName: "balanceOf",
          methodParameters: [item],
        })),
      ],
    }];
  
    const call: ContractCallResults = await multicall.call(erc20Calls);
  
    const { callsReturnContext } = call.results.erc20;
  
    const decimals = getDecimals(callsReturnContext);
    const symbol = getSymbol(callsReturnContext);
  
    const balanceOf = callsReturnContext.filter((item) =>
      item.methodName === "balanceOf"
    );
  
    const tokenBalances: TokenBalance[] = balanceOf.map((item, index) => {
      const result = BigInt(item.returnValues as unknown as string);
      const balance = result ? parseFloat(formatUnits(result, decimals)) : 0;
      return {
        token: symbol,
        address: addresses[index],
        balance: parseFloat(balance.toFixed(6)),
      };
    });
  
    // Обновляем баланс в Excel
    updateEvmBalance(network.name, tokenBalances);
  
    return {
      header: symbol,
      balances: tokenBalances,
    };
  }


export async function getBalancesForTokens(
    network: Chain,
    addresses: string[],
    tokenContractAddresses: string[],
  ) {
    const results = [];
  
    for (const tokenContractAddress of tokenContractAddresses) {
      const balance = await getErc20Balance(network, addresses, tokenContractAddress);
      results.push({
        tokenContractAddress,
        balance,
      });
    }
  
  }