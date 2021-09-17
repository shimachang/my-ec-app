import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListenAuthState } from "./reducks/users/operation";
import { getIsSignedIn } from "./reducks/users/selectors";

const Auth = ({ children }) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getIsSignedIn(selector);

    useEffect(() => {
        if (!isSignedIn) {
            dispatch(ListenAuthState());
        }
    }, []);

    if (!isSignedIn) {
        return <></>;
    } else {
        return children;
    }
};

export default Auth;
