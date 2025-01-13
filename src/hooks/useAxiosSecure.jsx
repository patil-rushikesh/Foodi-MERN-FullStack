import axios from "axios"
import { useNavigate } from "react-router-dom"
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();
    //request 
    axiosSecure.interceptors.request.use((config) => {
        // Do something before request is sent
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, (error) => {
        // Do something with request error
        return Promise.reject(error);
    });
    //reponse
    axiosSecure.interceptors.response.use((response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, async (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const status = error.response.status
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/signup')
        }

        return Promise.reject(error);
    });
    return axiosSecure
}

export default useAxiosSecure