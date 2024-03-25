import "./css/Model.css";
import { useEffect } from "react";

const Model = ({setModelOpen, contract}) => {

    const Sharing = async () =>{
        console.log("Shared");
        setModelOpen(false);
        const address = document.querySelector(".address").value;
        await contract.allow(address);
    };
    
    const Revoke = async () => {
        const address = document.querySelector("#Revoke").value;
        await contract.disallow(address);
        console.log("Access Revoked");
        setModelOpen(false);
    };
    useEffect(()=>{
        const accessList = async ()=> {
            const addressList = await contract.shareAccess();
            let select = document.querySelector("#selectNumber");
            const option =addressList;

            for(let i=0; i<option.length; i++){
                let opt = option[i];
                let e1 = document.createElement("option");
                e1.textContent =opt;
                e1.value = opt;
                select.appendChild(e1);
            }
        };
        contract && accessList();   
    }, []);
    return <>
    <div className="modalBackground">
        <div className="modalContainer">
            <div className="title">Share With</div>
            <div className="body">
                <input type="text" className="address" placeholder="Enter Address"></input>
            </div>
            <form id="myForm">
                <select id="selectNumber">
                    <option className="address">People With Access</option>
                </select>
            </form>
            <div className="footer">
                <button onClick={() => {setModelOpen(false)}} id="cancelBtn">Cancel</button>
                <button onClick={() =>Sharing()}>Share</button>
            </div>
            <div className="title">Revoke Access</div>
            <div className="body">
                <input type="text" className="address" id="Revoke" placeholder="Enter Address"></input>
            </div>
            <div className="footer">
                <button onClick={() => Revoke()} id="cancelBtn">Revoke</button>               
            </div>
            

        </div>
    </div>
    </>;
}

export default Model;