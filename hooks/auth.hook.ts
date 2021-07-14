import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setAuthStatus, setAuthData } from "../redux/slices/authSlice";
const authHook = () => {
  const authData = useSelector((state: any) => state.auth.authData);
  const authStatus = useSelector((state: any) => state.auth.status);
  console.log(authStatus, authData)
  const dispatch = useDispatch();
  const validateAuthToken = () => {
    axios("http://localhost:3000/api/auth/validateToken").then(
      ({ data }: any) => {
        if (data.succes) {
          dispatch(setAuthData({ authData: data.data }));
        }
      
        dispatch(setAuthStatus({ status: data.succes }));
      }
    );
  };
  const refreshAuthToken = (validateAuthToken: Function) => {
    axios("http://localhost:3000/api/auth/refreshToken").then(
      ({ data }: any) => {
        if (data.succes) {
          validateAuthToken();
        }
      }
    );
  };
  const logout = () => {
    axios("http://localhost:3000/api/auth/logout").then(({ data }) => {
      if (data.succes) {
        dispatch(setAuthData({authData: {}}));
        dispatch(setAuthStatus({ status: false }));
      }
    });
  };
  const auth = ({ visitorId, inputAuthCode, data }: any) => {
    axios("http://localhost:3000/api/auth/auth", {
      method: "POST",
      data: {
        [data.type]: data.value,
        code: inputAuthCode,
        visitorId: visitorId,
      },
    }).then(({ data }: any) => {
      dispatch(setAuthStatus({ status: data.succes }));
      dispatch(setAuthData({ authData: data.data }));
      // setAuthStatus(data.succes);
      // setAuthData(data.data);
    });
  };

  return {
    auth: ({ visitorId, inputAuthCode, data }: any) => {
      auth({ visitorId, inputAuthCode, data });
    },
    validateAuthToken: validateAuthToken,
    refreshAuthToken: () => {
      refreshAuthToken(validateAuthToken);
    },
    logout: logout,
    authData: authData,
    authStatus: authStatus,
  };
};
export default authHook;
