import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CodeVerificaction from "../components/CodeVerificaction";
import CreateAccount from "../components/CreateAccount";
import Home from "../components/Home";
import SignIn from "../components/SignIn";
import { auth } from "../Firebase/firebaseConfig";
import { actionSignPhoneSync } from "../redux/actions/userActions";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [check, setCheck] = useState(true);
  const userStore = useSelector((store) => store.userStore);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid ) {
        setIsLoggedIn(true);
      
      } else {
        setIsLoggedIn(false);
      }
      setCheck(false);
      if (Object.entries(userStore).length === 0) {
        const { displayName, email, phoneNumber, accessToken, photoURL, uid } =
          user.auth.currentUser;
        dispatch(
          actionSignPhoneSync({
            name: displayName,
            email,
            accessToken,
            phoneNumber,
            avatar: photoURL,
            uid,
            error: false,
          })
        );
      }
    });
  }, [setIsLoggedIn, setCheck]);
  if (check) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRouter isAuthentication={isLoggedIn} />}>
          <Route path="/" element={<SignIn />} />
          <Route path="/verification" element={<CodeVerificaction />} />
        </Route>
        <Route element={<PrivateRouter isAuthentication={isLoggedIn} />}>
          <Route path="/createaccount/:uid" element={<CreateAccount/>} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
