import { JsonRpcProvider } from "@ethersproject/providers";

const rpcUrl = "https://alpha-rpc.scroll.io/l2";

export const ScrollAlphaProvider = new JsonRpcProvider(rpcUrl);