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
  return {data: streams}
}

export default function TransfersListModule() {

  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [currentAccount, setCurrentAccount] = useState("");

  const [data, setData] = useState([])

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
      if (currentAccount!=="") {
        console.log ("acnt",currentAccount)
        
        var result = await getStreamsData(currentAccount)
        console.log(result.data)
        setData(result.data)
      } 
      setLoading(false)
    }
    fetchData();
  }, [currentAccount]);


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
    <WebbModuleInfo data={{ text: `Total Transfers: ${data.length}` }} />
    
    {data && data.map((item, i) => (
        
          <Link to={`/${UserForm()}/${item.link}`} className="mb-2">
            <div className="d-flex rounded-wd py-3 bg-wite hilite mb-2">
        
              <div className='ms-2'>
                <Blockies seed={item.receiver || '123'} className="identicon rounded-circle m-0 p-0 mt-1" size={7} />
              </div>
              
              <div className="ms-2 d-md-block">
                <span>{item.live 
                  ? <i className='bx bxs-circle text-success'></i>
                  : <i className='bx bxs-circle text-lite'></i>
                }</span>
              </div>

              <div className="ms-2 d-md-block">
                <p className={`m-0 fw-bold text-dark small text-sm`}>{item.receiver}</p>
                <p className={`m-0 text-dark small text-sm`}>
                  {(new Date(item.createdAtTimestamp)).toISOString()}
                </p>
              </div>

              <div className='ms-auto text-end me-2'>
                <p className={`m-0 fw-bold text-dark text-sm`}>
                  {item.amnt}
                </p>
                <p className={`m-0 text-dark small text-sm`}>
                  {item.rate}
                </p>
              </div>


            </div>     
            
          </Link>
        
      ))}



    {/* actn */}
    <WebbDividerMedium />
    <div className={currentAccount !=="" ? 'd-none' : ''}>
      <div className="d-grid">
        <button className={`btn height-md btn-primary back-color-main border-none rounded-pill`}
           onClick = {() => connectWallet()}
          ><small>Connect Account</small>
        </button>
      </div>
    </div>

  </>
  )
}