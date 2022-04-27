import axios from "axios";
import {URL_ROOT} from "../constants/urls";
import JwtService from "../../../services/jwt/JwtService";
import {URL_AUTH, URL_REFRESHTOKEN} from "../../../config/consts/urlsApi";
import {REFRESH_NOT_VALID} from "../../../config/consts/ErrorCode";
import LStorageUser from "../../../services/localstorage/LStorageUser";

export const instance = axios.create({
  baseURL: URL_ROOT,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = JwtService.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = 'Bearer ' + accessToken;
    }
    return config;
  },
  error => Promise.reject(error)
);

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  error => {
    if (isTokenExpiredError(error)) {
      return resetTokenAndReattemptRequest(error);
    }
    return Promise.reject(error);
  }
);

function isTokenExpiredError(error) {
  const {config, response} = error;
  return config?.url !== URL_AUTH && response?.status === 401
}

async function resetTokenAndReattemptRequest(error) {
  try {
    const {response: errorResponse} = error;

    const retryOriginalRequest = new Promise(resolve => {
      addSubscriber(access_token => {
        errorResponse.config.headers.Authorization = 'Bearer ' + access_token;
        resolve(axios(errorResponse.config));
      });
    });

    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;
      let response = await instance.get(URL_REFRESHTOKEN, {
        withCredentials: true
      })
      const {accessToken} = response.data;
      JwtService.updateAccessToken(accessToken);
      isAlreadyFetchingAccessToken = false;
      onAccessTokenFetched(accessToken);
    }
    return retryOriginalRequest;
  } catch (err) {
    console.log(err.response)
    if (err.response.data.errorCode === REFRESH_NOT_VALID) {
      LStorageUser.remove();
      window.location.reload();
    }
    return Promise.reject(err);
  }
}

function onAccessTokenFetched(accessToken) {
  subscribers.forEach(callback => callback(accessToken));
  subscribers = [];
}

function addSubscriber(callback) {
  subscribers.push(callback);
}
