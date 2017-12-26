import axios from 'axios'

let base = 'http://share.earthktv.com/api';


export const getShareInfo = params => {return axios.get(`${base}/share/info`, {params: params}).then(result => result.data)};

