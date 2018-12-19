import { notification } from 'antd';

const notifiy = (details) => {
  notification[details.type]({
    message: details.message,
    description: details.description,
  });
};

export default notifiy;