import {makeRequest} from "../makeRequest";
import {GET, POST, PUT} from "../constants/methods";
import {
  URL_OCCUPIED_COACH_TRAININGS,
  URL_TRAINING,
  URL_ADD_TRAINING_GROUP,
  URL_ADD_TRAINING_PERSONAL,
  URL_COACH_TRAININGS,
  URL_COACHES,
  URL_DELETE_TRAINING_GROUP,
  URL_DELETE_TRAINING_PERSONAL,
  URL_SIGN_TRAINING_GROUP,
  URL_SIGN_TRAINING_PERSONAL,
  URL_TRAINING_TYPES,
  URL_TRAINING_DETAIL,
  URL_APPLY_TRAINING_GROUP,
  URL_CHECK_APPLY,
  URL_MY_TRAINING,
  URL_GROUP_SUBSCRIPTION,
  URL_SUBSCRIPTION_ACCEPT,
  URL_SUBSCRIPTION_REFUSE,
  URL_UPDATE_TRAINING_GROUP
} from "../constants/urls";


export const getOccupiedCoachTrainings = () => {
  return makeRequest({
    url: URL_OCCUPIED_COACH_TRAININGS,
    method: GET,
  })
}

export const getTrainings = () => {
  return makeRequest({
    url: URL_TRAINING,
    method: GET,
  })
}

export const getTrainingDetail = () => {
  return makeRequest({
    url: URL_TRAINING_DETAIL,
    method: GET,
  })
}



export const getCoachTrainings = (id = "") => {
  return makeRequest({
    url: URL_COACH_TRAININGS + id,
    method: GET,
  })
}

export const getTrainingsName = () => {
  return makeRequest({
    url: URL_TRAINING_TYPES,
    method: GET,
  })
}

export const getCoachesList = () => {
  return makeRequest({
    url: URL_COACHES,
    method: GET,
  })
}

export const addPersonalTraining = (data) => {
  return makeRequest({
    url: URL_ADD_TRAINING_PERSONAL,
    method: POST,
    data,
  })
}

export const deletePersonalTraining = (id) => {
  return makeRequest({
    url: URL_DELETE_TRAINING_PERSONAL + id,
    method: GET,
  })
}

export const deleteGroupTraining = (id) => {
  return makeRequest({
    url: URL_DELETE_TRAINING_GROUP + id,
    method: GET,
  })
}

export const applyGroupTraining = (id) => {
  return makeRequest({
    url : URL_APPLY_TRAINING_GROUP + id,
    method: POST,
  })
}

export const getMytrainings = () => {
  return makeRequest({
    url : URL_MY_TRAINING,
    method: GET,
  })
}

export const checkApply = () => {
  return makeRequest({
    url : URL_CHECK_APPLY,
    method: GET,
  })
}

export const getGroupSubscription = (groupId) => {
  return makeRequest({
    url : URL_GROUP_SUBSCRIPTION+groupId,
    method: GET,
  })
}

export const acceptSubscription = (subscriptionId) => {
  return makeRequest({
    url : URL_SUBSCRIPTION_ACCEPT+subscriptionId,
    method: POST,
  })
}

export const refuseSubscription = (subscriptionId) => {
  return makeRequest({
    url : URL_SUBSCRIPTION_REFUSE+subscriptionId,
    method: POST,
  })
}

export const signGroupTraining = (id) => {
  return makeRequest({
    url: URL_SIGN_TRAINING_GROUP + id,
    method: GET,
  })
}

export const signPersonalTraining = (id) => {
  return makeRequest({
    url: URL_SIGN_TRAINING_PERSONAL + id,
    method: GET,
  })
}

export const addGroupTraining = (data) => {
  return makeRequest({
    url: URL_ADD_TRAINING_GROUP,
    method: POST,
    data,
  })
}

export const updateGroupTraining = (groupId, data) => {
  return makeRequest({
    url: URL_UPDATE_TRAINING_GROUP+groupId,
    method: PUT,
    data,
  })
}


