import React from "react";
import { Routes, Route } from "react-router-dom";
import { RouterConfig } from "../Config/RouterConfig";

const AppAuthRouter = () => {
  return (
    <Routes>
      {RouterConfig.map((item, index) => {
        var exact = true;
        if (item.errorpage === true) {
          exact = false;
        }
        return (
          <Route
            key={index}
            exact={exact}
            path={item.path}
            component={item.component}
          />
        );
      })}
    </Routes>
  );
};

export default AppAuthRouter;
