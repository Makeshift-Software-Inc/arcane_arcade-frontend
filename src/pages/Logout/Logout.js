import React, { useEffect } from "react";
import { useStore } from "../../store";

import Loading from "../../components/Loading/Loading";

const Logout = ({ history }) => {
  const authStore = useStore("auth");

  useEffect(() => {
    const logout = async () => {
      await authStore.logout();
      history.push("/");
    };

    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loading />;
};

export default Logout;
