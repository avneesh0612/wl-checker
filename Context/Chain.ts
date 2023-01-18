import { ChainId } from "@thirdweb-dev/sdk";
import { createContext } from "react";

const ChainContext = createContext({
  selectedChain: ChainId.Mumbai,
  setSelectedChain: (chain: ChainId) => {},
});

export default ChainContext;
