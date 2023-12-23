import { get } from "@/utils/request";

export function saveCodeAndUuid(params) {
  return get(`/system/auth/saveCodeAndUuid`, params);
}
export function getUserInfoByUuid(params) {
  return get(`/system/auth/getUserInfoByUuid`, params);
}
