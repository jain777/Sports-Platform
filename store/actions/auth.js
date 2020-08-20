export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId,
      token,
    });
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_zrtrFvNScrSB8pO-SN7GX7dvcqxNRH0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    // console.log(response);

    if (!response.ok) {
      const errRespData = await response.json();
      const errorId = errRespData.error.message;
      let message = "Something Went Wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "This Email Is Already in use!";
      }
      throw new Error(message);
    }

    const respData = await response.json();
    // console.log(respData);

    dispatch(
      authenticate(
        respData.localId,
        respData.idToken,
        parseInt(respData.expiresIn) * 1000
      )
    );
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_zrtrFvNScrSB8pO-SN7GX7dvcqxNRH0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    // console.log(response);

    if (!response.ok) {
      const errRespData = await response.json();
      const errorId = errRespData.error.message;
      let message = "Something Went Wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This Email Could Not Be Found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This Password is Incorrect!";
      }
      throw new Error(message);
    }

    const respData = await response.json();
    // console.log(respData);

    dispatch(
      authenticate(
        respData.localId,
        respData.idToken,
        parseInt(respData.expiresIn) * 1000
      )
    );
  };
};

export const logout = () => {
  clearLogoutTimer();
  return {
    type: LOGOUT,
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};
