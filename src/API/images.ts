"use client";


import axios from "axios";

export const getImageByOffset = ()=>{
    return axios.get(`/api/images`);
}