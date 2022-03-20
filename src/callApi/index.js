import axios from "axios";
import configuVariables from "../config";
const {accessToken} = configuVariables;
const callApi = async (url,method,params="",payload={}) => {
    let headers = {
        Authorization : `Bearer ${accessToken}` 
    }

    console.log("payload",method,url,payload,headers)
    try {
        let response = await axios({ method,url,data:payload,headers });
        if(response) return response;
        else return false;
    } catch (error){
        console.log(error);
        return false;
    }
}

export {callApi};