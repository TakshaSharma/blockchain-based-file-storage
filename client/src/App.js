import "./App.css";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import Model from "./components/Model";
import { useState, useEffect } from "react";
const { ethers } = require("ethers");

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      if (provider) {
        try {
          //"Reload acc no automaticlly when Meta acc changes"
          if (window.ethereum) {
            window.ethereum.on("accountsChanged", () => {
              window.location.reload();
            });
          }

          await window.ethereum.request({ method: "eth_requestAccounts" });
          // Continue with your code to interact with Ethereum
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
          let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

          //SC Instance
          const contract = new ethers.Contract(
            contractAddress,
            Upload.abi,
            signer
          );
          //console.log(contract);
          setContract(contract);
          setProvider(provider);
        } catch (error) {
          console.error("Failed to request Ethereum accounts:", error);
        }
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <>
      {!modelOpen && (
        <button
          className="share"
          onClick={() => {
            setModelOpen(true);
          }}
        >
          Share
        </button>
      )}
      {modelOpen && <Model setModelOpen={setModelOpen} contract={contract} />}

      <div className="App">
        <h1 style={{ color: "white" }}> Decentralize File Storage</h1>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
        <p style={{ color: "white" }}>
          Account: {account ? account : "Metamask not Connected"}
        </p>
        <FileUpload account={account} provider={provider} contract={contract} />
        <Display contract={contract} account={account} />
      </div>
    </>
  );
}

export default App;
