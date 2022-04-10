//transfers
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
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

const createNewFlow = async(cred, rate) => {
  
  // metamask
  // const Provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/');
  
  // const signer = sf.createSigner({
  //   privateKey: "0x15851c05395874b661c50630929ddc93aca248d18bb5ef7f8c6e8630e1b08d93",
  //   provider: Provider
  // });

  // const { ethereum } = window;
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

  const USDCx = "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7";

  try {
    const createFlowOperation = sf.cfaV1.createFlow({
      flowRate: rate,
      receiver: cred,
      superToken: USDCx
      // userData?: string
    });

    console.log("Creating your stream...");

    const result = await createFlowOperation.exec(signer);
    console.log(result);


    console.log(
      `Congrats - you've just created a money stream!
    View Your Stream At: https://app.superfluid.finance/dashboard/${cred}
    Network: Matic
    Super Token: USDCx
    Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
    Receiver: ${cred},
    FlowRate: ${rate}
    `);

    return {data: result}

  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
    return {data: false}
  }
}

export default function TransfersCreateStreamModule() {

  const usxx = UserForm ()
  const asset = UserForm() === "in" ? GetLocalUser() : GetLocalBusiness();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [currentAccount, setCurrentAccount] = useState("");

  const [form, setForm] = useState(false);
  const [data, setData] = useState({
    acnt: '',
    emid: '',
    amnt: ''
  })

  // form validation
  useEffect( () => {
    setForm(false)
    if (data.acnt !=='' && data.emid !=='' && data.amnt !=='') 
      setForm(true);
  },[data]);

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



  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmit(true)

    const monthlyAmount = ethers.utils.parseEther(data.amnt.toString());
    const calculatedFlowRate = Math.floor(monthlyAmount / 3600 / 24 / 30);

    const result = await createNewFlow(data.acnt, calculatedFlowRate)
    console.log (result)

    if (result.data) {
      setDone(true)
    }

  };

  return (
  <>
    {/* info */}
    <WebbModuleInfo data={{ text: 'Please enter transfer details' }} />

    {/* form */}
    <form onSubmit={handleSubmit}>
      <div className={submit ? 'd-none' : ''}>

        <div className="form-group mb-3">
          <label className="form-label small">Address <FormNeeded /></label>
          <input type="text" 
            className="form-control height-md box hilite" 
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.acnt}
            onChange={({ target }) => {handleChange("acnt", target.value);}}
            placeholder="">
          </input>
        </div>

        <div className="form-group mb-3">
          <label className="form-label small">Email <FormNeeded /></label>
          <input type="text" 
            className="form-control height-md box hilite" 
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.emid}
            onChange={({ target }) => {handleChange("emid", target.value);}}
            placeholder="">
          </input>
        </div>

        <div className="form-group mb-3">
          <label className="form-label small">Amount (USDC/mon) <FormNeeded /></label>
          <input type="text" 
            className="form-control height-md box hilite" 
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.amnt}
            onChange={({ target }) => {handleChange("amnt", target.value);}}
            placeholder="">
          </input>
        </div>

      </div>

      {/* actn */}
      <WebbDividerMedium />
      <div className={submit ? 'd-none' : ''}>
        <div className="d-grid">
          <button className={`btn height-md btn-primary back-color-main border-none rounded-pill`}
            disabled={!form}
          ><small>Create Transfer Stream</small>
          </button>
        </div>
      </div>

    </form>

    <div className={submit && !done ? '' : 'd-none'}>
      <div className='p-3 rounded-md  bg-white text-center'>
        <WebbSpinner />
        <p>Creating Stream... In Progress</p>
      </div>
    </div>

    <div className={done ? '' : 'd-none'}>
      <div className='p-3 rounded-md  bg-white text-center'>
        <i className='bx bxs-check-circle text-success' style={{fontSize:'2.4rem'}}></i>
        <p className='m-0'>Your Transfer Stream was Created Succesfully</p>
        
      </div>
      <WebbDividerSmall/>

      <Link to={`/${usxx}/transfers/new`}>
        <div className='p-3 rounded-md  bg-white text-center hilite'>
          <p className='m-0'>Create another Transfer</p>
        </div>      
      </Link>

    </div>

  </>
  )
}