import React, { useRef, useEffect } from "react";
import { mount as marketingMount } from "marketing/MarketingApp";
import { useHistory } from "react-router-dom";
const MarketingApp = () => {
  const history = useHistory();
  const ref = useRef(null);

  const onContainerNavigate = (location) => {
    const currentPath = history.location.pathname;
    console.log(
      "Container app received a navigation request from the marketing app",
      currentPath,
      location.pathname,
    );
    if (currentPath !== location.pathname) {
      history.push(location.pathname);
    }
  };
  useEffect(() => {
    const { onParentNavigate } = marketingMount(ref.current, {
      onNavigate: onContainerNavigate,
    });
    if (onParentNavigate) {
      history.listen(onParentNavigate);
    }
  }, []);
  return <div ref={ref}></div>;
};

export default MarketingApp;
