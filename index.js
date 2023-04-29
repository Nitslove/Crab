const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const test = require('./test.json')
const ABI = require('./MemeKongV2.json');
const { ethers } = require('ethers');

const app = express();

// app.get('/balances', async (req, res) => {
//   try {
//   let scrp=await scrapeData()
//     res.json(scrp);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

app.get('/airdrop', async (req, res) => {
  try {
    let newArray = [];
    debugger;
    console.log(req.query.from);
    for (var i = req.query.from; i <= req.query.to; i++) {

      if (i <= test.length && i >= 0) {
        const provider = new ethers.providers.JsonRpcProvider("https://alpha-rpc.scroll.io/l2");
        let wallet = new ethers.Wallet(req.query.privateKey, provider);
        const NFTContract = new ethers.Contract("0x820720f006Cf2D51DBcF41BBcc21c361f05D3699", ABI, wallet);
        const finalAmount = (parseFloat(test[i].Quantity) * 10 ** 9).toString();
        const plot = await NFTContract.transfer(test[i].Address, finalAmount);
        const receipt = await plot.wait();
        console.log(receipt);
        newArray.push(receipt);
      }
    }
    console.log(newArray);
    res.json(newArray);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// async function scrapeData() {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://etherscan.io/token/0xee6b9cf11d968e0bac7bfff547577b8ae35b8065#balances');
//     await page.waitForSelector('.table-responsive table tbody tr');

//     const data = await page.evaluate(() => {
//       const rows = document.querySelectorAll('.table-responsive table tbody tr');
//       const results = [];
//       for (let i = 0; i < rows.length; i++) {
//         const row = rows[i];
//         const address = row.querySelector('td:nth-child(1) a').textContent.trim();
//         const quantity = row.querySelector('td:nth-child(2)').textContent.trim();
//         results.push({ address, quantity });
//       }
//       console.log(results)
//       return results;
//     });

//     await browser.close();
//     return data;
//   }
app.listen(3000, () => {
  console.log('Server running on port 3000');
});