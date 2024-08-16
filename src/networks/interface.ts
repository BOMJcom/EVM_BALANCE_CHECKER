export interface Chain {
    rpc: string;
    name: string;
    MULTICALL3_CONTRACT?: string;
    tokenAddresses: string[]
  }

export interface Token {
    address: string,
    title: string
}