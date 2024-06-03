import { makeRequest } from "../makeRequest";
import { DELETE, GET} from "../constants/methods";
import { URL_ARTICLE, URL_ARTICLE_IMG } from "../constants/urls";

// export const addArticle = (data) => {
//   return makeRequest({
//     url: URL_ARTICLE,
//     method: POST,
//     data,
//   });
// };

export const getArticle = (pageNumber) => {
  return makeRequest({
    url: URL_ARTICLE + pageNumber,
    method: GET,
  });
};

export const getArticleImage = (id) => {
  return makeRequest({
    url: URL_ARTICLE_IMG + id,
    method: GET,
    responseType: "blob",
  });
};

export const deleteArticle = (id) => {
  return makeRequest({
    url: URL_ARTICLE + id,
    method: DELETE,
    data: { id: id },
  });
};
