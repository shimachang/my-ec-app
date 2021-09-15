import React from "react";
import { useSelector } from "react-redux";
import { getUserId } from "../reducks/users/selectors";

const Test = () => {
    const selector = useSelector(state => state);
    const uid = getUserId(selector)

    return (
        <div>
            <h2>test</h2>
            <p>{uid}</p>
        </div>
    );
};

export default Test;
