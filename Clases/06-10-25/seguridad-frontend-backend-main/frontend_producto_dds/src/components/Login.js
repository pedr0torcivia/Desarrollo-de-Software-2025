import { useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

const Login = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  if (keycloak.authenticated) {
    navigate("/");
  } else {
    keycloak.login();
  }

  return null;
};

export default Login;
