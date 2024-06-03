import { GET, POST } from "../constants/methods";
import { URL_ADD_SCHEDULE, URL_GET_SCHEDULE } from "../constants/urls";
import { makeRequest } from "../makeRequest";

export const addSchedule = (data) => {
    return makeRequest({
      url: URL_ADD_SCHEDULE,
      method: POST,
      data,
    })
}

export const getSchedule = (groupId) => {
    return makeRequest({
        url: URL_GET_SCHEDULE+ groupId,
        methodL: GET,
    })
}
