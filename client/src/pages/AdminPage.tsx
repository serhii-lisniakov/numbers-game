import React from "react";
import {Navigate, useLocation} from "react-router-dom";

type State = {
    admin: boolean;
}

export const AdminPage: React.FC = () => {
    const location = useLocation();
    const state = location.state as State;

    if (!state?.admin) return <Navigate to="/" />
    return (
        <div>
            AdminPage
        </div>
    )
}
