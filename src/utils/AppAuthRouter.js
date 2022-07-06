import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthRouterConfig } from "../Config/AuthRouterConfig";

const AppAuthRouter = () => {
  return (
    <Routes>
      {AuthRouterConfig.map((item, index) => {
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
