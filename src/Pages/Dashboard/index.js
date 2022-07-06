import { Button, PageHeader } from "antd";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
     
export function Dashboard() {
 
  let history = useHistory();

  // useEffect hook for api call to set data
  useEffect(() => {}, []);

  const logoutCall = () => {
     history.push("/");
  };

  return (
    <div className="dashboard">
      <PageHeader
        title={"Dashboard"}
        extra={[
           
          <Button key="2" title="Logout" onClick={logoutCall}>
            Logout
          </Button>,
        ]}
      > 
        <h2>Dashboard</h2>
      </PageHeader>
    </div>
  );
}
