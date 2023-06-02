import { notification } from 'antd';

type OpenNotificationType = {
  message: string;
  description: string;
  type: 'success' | 'error' | 'info' | 'warning' | 'open';
};

export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = ({
    message,
    description,
    type,
  }: OpenNotificationType) => {
    const method = api[type];

    method({
      message,
      description,
      className: 'notification-custom-class',
      placement: 'topRight',
      duration: 3,
    });
  };

  return { openNotification, contextHolder };
};
