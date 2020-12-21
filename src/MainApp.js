import App from "./App";
import { useHistory } from "react-router-dom";

const MainApp = () => {
  const history = useHistory();
  return <App history={history} />;
};

export default MainApp;
