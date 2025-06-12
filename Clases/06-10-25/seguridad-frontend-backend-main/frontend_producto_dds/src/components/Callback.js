import React, { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [keycloak, navigate]);

  return <div>Redirecting...</div>;
};

export default Callback;
