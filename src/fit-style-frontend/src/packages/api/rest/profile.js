import {makeRequest} from "../makeRequest";
import {GET, PATCH, PUT} from "../constants/methods";
import {
  URL_CHANGE_BALANCE,
  URL_PROFILE_IMG,
  URL_PROFILE_INFO,
  URL_PROFILE_UPDATE
} from "../constants/urls";

export const getProfileInfo = () => {
  return makeRequest({
    url: URL_PROFILE_INFO,
    method: GET,
  });
}

export const updateProfileInfo = (id,data) => {
  return makeRequest({
    url: URL_PROFILE_UPDATE+id,
    method: PUT,
    data,
  });
}

export const addBalance = (amount) => {
  return makeRequest({
    url: URL_CHANGE_BALANCE,
    method: PATCH,
    data: {summary: amount}
  });
}

export const getProfileImg = () => {
  return makeRequest({
    url: URL_PROFILE_IMG,
    method: GET,
    responseType: 'blob',
  });
}
