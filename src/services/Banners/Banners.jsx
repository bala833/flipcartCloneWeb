import axios from "axios";
import { useApi } from "../../withAxios/withAxios";


const baseUrl = process.env.REACT_APP_API_URL;


export const getAllBanner = async (authToken) => {
    try {
        const response = await axios.get(`${baseUrl}banner`, {
            withCredentials: true,
            headers : {
                  // your token from AuthContext

                'Content-Type' : 'application/json'
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}
export const getByIdBanner = async (authToken, id) => {
    try {
        const response = await axios.get(`${baseUrl}banner/${id}`, {
            withCredentials: true,

            headers : {
                //  "Authorization": `Bearer ${authToken}`, // your token from AuthContext
                'Content-Type' : 'application/json'
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}
export const updateBanner = async (id, data, authToken) => {
    try {
        const response = await axios.post(`${baseUrl}banner/${id}`, data, {
            withCredentials: true,
            headers : {
                //  "Authorization": `Bearer ${authToken}`, // your token from AuthContext

                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}
export const addBanner = async (payload, authToken) => {
    try {
        const response = await axios.post(`${baseUrl}banner`, payload, {
            withCredentials: true,
            headers : {
                //  "Authorization": `Bearer ${authToken}`, // your token from AuthContext

                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}