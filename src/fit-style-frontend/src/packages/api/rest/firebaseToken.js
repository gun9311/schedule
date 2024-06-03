import { POST } from "../constants/methods"
import { URL_SAVE_TOKEN } from "../constants/urls"
import { makeRequest } from "../makeRequest"

export const saveToken = (data) => {
    return makeRequest({
      url: URL_SAVE_TOKEN,
      method: POST,
      data,
    })
  }