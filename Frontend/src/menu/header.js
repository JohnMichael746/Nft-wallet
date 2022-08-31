import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import isEmpty from "../utilities/isEmpty";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from "@mui/material";
import { connectWallet, getMintedNFTCount, getUsersEvoNFTs } from '../interactWithSmartContract';
import { setConnectedWalletAddress } from '../store/actions/auth.actions';

const connectTheme = createTheme({
    palette: {
      primary: {
        main: "#ffbd59",
      },
    },
  });

const Header= function() {
  
  const [compressedAddress, setCompressedAddress] = useState("");

  const account = useSelector(state => state.auth.currentWallet);
  const walletStatus = useSelector(state => state.auth.walletStatus);
  const dispatch = useDispatch();

  const ConnectWallet = async () => {
    let connection = await connectWallet();
    if(connection.success === true) dispatch(setConnectedWalletAddress(connection.address));
  }

  const DisconnectWallet = () =>
  {

  }
  
  useEffect(() => 
  {
    if(isEmpty(account)) return;
    let compAddress = "";
    compAddress = account.substring(0, 6)+"..."+account.substring(account.length-4, account.length);
    setCompressedAddress(compAddress);  
    getUsersEvoNFTs(account);
    getMintedNFTCount();
    
  }, [account, dispatch])

  return (
     <div className='header padder-50' style={{ justifyContent: "flex-end" }}>
        <ThemeProvider theme={connectTheme}>
          {walletStatus === false && <Button variant="contained" color="primary" className="btn_connect" onClick={() => ConnectWallet() }>Connect Wallet</Button>}
          {walletStatus === true &&  <Button variant="contained" color="primary" className="btn_connect" onClick={() => DisconnectWallet() }>{compressedAddress}</Button>}
        </ThemeProvider>      
      </div>
    );
}

export default Header;
