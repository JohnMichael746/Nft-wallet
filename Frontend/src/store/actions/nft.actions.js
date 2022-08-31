import isEmpty from "../../utilities/isEmpty";
import { SET_EVO_NFT_LIST, SET_NFT_TRADING_RESULT, SET_STAKED_NFT_LIST, SET_TOTAL_REWARD } from "./action.types";

export const updateEvoNFTList = (items) => async (dispatch) =>
{
    if(isEmpty(items) === true)
    {        
        dispatch({
            type: SET_EVO_NFT_LIST,
            payload: null
        })
    }else{
        dispatch({
            type: SET_EVO_NFT_LIST,
            payload: items
        })
    }
}


export const updateStakedNFTList = (items) => (dispatch) =>
{
    if(isEmpty(items) === true)
    {        
        dispatch({
            type: SET_STAKED_NFT_LIST,
            payload: null
        })
    }else{
        dispatch({
            type: SET_STAKED_NFT_LIST,
            payload: items
        })
    }
}

export const setNFTTradingResult  = (functionName, success, message) => dispatch =>
{    
    console.log("[SET_NFT_TRADING_RESULT action ] : ", functionName, success, message)
    dispatch({
        type: SET_NFT_TRADING_RESULT,
        payload: {
            function : functionName,
            success : success,
            message : message
        }
    });
}

export const emptyNFTTradingResult  = () => dispatch =>
{    
    console.log("[SET_NFT_TRADING_RESULT action ] : null" )
    dispatch({
        type: SET_NFT_TRADING_RESULT,
        payload: null
    });
}

export const updateTotalReward  = (totalReward) => dispatch =>
{
    dispatch({
        type: SET_TOTAL_REWARD,
        payload: totalReward
    })
}
