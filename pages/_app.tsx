import { ChainId } from "@thirdweb-dev/sdk";
import type { AppProps } from "next/app";
import { useState } from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import ChainContext from "../Context/Chain";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  const [selectedChain, setSelectedChain] = useState(ChainId.Mumbai);

  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
      <ChakraProvider>
        <ThirdwebProvider desiredChainId={selectedChain}>
          <Component {...pageProps} />
        </ThirdwebProvider>
      </ChakraProvider>
    </ChainContext.Provider>
  );
}

export default MyApp;
