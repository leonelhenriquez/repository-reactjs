import { useHistory } from "react-router-dom";
import App from "./App";

const MainApp = () => {
  const history = useHistory();
  return <App history={history} />;
};

export default MainApp;
