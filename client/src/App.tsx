import React from 'react';
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom";

function App() {
    const routes = useRoutes();
    return (
        <Router children={routes} />
    );
}

export default App;
