// ROOT //
export const URL_ROOT = "https://gunryul.store/api";
// TOKENS //
export const URL_REFRESHTOKEN = "auth/refresh-token"; //auth
// LOGIN //
export const URL_AUTH = "auth/sign-in"; //auth
export const URL_ASK_RECOVER_WITH_EMAIL = "users/ask-for-recover-with-email"; //auth
export const URL_CONFIRM_RECOVERY = "users/confirm-recovery"; //auth
export const URL_USERDATA = "auth/userdata"; //auth
// REGISTER //
export const URL_REGISTER = "users/add"; //register
export const URL_SUBSCRIPTIONTYPE = "subscription-type"; //register
// NAVBAR //
export const URL_LOGOUT = "auth/logout"; //auth
// USERS TEST //
export const URL_ALL_USERS = "users/all"; //users
// PROFILE //
export const URL_PROFILE_INFO = "profile"; //profile
export const URL_PROFILE_UPDATE = "profile/update/"; //profile
export const URL_CHANGE_BALANCE = "profile/change-balance"; //profile
// IMAGE //
export const URL_PROFILE_IMG = "get-image/user"; //profile
// PERMISSIONS //
export const URL_ROLES = "permission/roles"; // permission
// NEWS //
export const URL_NEWS = "news/"; //news
export const URL_NEWS_IMG = "get-image/news/" //news
// ARTICLE //
export const URL_ARTICLE = "article/"; //article
export const URL_ARTICLE_IMG = "get-image/article/" //article
// SCHEDULE //
export const URL_TRAINING = "training"; //training
export const URL_TRAINING_DETAIL = "training/detail"
export const URL_COACHES = "coach"; //training
export const URL_COACH_TRAININGS = "training/coach/"; //training
export const URL_TRAINING_TYPES = "training"; //training
export const URL_ADD_TRAINING_PERSONAL = "training/personal"; //training
export const URL_ADD_TRAINING_GROUP = "training/group"; //training
export const URL_UPDATE_TRAINING_GROUP = "training/update/"; //training
export const URL_DELETE_TRAINING_PERSONAL = "training/delete/personal/"; //training
export const URL_DELETE_TRAINING_GROUP = "training/delete/group/"; //training
export const URL_SIGN_TRAINING_PERSONAL = "training/sign/personal/"; //training
export const URL_SIGN_TRAINING_GROUP ="training/sign/group/"; //training
export const URL_OCCUPIED_COACH_TRAININGS = "training/coach/trainings" //training
export const URL_MY_TRAINING = "training/mygroup"; //training
export const URL_GET_GROUP_MEMBER = "training/member/"; //training
// USERS //
export const URL_IMG_USER = "get-image/user/"; //users
export const URL_DISABLE_USER = "users/disable/"; //users
export const URL_ENABLE_USER = "users/enable/"; //users
// Subscription //
export const URL_APPLY_TRAINING_GROUP = "subscription/apply/"; //training
export const URL_CHECK_APPLY = "subscription/check" // subscription
export const URL_GROUP_SUBSCRIPTION = "subscription/group/" // subscription
export const URL_SUBSCRIPTION_ACCEPT = "subscription/accept/" // subscription
export const URL_SUBSCRIPTION_REFUSE = "subscription/refuse/" // subscription

// Schedule //
export const URL_ADD_SCHEDULE = "schedule" // schedule
export const URL_GET_SCHEDULE = "schedule/" // schedule
// Firebase //
export const URL_SAVE_TOKEN = "firebase" // firebase

