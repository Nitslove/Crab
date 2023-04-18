import { ChakraProvider, useFocusEffect } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React from "react";
import theme from "theme/theme";

import "styles/Fonts.css";
import "styles/App.css";
import "styles/Contact.css";
import "../styles/bootstrap.min.css";
import "../styles/style.css";

import "react-calendar/dist/Calendar.css";
import "styles/MiniCalendar.css";
import Head from "next/head";
import {
  Mainnet,
  DAppProvider,
  useEtherBalance,
  useEthers,
  Config,
  DEFAULT_SUPPORTED_CHAINS,
  ConfigProvider,
} from '@usedapp/core'
import { ScrollAlpha } from "web3/scrollAlpha";


function MyApp({ Component, pageProps }: AppProps) {

  const config: Config = {
    // readOnlyChainId: '1',
    readOnlyChainId: ScrollAlpha.chainId,
    readOnlyUrls: {
      // ['1']: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
      [ScrollAlpha.chainId]: 'https://alpha-rpc.scroll.io/l2',
    },
    networks: [ScrollAlpha],
  }

  return (
    <React.StrictMode>
      <ConfigProvider config={config}>
        <DAppProvider config={{}}>

          <ChakraProvider theme={theme}>
            <Head>
              <title>Meme Kong</title>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="theme-color" content="#000000" />
            </Head>

            <Component {...pageProps} />
          </ChakraProvider>
        </DAppProvider>
      </ConfigProvider>
    </React.StrictMode>
  );
}

export default MyApp;
