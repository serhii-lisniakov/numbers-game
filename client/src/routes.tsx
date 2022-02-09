import React from "react"
import {Route, Routes} from 'react-router-dom'
import {AdminPage} from "./pages/AdminPage";
import {GamePage} from "./pages/GamePage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = () => {
    return (
        <Routes>
            <Route path='auth' element={<AuthPage/>}/>
            <Route path='admin' element={<AdminPage/>}/>
            <Route path='board/:round' element={<GamePage/>}/>
            <Route path="*" element={<GamePage/>}/>
        </Routes>
    )
}
