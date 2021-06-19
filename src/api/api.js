//DAL-уровень, который отвечает за формирование url

import axios from "axios";

const instance = axios.create({
  withCredentials: true, //благодаря true цепляется наша coockie
  headers: {
    "API-KEY": "73c522ff-bfdb-4f88-bb6e-58eae3d6e793",
  },
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },

  followUser(id) {
    //2-м параметром в Post передается пустой массив
    return instance.post(`follow/${id}`, []).then((response) => {
      return response.data;
    });
  },
  unfollowUser(id) {
    return instance.delete(`follow/${id}`).then((response) => {
      return response.data;
    });
  },
  //мы перенесли этот метод в profileAPI, и теперь,
  //чтобы не переписывать код везде, где применялся этот метод,
  //будем выводить предупреждение в консоли и делегировать
  //этот метод из usersAPI новому методу profileAPI
  getUserProfile(id) {
    console.warn("Obsolete method. Please profileAPI object");
    return profileAPI.getUserProfile(id);
  },
};

export const profileAPI = {
  getUserProfile(id) {
    return instance.get(`profile/` + id).then((response) => {
      return response.data;
    });
  },
  getStatus(id) {
    return instance.get(`profile/status/` + id).then((response) => {
      return response.data;
    });
  },
  //вторым параметром передаем json-объект, который требует сервер
  //это нужно смотреть в api, в документации в request (в Properties)
  updateStatus(status) {
    //отправляем на сервер json-объект, у которого есть свойство status,
    //то, что требует документация
    return instance
      .put(`profile/status`, { status: status })
      .then((response) => {
        return response.data;
      });
  },
};

export const authAPI = {
  authMe() {
    return instance.get(`auth/me`).then((response) => {
      return response.data;
    });
  },
  login(email, password, rememberMe = false) {
    return instance
      .post(`auth/login`, { email, password, rememberMe })
      .then((response) => {
        return response.data;
      });
  },
  logout() {
    return instance.delete(`auth/login`).then((response) => {
      return response.data;
    });
  },
};
