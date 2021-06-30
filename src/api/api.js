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
  async getUsers(currentPage = 1, pageSize = 10) {
    let response = await instance.get(
      `users?page=${currentPage}&count${pageSize}`
    );

    return response.data;
  },

  async followUser(id) {
    //2-м параметром в Post передается пустой массив
    let response = await instance.post(`follow/${id}`, []);
    return response.data;
  },
  async unfollowUser(id) {
    let response = await instance.delete(`follow/${id}`);
    return response.data;
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
  async getUserProfile(id) {
    let response = await instance.get(`profile/` + id);
    return response.data;
  },
  async getStatus(id) {
    let response = await instance.get(`profile/status/` + id);
    return response.data;
  },
  //вторым параметром передаем json-объект, который требует сервер
  //это нужно смотреть в api, в документации в request (в Properties)
  async updateStatus(status) {
    //отправляем на сервер json-объект, у которого есть свойство status,
    //то, что требует документация
    let response = await instance.put(`profile/status`, { status: status });

    return response.data;
  },
  async savePhoto(photoFile) {
    const formData = new FormData();
    formData.append("image", photoFile); //смотрим на сервере тип запроса - "image", добавим файл из input - photoFile

    let response = await instance.put(`profile/photo`, formData, {
      //мы отправляем не json, как в статусе, а formData, укажем это в 3-м параметре
      //объект c заголовком header: Content-Type: form/multipart можно не отправлять в API.
      //Конструктор FormData() формирует его сам автоматически
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};

export const authAPI = {
  async authMe() {
    let response = await instance.get(`auth/me`);
    return response.data;
  },
  async login(email, password, rememberMe = false) {
    let response = await instance.post(`auth/login`, {
      email,
      password,
      rememberMe,
    });

    return response.data;
  },
  async logout() {
    let response = await instance.delete(`auth/login`);
    return response.data;
  },
};
