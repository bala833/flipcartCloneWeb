import axios from "axios";


const baseUrl = process.env.REACT_APP_API_URL;

export const login = async (payload) => {
  try {
    const response = await axios.post(`${baseUrl}login`, payload, {
      headers: {
        "Authorization": "Basic " + btoa(`${payload.username}:${payload.password}`),
        "Content-Type": "application/json",
      },
      withCredentials: true, // include credentials if backend allows cookies/auth
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const signUp = async (payload) => {
    try {
        const response = await axios.post(`${baseUrl}register`, payload, {
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const logout = async (token) => {
  try {
    const response = await axios.post(`${baseUrl}logout`,null, {
        headers : {
            "Authorization": `Bearer ${token}`, // your token from AuthContext
            'Content-Type' : 'application/json'
        }
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
