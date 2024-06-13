import { debounce } from "../utils/helperFunction";

import axios from "./instance";

export const getUniqueID = async () => {
  const responce = await axios(`/guest_user?name=&phone=`);
  sessionStorage.setItem("unique_id", responce.data.unique_id);
  return responce.data.unique_id;
};

// export const getQuestion = debounce(async (lang) => {
//   const responce = await axios.post(`/get_questions`, { lang: lang });
//   return responce?.data.questions;
// }, 500);

export const setDataBeforeLogin = async (userResponceArray) => {
  await axios.post(`/before_login_quiz_data`, {
    uuid: userResponceArray.uuid,
    name: userResponceArray.name,
    phone: userResponceArray.phone,
    quiz: userResponceArray.quiz,
  });
};
