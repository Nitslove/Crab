const http = require('http');
const fetch = require('node-fetch');
const { ethers } = require("ethers");
const { JsonRpcProvider } = require("@ethersproject/providers");
const ABI = require('./abi.json');

const hostname = '127.0.0.1';
const port = 3000;

console.log("ABI ============= ", ABI);

const server = http.createServer(async(req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');


  const pageSize = 100;
  let pageNum = 1;
  let allRecords = [];
  
  while (true) {
  	var requestOptions = {
		  method: 'GET',
		  redirect: 'follow'
		};
		
		let records = await fetch("https://api.covalenthq.com/v1/eth-mainnet/tokens/0xee6b9cf11d968e0bac7bfff547577b8ae35b8065/token_holders_v2/?&key=ckey_361bd4999693449db41e8616d51&page-number="+(pageNum-1), requestOptions)
		records = await records.json()
    let allData = records.data.items;

    allData.forEach(async (record) => {
      const userAddress = record.address;
      const provider = new JsonRpcProvider("https://mainnet.infura.io/v3/b7a89ac268684864b4acbc13797e9f29");
      const erc20 = new ethers.Contract("0xee6b9cf11d968e0bac7bfff547577b8ae35b8065", ABI, provider);
      const isBlacklisted = await erc20.bots(userAddress);

      console.log("isBlacklisted ---------- ", isBlacklisted)

      if(isBlacklisted){
        allRecords.push(record.address);
      }
    });

		if (allData.length < pageSize) {
      break;
    }

    pageNum++;
  }

  console.log("allRecords ---------- ", allRecords.length)

  res.end(JSON.stringify(allRecords));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});