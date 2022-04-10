//transfers
import { useState, useEffect } from 'react';
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

import { Form, Input, Button } from 'antd';

async function createNewFlow(cred, rate) {
  
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
    `
    );
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}

export default function TransfersNewModule() {

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

    const monthlyAmount = ethers.utils.parseEther(values.amnt.toString());
    const calculatedFlowRate = Math.floor(monthlyAmount / 3600 / 24 / 30);

    createNewFlow(values.cred, calculatedFlowRate)
  };

  return (
  <>

    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleChange}
      onFinish={handleSubmit}
    >
      <Form.Item label="Address" name='cred' required tooltip="Destination Account">
        <Input placeholder="0x123456" />
      </Form.Item>
      <Form.Item label="Amount (USDC/mon)" name='amnt' required tooltip="Montly Transfer Amount">
        <Input placeholder="0.00" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Create Stream</Button>
      </Form.Item>
    </Form>

    <br/><br/>
    <Button type="primary" onClick={()=>connectWallet()}>Disconnect Wallet</Button>
    

  </>
  )
}