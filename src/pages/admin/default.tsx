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

import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
  TableData,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import { isWindowAvailable } from "utils/navigation";
import AdminLayout from "layouts/admin";

import Usa from "img/dashboards/usa.png";
import Script from "next/script";
import Image from "next/image";
import Images from "../../img/index";
import MemeCoin from "../../img/allImg/mene-coins.png";
export default function UserReports() {
  // Chakra Color Mode

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  return (
    <AdminLayout>
      <Script
        src="https://code.jquery.com/jquery-1.12.4.min.js"
        id="example-script"
        nonce="XUENAJFW"
        data-test="script"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"
        id="example-script"
        nonce="XUENAJFW"
        data-test="script"
      />

      <div className="memekong-sec">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-12">
              <div className="myheader-sec">
                <h2>Welcome to Meme Kong Staking!</h2>
                <p>Welcome to the Meme Market...</p>
              </div>
              <div className="contain-sec">
                <p>
                  Meme Market is an innovative decentralized platform offering
                  variable yield options. Utilizing a symbiotic relationship
                  between burning, staking and price through DeFi to maximize
                  growth and sustainability.Fully audited by Techrate : Meme
                  Market Audit
                </p>
                <div className="heading-small">
                  <p>
                    Doing your own research is vital in the cryptosphere, but if
                    you're feeling a bit Meme rn, we get it bro.
                  </p>
                </div>
                <p>Here's how things work...</p>
                <p>
                  <b>
                    Staking Meme in the stake pool accrues interest at a minimum
                    of 4.20% APY,
                  </b>{" "}
                  paid in Meme. Staking has a minimum 7 day locked staking
                  period from your most recent stake, claim or roll. Claim
                  accrued interest at any point throughout the duration of your
                  stake.
                </p>
                <p>
                  <b>
                    Burning Meme pumps the price and maximizes staking returns.{" "}
                  </b>
                  Meme achieves this by automatically burning a copy of the
                  amount burnt in the MEME/ETH Uniswap v2 pair. This increases
                  price alongside using your burnt amount as a metric to
                  calculate your individual staking APY up to a maximum of 10x
                  (42.0%), achieve max staking APY by burning a total of 90% of
                  your staked balance!
                </p>
                <p>
                  <b>Referring users to Meme Market rewards you, </b> enjoy a 5%
                  copy of your referrals staking interest forever. A referrer
                  must have used the platform in the past before referrering
                  others (e.g. staking). Users cannot self refer. A 3% copy of
                  staking interest is also allocated to developer.
                </p>
                <p>
                  <b>100% of initial liquidity is locked for 6 months. </b> We
                  aim for sustainability and high gains, while maintaining
                  community trust.
                </p>
                <p>
                  <b>Meme </b>offers an interesting staking mechanism, giving
                  further depth to tokenomics and game-theory elements
                  surrounding MEME.
                </p>
              </div>
            </div>
            <div className="col-md-5 col-12">
              <div className="contain-img">
                <Image src={MemeCoin} alt="" />
                {/* <img src={MemeCoin} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
