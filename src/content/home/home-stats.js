//transfers
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Blockies from 'react-blockies';
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

import WebbDividerSmall from "../webb/webb-divider-sm";
import WebbDividerMedium from "../webb/webb-divider-md";
import WebbModuleInfo from "../webb/webb-module-info";
import WebbLoader from "../webb/webb-loader";
import WebbSpinner from '../webb/webb-spinner-sm';
import FormNeeded from "../webb/form-needed";

import { UserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

const getStreamsData = async(acnt) => {
  
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
    createdAtTimestamp: item.createdAtTimestamp*1000,
    live: item.currentFlowRate === "0" ? false : true,
    amnt: (ethers.utils.formatEther(item.streamedUntilUpdatedAt)).split('.')[0]+'.'+(ethers.utils.formatEther(item.streamedUntilUpdatedAt)).split('.')[1].substring(0,6),
    rate: (ethers.utils.formatEther(item.currentFlowRate)*3600*24*30)
  }})

  console.log(streams)

  const amtotal = streams.reduce( (a,c)=> a + Number(ethers.utils.formatEther(c.streamedUntilUpdatedAt)),0)
  console.log (amtotal)

  const stats = {
    streamtt: streams.length,
    streamac: streams.filter(item => item.currentFlowRate !=='0').length,
    streamam: amtotal.toString().split('.')[0]+'.'+amtotal.toString().split('.')[1].substring(0,6),
  }

  return {data: stats}
}

export default function HomeStatsModule() {

  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [currentAccount, setCurrentAccount] = useState("");

  const [data, setData] = useState()

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
      // console.log("Make sure you have metamask!");
      return;
    } else {
      // console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    const chain = await window.ethereum.request({ method: "eth_chainId" });
    // let chainId = chain;
    // console.log("chain ID:", chain);
    // console.log("global Chain Id:", chainId);
    if (accounts.length !== 0) {
      const account = accounts[0];
      // console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      // Setup listener! This is for the case where a user comes to our site
      // and ALREADY had their wallet connected + authorized.
      // setupEventListener()
    } else {
      // console.log("No authorized account found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    async function fetchData() {

      setLoading(true)
      var result = await getStreamsData(currentAccount)
      console.log(result.data)
      setData(result.data)
      setLoading(false)
    }
    fetchData();
  }, []);


  const handleChange = (values) => {
    
  }

  const handleSubmit = async() => {
    // e.preventDefault();

    var result
    if (currentAccount!=="") {
      result = await getStreamsData(currentAccount)
      console.log(result.data)
      setData(result.data)
    }

    if (result.data) {setDone(true)}
    
  };

  if (loading) return (<> <div className='text-center'><WebbSpinner /></div> </>)

  return (
  <>

    {/* data */}
    <WebbModuleInfo data={{ text: `Transfer Statistics` }} />
    
    <div className='p-3 bg-white'>
      <div className='d-flex'>
        <div className='me-auto'>
          <p>Total Payment Streams: </p>
          <p>Total Active Streams: </p>
          <p>Total Payment: </p>
        </div>
        <div className='text-end'>
          <p>{data && data.streamtt}</p>
          <p>{data && data.streamac}</p>
          <p>{data && data.streamam}</p>
        </div>
      </div>
    </div>

  </>
  )
}