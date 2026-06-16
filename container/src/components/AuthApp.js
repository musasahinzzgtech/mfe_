import React, { useRef, useEffect } from "react";
import { mount as authMount } from "auth/AuthApp";
import { useHistory } from "react-router-dom";
const AuthApp = ({ onSignIn }) => {
  const history = useHistory();
  const ref = useRef(null);

  const onContainerNavigate = (location) => {
    const currentPath = history.location.pathname;
    console.log(
      "Container app received a navigation request from the auth app",
      currentPath,
      location.pathname,
    );
    if (currentPath !== location.pathname) {
      history.push(location.pathname);
    }
  };
  useEffect(() => {
    const { onParentNavigate } = authMount(ref.current, {
      onNavigate: onContainerNavigate,
      initialPath: history.location.pathname,
      onSignIn,
    });
    if (onParentNavigate) {
      history.listen(onParentNavigate);
    }
  }, []);
  return <div ref={ref}></div>;
};

export default AuthApp;
