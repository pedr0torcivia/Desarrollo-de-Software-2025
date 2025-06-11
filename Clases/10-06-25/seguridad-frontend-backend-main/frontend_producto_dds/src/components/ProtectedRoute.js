import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

const ProtectedRoute = ({ roles, children }) => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !keycloak.authenticated ||
      (roles && !roles.some((role) => keycloak.hasRealmRole(role)))
    ) {
      navigate("/login");
    }
  }, [keycloak, navigate, roles]);

  return children;
};

export default ProtectedRoute;
