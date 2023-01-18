import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChainId, useContract } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import React, { useContext, useState } from "react";
import ChainContext from "../Context/Chain";

const Home: NextPage = () => {
  const [nftDropAddress, setNftDropAddress] = useState<string>(
    "0xb3db8C75416C7Fe6E9118FaB66A64a9399Cd1c39"
  );
  const [address, setAddress] = useState<string>("");
  const { contract: nftDrop, isLoading } = useContract(
    nftDropAddress,
    "nft-drop"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { selectedChain, setSelectedChain } = useContext(ChainContext);

  const check = async () => {
    if (!address) {
      return setMessage("Please enter an address!");
    }

    setLoading(true);
    const data = await nftDrop?.erc721.claimConditions.getClaimerProofs(
      address
    );

    if (data) {
      setMessage(`You can claim ${data.maxClaimable} NFTs!`);
    } else {
      setMessage("You can't claim any NFTs!");
    }
    setLoading(false);
  };

  return (
    <VStack bg="#0f1318" color="gray.100" minH="100vh" justify="center">
      <Flex flexDir="column" gap={4}>
        <Heading>Whitelist checker!</Heading>
        <Flex flexDir="column" gap={1}>
          <Text>NFT Drop Address: </Text>
          <Input
            type="text"
            placeholder="NFT Drop Address"
            value={nftDropAddress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNftDropAddress(e.target.value)
            }
          />
        </Flex>

        <Flex flexDir="column" gap={1}>
          <Text>Wallet Address: </Text>
          <Input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAddress(e.target.value)
            }
          />
        </Flex>

        <Flex flexDir="column" gap={1}>
          <Text>Select Network: </Text>

          <Select
            value={String(selectedChain)}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedChain(parseInt(e.target.value))
            }
          >
            <option value={ChainId.Mainnet}>Mainnet</option>
            <option value={ChainId.Polygon}>Polygon</option>
            <option value={ChainId.Optimism}>Optimism</option>
            <option value={ChainId.Avalanche}>Avalanche</option>
            <option value={ChainId.Goerli}>Goerli</option>
            <option value={ChainId.Mumbai}>Mumbai</option>
          </Select>
        </Flex>

        <Button onClick={check}>
          {isLoading || loading ? "Loading..." : "Check if whitelisted"}
        </Button>

        {message && <Text align="center">{message}</Text>}
      </Flex>
    </VStack>
  );
};

export default Home;
