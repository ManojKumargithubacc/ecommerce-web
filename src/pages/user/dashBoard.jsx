import React from "react";
import { useAuth } from "../../context/auth";
import Layout from "../../components/layout/layout";

function DashBoard() {
  const [auth, setAuth] = useAuth();

  return (
    <Layout title={"User Dashboard"}>
      <h1>{`Hi!! ${auth?.token && auth?.user?.name}`}</h1>
    </Layout>
  );
}

export default DashBoard;
