import React, { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";

import { useStore } from "../../store";

const Notifications = ({ push }) => {
  const { notifications } = useStore();
  const history = useHistory();

  useEffect(() => {
    const load = async () => {
      await notifications.load();
      notifications.notSeen().forEach((notification) => {
        toast(notification.message, {
          position: "top-right",
          autoClose: false,
          closeButton: true,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          onClick: () => {
            notification.markAsRead();
            history.push(notification.destination_path);
          },
        });
      });
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ToastContainer />;
};

export default observer(Notifications);
