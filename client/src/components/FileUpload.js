import { useState } from "react";
import axios from "axios";
import "./css/FileUpload.css";
import {pinata_api_key, pinata_secret_api_key} from "./config";
const FileUpload = ({account, provider, contract}) =>{
    const[file, setFile] = useState(null);
    const[fileName, setFileName] = useState("No Image Slected")

    const handleSubmit = async (props) =>{
        props.preventDefault();
        if(file) {
            try {
                const formData = new FormData();
                formData.append("file", file);
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: pinata_api_key,
                        pinata_secret_api_key: pinata_secret_api_key,
                        "Content-Type": "multipart/form-data",
                    },
                });     
            const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
            contract.add(account,ImgHash);
            alert("Successfully Image Uploaded");
            setFileName("No Image Selected");
            setFile(null)
            } catch(props){
                alert("Unable to Upload Images to Pinata");
            }
        }

    };
    const retrieveFile = (event) =>{
        const data  = event.target.files[0];   // Array of Files Object
        //console.log(data);
        //Read Image File
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () =>{
            setFile(event.target.files[0]);
        };
        setFileName(event.target.files[0].name);
        event.preventDefault();

    };
    return <div className="top">
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="file-upload" className="choose">
                Choose Image
            </label>
            <input disabled={!account} type="file" id="file-upload" name="data" onChange={retrieveFile} />
            <span className="textArea">Image: {fileName}</span>
            <button type="submit" className="upload">Submit</button>
        </form>
    </div>
}

export default FileUpload;