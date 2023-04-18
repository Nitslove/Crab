/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useState, useEffect } from "react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { ScrollAlphaProvider } from 'web3/ScrollAlphaProvider';
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";
import Image from "next/image";
import Images from "../../img/index";
// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card";

// Assets
import Nft1 from "img/nfts/Nft1.png";
import Nft2 from "img/nfts/Nft2.png";
import Nft3 from "img/nfts/Nft3.png";
import Nft4 from "img/nfts/Nft4.png";
import Nft5 from "img/nfts/Nft5.png";
import Nft6 from "img/nfts/Nft6.png";
import Avatar1 from "img/avatars/avatar1.png";
import Avatar2 from "img/avatars/avatar2.png";
import Avatar3 from "img/avatars/avatar3.png";
import Avatar4 from "img/avatars/avatar4.png";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import AdminLayout from "layouts/admin";
import { TableData } from "views/admin/default/variables/columnsData";
import NextLink from "next/link";
import { ethers } from "ethers";
import MemeKongABI from '../../web3/MemeKongV2.json';

export default function NftMarketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

  useEffect(async()=>{
    await window.ethereum.enable();
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    // const memeKongContract = new ethers.Contract(daiAddress, MemeKongABI, provider);
  },[])

  return (
    <AdminLayout>
      <div className="memekong-sec">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="myheader-sec">
                <h2>Meme Kong Staking</h2>
              </div>
              <div className="stacking-sec">
                <ul>
                  <li>
                    <div className="stake-content">
                      <Image src={Images.Staking} alt="staking" />
                      <h4>Staking</h4>
                      <p>
                        Staking Meme earns interest at 4.20% APY and up to 42.0%
                        APY with 90% of staked amount burnt.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="stake-content">
                      <Image src={Images.Meme} />
                      <h4>Unstack</h4>
                      <p>
                        Burn Meme to pump the price relative to amount burnt,
                        increase your individual MEME staking APY.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="stake-content">
                      <Image src={Images.NFTS} alt="NFTS" />
                      <h4>Claim</h4>
                      <p>
                        Head to the NFT area and stake in Meme NFT Staking pool,
                        accessible only by owning a Genesis Meme.
                      </p>
                    </div>
                  </li>
                </ul>
                {/* <div className="action-sec">
                  <a href="#">Connect</a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="memekong-sec">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="contain-img">
                <div className="stake-content">
                  <Image src={Images.Staking} alt="Staking" />
                  <h4>Staking</h4>
                  <p>
                    Burning Meme increases your individual staking APY up to a
                    maximum of 10x.
                  </p>
                  <p>
                    Burning Meme simultaneously pumps the price by burning an
                    equivalent amount of Meme from the ETH/Meme pair of Uniswap
                    v2, or 1% of the pool if your burn equivalent is over.
                  </p>

                  <div className="claim-sec">
                    <p>
                      Burn 90% of your staked balance to achieve 10x staking
                      bonus.
                    </p>
                    <p>
                      Burn up to 10x of your total staking interest claimed to
                      help pump the price!
                    </p>
                    <ul>
                      <li>
                        {" "}
                        <Image src={Images.Wallet} alt="wallet" />
                        Wallet: N/A
                      </li>
                      <li>
                        {" "}
                        <Image src={Images.Logo} alt="logo" />
                        Balance: 0
                      </li>
                      <li>
                        {" "}
                        <Image src={Images.Logo} alt="logo" />
                        <b>Burnt: 0</b>
                      </li>
                    </ul>
                    <div className="calculation-sec">
                      <p>
                        BURN Meme TO ACQUIRE A MAXIMUM OF 10X STAKING APY @
                        42.0%
                      </p>
                      <input
                        type="text"
                        className="form-control"
                        id="text"
                        placeholder="Burn Amount"
                      />
                      <p>AVAILABLE TO BURN :</p>
                      <div className="calcu action-sec">
                        <a href="#">Burn Meme</a>
                        <Image src={Images.DownArrow} alt="downarrow" />
                        <a href="#">Claim Now</a>
                      </div>
                      <p>CLAW AVAILABLE TO CLAIM :</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="contain-img">
                <div className="stake-content">
                  <Image src={Images.Staking} alt="staking" />
                  <h4>Meme Kong Staking</h4>
                  <p>
                    Stake Meme to increase your position and earn Meme
                    passively.
                  </p>
                  <p>
                    7 day stake lock period - your most recent stake/claim/roll
                    resets the period.
                  </p>
                  <div className="claim-sec">
                    <p>
                      Burn 90% of your staked balance to achieve 10x staking
                      bonus.
                    </p>
                    <p>
                      Burn up to 10x of your total staking interest claimed to
                      help pump the price!
                    </p>
                    <ul>
                      <li>
                        <Image src={Images.Wallet} alt="wallet" />
                        Wallet: N/A
                      </li>
                      <li>
                        <Image src={Images.Logo} alt="logo" />
                        Balance: 0
                      </li>
                      <li>
                        <Image src={Images.Logo} alt="logo" />
                        Staked: 0
                      </li>
                    </ul>
                    <div className="calculation-sec">
                      <p>STAKE Meme TO EARN A MINIMUM 4.20% APY</p>
                      <input
                        type="text"
                        className="form-control"
                        id="text"
                        placeholder="Stake Amount"
                      />
                      <p>
                        STAKING / UNSTAKING MEME CLAIMS ANY ACCRUED INTEREST
                        STAKE MEME UNSTAKE MEME
                      </p>
                      <div className="calcu action-sec">
                        <a href="#">Stake Meme</a>
                        <Image src={Images.DownArrow} alt="downarrow" />
                        <a href="#">Unstake Claw</a>
                      </div>
                      <p>UNSTAKES ALL STAKED MEME</p>
                    </div>
                    <div className="calculation-sec intrest-sec">
                      
                      <div className="calcu action-sec">
                        <a href="#">Claim Meme</a>
                        <p>CLAIM SENDS INTEREST DIRECT TO WALLET</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
