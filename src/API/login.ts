import { TloginRequest, TloginResponse } from "@/lib/types";
import axios from "axios"

export function Login(credientls: TloginRequest) {
    return axios.post<TloginResponse>("/api/login", credientls);
}