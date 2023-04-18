import { Chain } from '@usedapp/core'

export const ScrollAlpha = {
  chainId: 534353,
  chainName: 'ScrollAlpha',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x0000000000000000000000000000000000000000',
  getExplorerAddressLink: (address) => `https://blockscout.scroll.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash) => `https://blockscout.scroll.io/tx/${transactionHash}`,
  // Optional parameters:
  rpcUrl: 'https://alpha-rpc.scroll.io/l2',
  blockExplorerUrl: 'https://blockscout.scroll.io',
  nativeCurrency: {
    name: 'ETHEREUM',
    symbol: 'ETH',
    decimals: 18,
  }
}
// IMPORTANT: Fill that object with your own data.