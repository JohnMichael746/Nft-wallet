import { navigate } from '@reach/router';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import isEmpty from '../utilities/isEmpty';
import { NotificationManager } from 'react-notifications';
import { emptyNFTTradingResult } from '../store/actions/nft.actions';
import { getStakingInfoOfUser, getUsersEvoNFTs, stake, unstake, claim } from '../interactWithSmartContract';

const connectTheme = createTheme({
    palette: {
      primary: {
        main: "#ffbd59",
      },
    },
  });

var  updateListTimer;

const Staking = () =>
{    
    const dispatch = useDispatch();
    const evoItems  = useSelector(state => state.nft.evoList);
    const account = useSelector(state => state.auth.currentWallet);
    const walletStatus = useSelector(state => state.auth.walletStatus);
    const nftOperationResult = useSelector( state => state.nft.tradingResult );
    const stakedItems = useSelector(state => state.nft.stakedList);
    const totalReward = useSelector(state => state.nft.totalReward);
        
    useEffect(() =>{
        
        if(updateListTimer !== null) clearInterval(updateListTimer);
        updateListTimer = setInterval(() =>
        {               
            if(!isEmpty(account)) 
            {
                getStakingInfoOfUser(account)
                getUsersEvoNFTs(account);
            }
        }, 3000)

    }, [evoItems, account ])

    useEffect(() => {
        if(!isEmpty(nftOperationResult))
        {
          switch(nftOperationResult.function)
          {
            default:
              break;
            case "stake":
            case "unstake":
              if(nftOperationResult.success === true) 
              {            
                NotificationManager.success(nftOperationResult.message, "Success", 2000); 
              }
              if(nftOperationResult.success === false) NotificationManager.error(nftOperationResult.message, "Error", 2000);
              dispatch(emptyNFTTradingResult());   
              setTimeout(() => 
              {           
                getUsersEvoNFTs(account);
              }, 3000)
              break;
            case "claim":
                if(nftOperationResult.success === true) 
                {            
                  NotificationManager.success(nftOperationResult.message, "Success", 2000); 
                }
                if(nftOperationResult.success === false) NotificationManager.error(nftOperationResult.message, "Error", 2000);
                dispatch(emptyNFTTradingResult());   
                break;
          }
        }
      }, [nftOperationResult, account, dispatch])

    const onClickStake = async (tokenId) =>
    {
        if(!isEmpty(account) && walletStatus === true) await stake(account, [ tokenId ]);
        else NotificationManager.warning("Please connect your wallet.", "Warning",  2000)        
    }

    const onClickUnstake = async (tokenId) =>
    {
        if(!isEmpty(account) && walletStatus === true) await unstake(account, [ tokenId ]);
        else NotificationManager.warning("Please connect your wallet.", "Warning",  2000)          
    }

    const onClickClaim  = async () =>
    {
        if(!isEmpty(account) && walletStatus === true) await claim(account);
        else NotificationManager.warning("Please connect your wallet.", "Warning",  2000)          
    }

    return(
        <div className='container'>
            {
                isEmpty(evoItems) === false && evoItems.length > 0 &&
                <>
                <div 
                    style={{
                        marginTop: "100px",
                        marginBottom: "100px",
                        textAlign: "center",
                        color: "white",
                        fontWeight: "900",
                        fontSize: "40px",
                        fontFamily: "Opensans-ExtraBold"
                    }}
                >
                    Stake your Evo Bullz
                </div>
                <div 
                    style={{
                        marginLeft: "120px",
                        justifyContent:"flex-start"
                    }}
                >
                    <ThemeProvider theme={connectTheme}>
                        <Button variant="contained" color="primary" className="btn_back2home" onClick={() => navigate("/") }>back to home</Button>
                    </ThemeProvider>
                </div>
                <div 
                    style={{ 
                        display:"flex", 
                        flexWrap: "wrap",
                        marginLeft: "100px",
                        marginRight: "100px"
                    }}
                >
                    {
                        evoItems.map((item, index) => (
                            <div key={index} 
                                style={{ 
                                    margin: "20px", 
                                    width:"20%",
                                    border: "solid #fff 1px",
                                    paddingBottom: '10px'
                                }}
                            >   
                                <div 
                                    style={{ 
                                        width:"100%", 
                                        color:"white",                                        
                                        fontWeight: "450",
                                        fontSize: "20px",
                                        textAlign: "center",
                                        padding: "10px"
                                    }}
                                >
                                    {item.metadata && item.metadata.name}
                                </div>
                                <img src={item.metadata && item.metadata.image && item.metadata.image} alt="Evo NFT" 
                                    style={{ width: "100%"}}    
                                >                                
                                </img>
                                <div style={{ display:"flex", justifyContent:"space-around" }}>
                                    <div 
                                        style={{
                                            display: "flex",
                                            alignItems: "center"
                                        }}
                                    >
                                        <ThemeProvider theme={connectTheme}>
                                            <Button variant="contained" color="primary" className="btn_stake" onClick={() => {onClickStake(item.token_id)} }>Stake</Button>
                                        </ThemeProvider>                                    
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                </>
            }
            {
                isEmpty(stakedItems) === false && stakedItems.length > 0 &&
                <>                
                <div 
                    style={{
                        marginTop: "100px",
                        marginBottom: "100px",
                        textAlign: "center",
                        color: "white",
                        fontWeight: "900",
                        fontSize: "40px",
                        fontFamily: "Opensans-ExtraBold"
                    }}
                >
                    Claim your reward
                </div>
                <div 
                    style={{
                        marginLeft: "120px",
                        justifyContent:"flex-start"
                    }}
                >
                    <ThemeProvider theme={connectTheme}>
                        <Button variant="contained" color="primary" className="btn_back2home" onClick={() => {onClickClaim()} }> Claim </Button>
                    </ThemeProvider>
                    <span style={{ color: "white" }}>     Total : {totalReward} EVO</span>
                </div>
                <div 
                    style={{ 
                        display:"flex", 
                        flexWrap: "wrap",
                        marginLeft: "100px",
                        marginRight: "100px"
                    }}
                >
                    {
                        stakedItems.map((item, index) => (
                            <div key={index} 
                                style={{ 
                                    margin: "20px", 
                                    width:"20%",
                                    border: "solid #fff 1px",
                                    paddingBottom: '10px'
                                }}
                            >   
                                <div 
                                    style={{ 
                                        width:"100%", 
                                        color:"white",                                        
                                        fontWeight: "450",
                                        fontSize: "20px",
                                        textAlign: "center",
                                        padding: "10px"
                                    }}
                                >
                                    {item && item.metadata && item.metadata.name}
                                </div>
                                <img src={item && item.metadata && item.metadata.image && item.metadata.image} alt="Evo NFT" 
                                    style={{ width: "100%"}}    
                                >                                
                                </img>
                                <div style={{ display:"flex", justifyContent:"space-around" }}>
                                    <div 
                                        style={{ 
                                            width:"40%", 
                                            color:"white",                                        
                                            fontWeight: "450",
                                            fontSize: "20px",
                                            alignItems: "center"
                                        }}
                                    >{item.reward} EVO</div>
                                    <div 
                                        style={{
                                            display: "flex",
                                            alignItems: "center"
                                        }}
                                    >
                                        <ThemeProvider theme={connectTheme}>
                                            <Button variant="contained" color="primary" className="btn_stake" onClick={() => {onClickUnstake(item.token_id)} }>Unstake</Button>
                                        </ThemeProvider>                                    
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                </>
            }
        </div>
    )
}

export default Staking;
