export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_USERNAME = "SET_USERNAME";

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
    const newResponse = await fetch(
      `https://sports-app-28cb3.firebaseio.com/users.json?auth=${respData.idToken}`
    );
    const newRespData = await newResponse.json();
    let username = null;
    for (key in newRespData) {
      if (newRespData[key].userId === respData.localId) {
        username = newRespData[key].username;
      }
    }

    dispatch(
      authenticate(
        respData.localId,
        respData.idToken,
        parseInt(respData.expiresIn) * 1000
      )
    );
    dispatch({
      type: SET_USERNAME,
      username: username,
    });
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

export const setUsername = (username) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://sports-app-28cb3.firebaseio.com/users.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          userId: userId,
        }),
      }
    );

    // console.log(response);

    if (!response.ok) {
      throw new Error("Something Went Wrong");
    }

    const respData = await response.json();
    console.log(respData);

    dispatch({
      type: SET_USERNAME,
      username: username,
    });
  };
};
