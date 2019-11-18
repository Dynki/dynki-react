import { notification } from 'antd';

const notifiy = (details) => {
  const duration = details.duration ? details.duration : 4.5;

  notification[details.type]({
    message: details.message,
    description: details.description,
    duration
  });
};

export default notifiy;