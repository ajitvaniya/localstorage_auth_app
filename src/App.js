import React, { Suspense } from "react";
import { Detector } from "react-detect-offline";
import { BrowserRouter } from "react-router-dom";
import { Spin } from "antd";
import "./App.css";

const LazyAppRouterComponent = React.lazy(() => import("./utils/AppRouter"));
const LazyAppAuthRouterComponent = React.lazy(() =>
  import("./utils/AuthAppRouter")
);

function App() {
  const authUser = localStorage.getItem('authUser');
  return (
    <BrowserRouter>
     <Detector
        render={({ online }) => (
          <>
            {!online && (
              <span className="red">
                You're offline right now. <button class="button">RETRY</button>
              </span>
            )}

            <Suspense
              fallback={
                <div className="common__wrapper">
                  <Spin />
                </div>
              }
            >
              {authUser ? (
                <LazyAppAuthRouterComponent />
              ) : (
                <LazyAppRouterComponent />
              )}
            </Suspense>
          </>
        )}
      />
    </BrowserRouter>

  );
}

export default App;
