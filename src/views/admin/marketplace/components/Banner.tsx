// Chakra imports
import { Button, Flex, Link, Text } from "@chakra-ui/react";
import styles from "styles/Banner.module.css";

// Assets
// import banner from 'img/nfts/NftBanner1.png'

export default function Banner() {
  // Chakra Color Mode
  return (
    <div>
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
                      <img src="images/staking.png" />
                      <h4>Staking</h4>
                      <p>
                        Staking Meme earns interest at 4.20% APY and up to 42.0%
                        APY with 90% of staked amount burnt.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="stake-content">
                      <img src="images/Meme.png" />
                      <h4>Staking</h4>
                      <p>
                        Burn Meme to pump the price relative to amount burnt,
                        increase your individual MEME staking APY.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="stake-content">
                      <img src="images/NFTS.png" />
                      <h4>NFTs</h4>
                      <p>
                        Head to the NFT area and stake in Meme NFT Staking pool,
                        accessible only by owning a Genesis Meme.
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="action-sec">
                  <a href="#">Connect</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
