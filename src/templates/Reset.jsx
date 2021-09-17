import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { TextInput, PrimaryButton } from "../components/Uikit";
import { resetPassword } from "../reducks/users/operation";
import { push } from "connected-react-router";
const Reset = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")

    const inputEmail = useCallback(
        (event) => {
            setEmail(event.target.value);
        },
        [setEmail]
    );

    return (
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">パスワードのリセット</h2>
            <div className="module-spacer--medium" />
            <TextInput
                fullWidth={true}
                label={"Reset Password"}
                multiline={false}
                reqeired={true}
                rows={1}
                value={email}
                type={"email"}
                onChange={inputEmail}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton label={"サインイン"} onClick={() => dispatch(resetPassword(email))} />
                <div className="module-spacer--medium" />
                <p onClick={() => dispatch(push("/signin"))}>ログイン画面はこちら</p>
            </div>
        </div>
    );
};

export default Reset;
