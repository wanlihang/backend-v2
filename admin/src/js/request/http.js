import axios from "axios";
import Utils from "@/js/utils";
import config from "@/js/config";
import router from "../../router";

// 请求超时
axios.defaults.timeout = 30000;
axios.defaults.baseURL = config.url;

// 请求拦截器(附带上token)
axios.interceptors.request.use(
  (config) => {
    const token = Utils.getToken();
    token && (config.headers.Authorization = "Bearer " + token);
    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    let status = response.data.status;
    if (status !== 0) {
      if (status === 401) {
        // 未登录,跳转到登录界面
        Utils.clearToken();
        router.replace({
          name: "Login",
        });
        return;
      }
      // 其它错误
      return Promise.reject(response);
    } else {
      return Promise.resolve(response);
    }
  },
  // 当http的状态码非0
  (error) => {
    let httpCode = error.response.status;
    if (httpCode === 401) {
      // 未登录
      Utils.clearToken();
      router.replace({
        name: "Login",
      });
    } else if (httpCode === 403) {
      // 无权限
    } else {
      // 其他错误
    }
    return Promise.reject(error.response);
  }
);

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export function destroy(url) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
