import React from 'react';
import ReactDOM from 'react-dom';
import NotificationSystem from 'react-notification-system';
import Http from '../utils/http';

class Notify {
  constructor(root) {
    let _root = root;
    if (!_root) {
      const rootExist = document.getElementsByClassName('notifucation-container')[0];
      _root = rootExist || document.createElement('div');
      _root.className = 'notifucation-container';
      document.body.appendChild(_root);
    }
    this.notifyInstance = ReactDOM.render(<NotificationSystem allowHTML />, _root);
  }

  error(title, err) {
    let errorMessage = '';
    if (typeof error === 'string') {
      errorMessage = err;
    } else if (err instanceof Error) {
      errorMessage = err.name + ': ' + err.message;
    }
    this.notifyInstance.addNotification({
      title,
      errorMessage,
      level: 'error',
      position: 'tr'
    });
  }

  success(title, message) {
    this.notifyInstance.addNotification({
      title,
      message,
      level: 'success',
      position: 'tr'
    });
  }

  warning(title, message) {
    this.notifyInstance.addNotification({
      title,
      message,
      level: 'warning',
      position: 'tr'
    });
  }

  info(title, message) {
    this.notifyInstance.addNotification({
      title,
      message,
      level: 'info',
      position: 'tr'
    });
  }

  confirm(message, confirmCallback) {
    this.notifyInstance.addNotification({
      title: '',
      message: message,
      level: 'warning',
      position: 'tr',
      autoDismiss: 0,
      action: {
        label: '确定',
        callback: () => {
          confirmCallback();
        }
      }
    });
  }
}

class FetchWithPopover {
  constructor() {
    this.notifyInstance = new Notify();
  }

  send(config = {
    method: 'Get',
    url: '',
    params: {},
    cookie: false
  }) {
    let requestDefer;
    switch (config.method.toUpperCase()) {
    case 'GET':
      requestDefer = Http.get(config.url);
      break;
    case 'POST':
      requestDefer = Http.post(config.url, config.params);
      break;
    case 'DELETE':
      requestDefer = Http.delete(config.url);
      break;
    default:
    }
    return requestDefer
      .then((response) => {
        let code = parseInt(response.code, 10);
        if (code === 0) {
          return response;
        } else if (code === 4) {
          window.location.href = '/';
        } else {
          this.notifyInstance.error('请求失败', response.message);
        }
        return null;
      })
      .catch((error) => {
        this.notifyInstance.error('内部错误', error);
      });
  }
}

export {
  Notify,
  FetchWithPopover
};
