import { useState, useEffect } from "react";
import { Button, Box, Text, useFocusEffect } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from "./Identicon";
import { ScrollAlphaProvider } from "web3/ScrollAlphaProvider";

type Props = {
  handleOpenModal: any;
};

export default function ConnectButton({ handleOpenModal }: Props) {
  const [account, setAccount] = useState();
  const [etherBalance, setEtherBalance] = useState();
  const { activateBrowserWallet } = useEthers();
  console.log("account", account);

  // const etherBalance = useEtherBalance(account)

  function handleConnectWallet() {
    activateBrowserWallet();
    setAccount();
  }
  console.log(useEtherBalance(account));

  useEffect(async () => {
    if (!window.ethereum) {
      // MetaMask is not installed, show a message or button to prompt the user to install it
      return;
    }
    await window.ethereum.enable();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    const balance = await ScrollAlphaProvider.getBalance(account);
    console.log(account, balance);
    setAccount(accounts[0]);
    setEtherBalance(balance);
  }, []);

  if (!account) {
    let interval = setInterval(() => {
      if (localStorage.getItem("acc")) {
        setAccount(localStorage.getItem("acc"));
        clearInterval(interval);
      }
    }, 200);
  }

  if (!window.ethereum) {
    return (
      <Button
        onClick={() => window.open("https://metamask.io/download.html")}
        bg="blue.800"
        color="blue.300"
        fontSize="lg"
        fontWeight="medium"
        borderRadius="xl"
        border="1px solid transparent"
        _hover={{
          borderColor: "blue.700",
          color: "blue.400",
        }}
        _active={{
          backgroundColor: "blue.800",
          borderColor: "blue.700",
        }}
      >
        Install MetaMask
      </Button>
    );
  }
  return account ? (
    <Box
      display="flex"
      alignItems="center"
      background="gray.700"
      borderRadius="xl"
      py="0"
    >
      <Box px="3">
        <Text color="white" fontSize="md">
          {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
        </Text>
      </Box>
      <Button
        // onClick={handleOpenModal}
        bg="gray.800"
        border="1px solid transparent"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          borderColor: "blue.400",
          backgroundColor: "gray.700",
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px"
      >
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          {account &&
            `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
        </Text>
        <Identicon />
      </Button>
    </Box>
  ) : (
    <Button
      onClick={handleConnectWallet}
      bg="blue.800"
      color="blue.300"
      fontSize="lg"
      fontWeight="medium"
      borderRadius="xl"
      border="1px solid transparent"
      _hover={{
        borderColor: "blue.700",
        color: "blue.400",
      }}
      _active={{
        backgroundColor: "blue.800",
        borderColor: "blue.700",
      }}
    >
      Connect to a wallet
    </Button>
  );
}
