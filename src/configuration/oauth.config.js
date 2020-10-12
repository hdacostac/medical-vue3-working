import axios from 'axios';

const ACCESS_TOKEN_VALUE =  "access_token";

let oauthServerBaseUrl;

function isJWTPresent() {
  return !(sessionStorage[ACCESS_TOKEN_VALUE] == undefined || sessionStorage[ACCESS_TOKEN_VALUE] == null);
}

function checkClaims() {
  console.log("Checking claims!!");

  getSyncJWTByPasswordFlow();
}

// eslint-disable-next-line no-unused-vars
function getJWTByPasswordFlow() {
  console.log("Asking for a new JWT");

  const username = 'clientIdPassword';
  const password = '';
  const auth = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');

  let urlencoded = new URLSearchParams();
  urlencoded.append("username", "hdacostac@gmail.com");
  urlencoded.append("password", "1234");
  urlencoded.append("grant_type", "password");

  axios.request({
    baseURL: oauthServerBaseUrl,
    url: "/token",
    method: "post",
    headers: { 
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${auth}`
    },
    data: urlencoded
  }).then(function(res) {    
    console.log('access_token:' + res.data.access_token);

    sessionStorage[ACCESS_TOKEN_VALUE] = res.data.access_token;
  });
}

function getSyncJWTByPasswordFlow() {
  console.log("Asking for a new JWT in sync way");

  const username = 'clientIdPassword';
  const password = '';
  const auth = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');

  let urlencoded = new URLSearchParams();
  urlencoded.append("username", "hdacostac@gmail.com");
  urlencoded.append("password", "1234");
  urlencoded.append("grant_type", "password");

  let xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.open("POST", oauthServerBaseUrl + "/token", false);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader("Authorization", `Basic ${auth}`);

  xhr.send(urlencoded);

  if (xhr.status === 200) {
    let token = JSON.parse(xhr.responseText);

    console.log('access_token:' + token.access_token);

    sessionStorage[ACCESS_TOKEN_VALUE] = token.access_token;
  }
}

export function init(baseUrl) {
  oauthServerBaseUrl = baseUrl;
}

export default {
  checkSecurityConstraint: () => {
    if(isJWTPresent()) {
      console.log("JWT is present");
      checkClaims();
    } else {
      console.log("JWT is NOT present");
      getSyncJWTByPasswordFlow();
    }
  }
}