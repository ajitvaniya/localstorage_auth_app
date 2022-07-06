import React, { Suspense } from "react";
import { Detector } from "react-detect-offline";
import { BrowserRouter } from "react-router-dom";
import { Spin } from "antd";
import "./App.css";
 
import AuthAppRouter from './utils/AppAuthRouter'
import AppRouter from './utils/AppRouter'


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
                <AuthAppRouter />
              ) : (
                <AppRouter />
               )} 
            </Suspense>
          </>
        )}
      />
    </BrowserRouter>

  );
}

export default App;
