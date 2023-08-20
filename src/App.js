
import { useState,useEffect } from 'react';
import './App.css';
import Web3 from "web3";

import CrowdFunding from "./contracts/CrowdFunding.json";
import CreateRequest from './component/CreateRequest';
import ShowRequest from './component/ShowRequest';
import Contribute from './component/Contribute';
import Refund from './component/Refund';
import VoteRequest from './component/VoteRequest';

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");
  const [balance,setBalance]= useState(0)
  useEffect(() => {
    async function init() {
      const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CrowdFunding.networks[networkId];
      const contract = new web3.eth.Contract(
        CrowdFunding.abi,
        deployedNetwork.address
      );
     
      setState({ web3: web3, contract: contract });
    }
    init();
  }, []);

  useEffect(() => { // account change
    const { web3 } = state;
    const allAccounts = async () => {
      var select = document.getElementById("selectNumber");
      var options = await web3.eth.getAccounts();

      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
    };
    web3 && allAccounts();
  }, [state]);








  const selectAccount = async () => {
    let selectedAccountAddress = document.getElementById("selectNumber").value;

    if (
      selectedAccountAddress &&
      selectedAccountAddress !== "Choose an account"
    ) {
      setAccount(selectedAccountAddress);
    }
  };


  useEffect(() => { // account change
    const{contract} = state;
    async function ShowCon(){
          let selectedAccountAddress = document.getElementById("selectNumber").value;
          if (
            selectedAccountAddress &&
            selectedAccountAddress !== "Choose an account"
          ) {
            const c = await contract.methods.contributors(selectedAccountAddress).call()
            setBalance(c);
          }
  }
  contract && ShowCon();
  });
  






  return (
    <><div className="App">
      <h1>Decentralize Crowd-Funding</h1>
      <p className="font">Connected Account: {account}</p>
      <p className="font">Your Contribution Amount: {balance} wei</p></div>
      <form className="label0" id="myForm">
        <label htmlFor=""></label>
        <select className="innerBox" id="selectNumber" onChange={selectAccount}>
          <option align="center">Choose an account</option>
        </select>
      </form>
      <Contribute state={state} account={account}></Contribute>
      <VoteRequest state = {state} account={account}></VoteRequest>
      <Refund state={state} account={account}></Refund>
      <h2>Create Request</h2>
      <CreateRequest state = {state} account={account}></CreateRequest>
      <h3>Show Request</h3>
      <ShowRequest state={state}></ShowRequest>
      
      
      </>
      
    
  );
}

export default App;
