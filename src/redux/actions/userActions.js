import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";

import { userTypes } from "../types/userTypes";

export const actionSignPhoneAsync = (codigo) => {
  return (dispatch) => {
    const confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(codigo)
      .then((result) => {
        const user = result.user;
        console.log(user);
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
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          actionSignPhoneSync({ error: true, errorMessage: error.message })
        );
      });
  };
};
export const actionSignPhoneSync = (user) => {
  return {
    type: userTypes.USER_SIGNPHONE,
    payload: { ...user },
  };
};
export const actionAuthenticationSync = () => {
  return {
    type: userTypes.USER_AUTHENTICATION,
  };
};

export const actionUserCreateAsync = ({ password, email, name }) => {
  return async (dispatch) => {
    try {
      await updatePassword(auth.currentUser, password);

      await updateEmail(auth.currentUser, email);

      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      dispatch(actionUserCreatesync({ name, email, password, error: false }));
    } catch (error) {
      console.log(error);
      dispatch(
        actionUserCreatesync({ error: true, errorMessage: error.message })
      );
    }
  };
};
const actionUserCreatesync = (parcialUser) => {
  return {
    type: userTypes.USER_CREATE,
    payload: { ...parcialUser },
  };
};
