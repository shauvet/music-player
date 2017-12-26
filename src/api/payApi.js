import axios from 'axios'

let base = 'http://pay.earthktv.com/pay';


export const getTradeList = params => {return axios.get(`${base}/trade/list`, {params: params}).then(result => result.data)};

export const getPayPalInfo = params => {return axios.get(`${base}/palinfo`, {params: params}).then(result => result.data)};
