import React from "react"
import {Route, Routes} from 'react-router-dom'
import {AdminPage} from "./pages/AdminPage";
import {GamePage} from "./pages/GamePage";
import {AdminAuthPage} from "./pages/AdminAuthPage";

export const useRoutes = () => {
    return (
        <Routes>
            <Route path='admin' element={<AdminAuthPage/>}/>
            <Route path='admin/board' element={<AdminPage/>}/>
            <Route path='board/:round' element={<GamePage/>}/>
            <Route path="*" element={<GamePage/>}/>
        </Routes>
    )
}
