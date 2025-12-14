import axios from "axios";
import { useApi } from "../../withAxios/withAxios";


const baseUrl = process.env.REACT_APP_API_URL;


export const getProductList = async (authToken, page=0, size=10) => {
    try {
        const response = await axios.get(`${baseUrl}products?page=${page}&size=${size}`, {
            headers : {
                 "Authorization": `Bearer ${authToken}`, // your token from AuthContext

                'Content-Type' : 'application/json'
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}


export const getProduct = async (authToken, id) => {
    try {
        const response = await axios.get(`${baseUrl}product/${id}`, {
            headers : {
                 "Authorization": `Bearer ${authToken}`, // your token from AuthContext

                'Content-Type' : 'application/json'
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }

}
export const addProduct = async (payloadFormData, authToken) => {
    try {
        const response = await axios.post(`${baseUrl}product`, payloadFormData , {
            headers : {
                 "Authorization": `Bearer ${authToken}`, // your token from AuthContext

                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }

}

export const updateProduct = async (id, payloadFormData, authToken) => {
    try {
        const response = await axios.put(`${baseUrl}product/${id}`, payloadFormData , {
            headers : {
                 "Authorization": `Bearer ${authToken}`, // your token from AuthContext
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
    return error.response;
}
}



export const SearchProduct = async (keyword, authToken) => {

    try {
        const response = await axios.get(`${baseUrl}product/search?keyword=${keyword}`, {
            headers : {
                 "Authorization": `Bearer ${authToken}`, // your token from AuthContext
                'Content-Type' : 'application/json'
            }
        });
        return response;
    } catch (error) {
    return error.response;
}
}