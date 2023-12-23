import axios from "axios";
import { showToast } from "vant";

/**
 * 错误提示
 * @param {*} msgStr
 */
const showErrMsg = (msgStr) => {
  showToast({
    message: msgStr || "网络错误",
    icon: "warning-o",
  });
};

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10 * 1000, // 请求超时时间
});

/**
 * 错误处理
 * @param {*} error
 * @param {*} report
 */
const errorHandler = (error, report = true) => {
  const res = error?.response?.data;
  const msgStr = res?.msg || res?.errmsg || res?.message;
  const errData = {
    msg: msgStr,
  };
  const reqData = error.config.data;
  reqData && Object.assign(errData, { data: reqData });
  showErrMsg(msgStr);
  throw error;
};

// request 拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    errorHandler(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data ?? {};
    if (res.code) {
      if ([0, 200].includes(res.code)) {
        return res.data;
      } else {
        let msgStr = res.msg || "抱歉，系统错误";
        showErrMsg(msgStr);
      }
    } else {
      // 响应体为数据，无code
      return res;
    }
  },
  (error) => {
    errorHandler(error);
  }
);

/**
 * ------------------------------------------------------------------------------
 * 请求方式
 */

const get = (url, params, options) => {
  return service.get(url, {
    params,
    ...options,
  });
};

const post = (url, body, headers = {}) => {
  return service.post(url, body, {
    headers,
  });
};

const remove = (url, body) => {
  return service.delete(url, {
    data: body,
  });
};

const put = (url, body, headers = {}) => {
  return service.put(url, body, {
    headers,
  });
};

export default service
export { get, post, remove, put }
