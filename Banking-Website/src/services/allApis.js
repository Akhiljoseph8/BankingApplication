import { commonApi } from "./commonApi";
import base_url from "./server_url";

export const userRegister = async (data) => {
    return await commonApi("POST", `${base_url}/register`, data, "")
}

export const userLogin = async (data) => {
    return await commonApi("POST", `${base_url}/login`, data, "")
}

export const updateBalance = async (data,header) => {
    return await commonApi("PUT", `${base_url}/update-balance`, data,header)
}

export const getBalance = async (header) => {
    return await commonApi("GET", `${base_url}/get-balance`,"",header)
}

export const getHistory = async (header) => {
    return await commonApi("GET", `${base_url}/get-history`,"",header)
}

export const allUsers = async (header) => {
    return await commonApi("GET", `${base_url}/all-users`,"",header)
}

export const removeUser = async(id)=>{
    return await commonApi("DELETE",`${base_url}/delete-user/${id}`,{},"")
}

export const adminLogin = async (data) => {
    return await commonApi("POST", `${base_url}/admin-login`, data, "")
}
