import React, { useEffect, useContext } from "react";
import Router from "./components/Router";
import { useState } from "react";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader";
import ThemeContext from "context/TemeContext";

import "react-toastify/dist/ReactToastify.css";
function App() {
  const context = useContext(ThemeContext);
  const auth = getAuth(app);
  // auth 체크전 loader를 띄워주는 용도
  const [init, setInit] = useState<boolean>(false);
  //auth값 업데이트시에 실시간으로 authenticated 값 변경
  //onAuthStateChanged => 현재 로그인한 사용자가져오기
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser,
  );
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);
  return (
    <div className={context.theme}>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </div>
  );
}

export default App;
