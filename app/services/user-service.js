import { FetchWithPopover } from './common-service.js';
import { CONFIG } from '../constants/config';

const fetchWithPopover = new FetchWithPopover();

const API = {
  LOGIN: CONFIG.HOST + '/api/login'
};

export function login(param = {
  username: '',
  password: ''
}) {
  return fetchWithPopover.send({
    method: 'POST',
    url: API.LOGIN,
    param
  });
}
