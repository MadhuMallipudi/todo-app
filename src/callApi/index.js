import axios from "axios";
import configuVariables from "../config";
const { accessToken } = configuVariables;
const callApi = async (url, method, data = {}) => {
    let headers = {
        Authorization: `Bearer ${accessToken}`
    }
    try {
        let response = await axios({ method, url, data, headers });
        if (response) return response;
        else return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export { callApi };