import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import axios from "axios";
import { setUser } from "../../redux/features/auth/authSlice";
import { API } from "../../constant";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const getUser = useCallback(async () => {
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        `${API}/user/getUser`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(hideLoading());
      if (data.success) {
        dispatch(setUser(data.data));
      } else {
        localStorage.clear();
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.log(error);
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (!user && token) {
      getUser();
    }
  }, [user, token, getUser]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    // Optionally, you can return a loading indicator here while user data is being fetched
    return <div>Loading...</div>;
  }

  return children;
};

export default PrivateRoute;
