import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

export function init(baseUrl) {
  restApi = applyCaseMiddleware(axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  }));
  // restApi = axios.create({
  //   baseURL: baseUrl,
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   }
  // });
  
  restApi.interceptors.request.use(function(req) {
    req.headers.Authorization = `Bearer ${sessionStorage.access_token}`;
    // req.headers['Accept-Language'] = 'sdf';
  
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