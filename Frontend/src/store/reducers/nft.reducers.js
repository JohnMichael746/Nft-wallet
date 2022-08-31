import { SET_SERVICE_FEE,  SET_EVO_NFT_LIST, SET_NFT_TRADING_RESULT, SET_STAKED_NFT_LIST, SET_TOTAL_REWARD } from "../actions/action.types";

const init = {
    serviceFee: 1.5,   //percentage value 1.5 means 1.5%,
    tradingResult: null,
    evoList: null,
    stakedList: null,
    totalReward: 0
}

export default function Nft(state = init, action) {
    switch(action.type) {
        case SET_TOTAL_REWARD:
            return {
                ...state, totalReward: action.payload
            }
        case SET_STAKED_NFT_LIST:
            return {
                ...state, stakedList: action.payload
            }
        case SET_EVO_NFT_LIST:
            console.log("[SET_EVO_NFT_LIST] action.payload = ", action.payload)
            return {
                ...state, evoList: action.payload
            }
        case SET_SERVICE_FEE:
            return {
                ...state, serviceFee: action.payload
            }
        case SET_NFT_TRADING_RESULT:
            // console.log("[SET_NFT_TRADING_RESULT Reducer ] payload = ", action.payload)
            return {
                ...state, tradingResult: action.payload
            }
        default:
            return {...state};
    }
}
