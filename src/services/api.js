import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/project/notice');
}

export async function queryActivities() {
  return request('/activities');
}

export async function queryRule(params) {
  return request(`/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/fake_chart_data');
}

export async function queryTags() {
  return request('/tags');
}

export async function queryBasicProfile() {
  return request('/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/notices');
}
