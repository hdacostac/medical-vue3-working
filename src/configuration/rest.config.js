import axios from 'axios';

export function init(baseUrl) {
  restApi = axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  });
  
  restApi.interceptors.request.use(req => {
    req.headers.Authorization = `Bearer ${sessionStorage.access_token}`;
  
    return req;
  });
}

export function fillArrayFromRest(url, reference, arrayName, queryParams = {}, callback) {
  let self = reference;

  restApi.get(url, {
    params: queryParams
  }).then(function(res) {
    self[arrayName] = [];

    Object.entries(res.data).forEach(item => { 
      self[arrayName].push(item[1]);
    });

    if(typeof callback === "function") {
      callback();
    }
  });
}

export let restApi;