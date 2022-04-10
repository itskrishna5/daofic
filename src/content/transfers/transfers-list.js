//transfers
import { useState, useEffect } from 'react';
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

import { Form, Input, Button } from 'antd';
import { parseFixed } from '@ethersproject/bignumber';

async function getStreamsData() {
  
  const Provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts"
  });

  const signer = Provider.getSigner(accounts[0]);
  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  
  const sf = await Framework.create({
    // networkName:  "mumbai",
    chainId: Number(chainId),
    provider: Provider
  });
   
  const result = await sf.query.listStreams(
    { sender: '0xbC1c628bfDc9156e11b2525fc19D64A9AFE8895c' },
    { skip: 0, take: 150 },
    {
      orderBy: "createdAtTimestamp",
      orderDirection: "desc"
  });  
  
  const streams = Array.from(result.data, item => {return {
    ...item, 
    amnt: (ethers.utils.formatEther(item.streamedUntilUpdatedAt)).split('.')[0]+'.'+(ethers.utils.formatEther(item.streamedUntilUpdatedAt)).split('.')[1].substring(0,6)
  }})

  console.log(streams)
}

export default function TransfersListModule() {

  const [form] = Form.useForm();
  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      // let account = currentAccount;
      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      // setupEventListener()
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    const chain = await window.ethereum.request({ method: "eth_chainId" });
    let chainId = chain;
    console.log("chain ID:", chain);
    console.log("global Chain Id:", chainId);
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      // Setup listener! This is for the case where a user comes to our site
      // and ALREADY had their wallet connected + authorized.
      // setupEventListener()
    } else {
      console.log("No authorized account found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);


  const handleChange = (values) => {
    
  }

  const handleSubmit = (values) => {

    getStreamsData()
  };

  return (
  <>

    <Button type="primary" onClick={()=>handleSubmit()}>Get Stream Data</Button>
    

  </>
  )
}