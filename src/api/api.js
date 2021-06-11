import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  headers: {
    "API-KEY": "73c522ff-bfdb-4f88-bb6e-58eae3d6e793",
  },
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    //делаем get-запрос, запрашиваем текущую страницу (page-название из документации)
    //и количество записей на 1 странице (count-название из документации)
    return instance
      .get(`users?page=${currentPage}&count${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },
};

export const followApi = {
  followUser(id) {
    return instance.post(`follow/${id}`, []).then((response) => {
      return response.data;
    });
  },
};

export const unfollowApi = {
  unfollowUser(id) {
    return instance.delete(`follow/${id}`, []).then((response) => {
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
};