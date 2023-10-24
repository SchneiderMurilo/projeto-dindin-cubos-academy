import Principal from './pages/Principal/Principal';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro'

import { Routes, Route, Outlet, Navigate } from 'react-router-dom'


function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = localStorage.getItem('token')

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function ProtectedRoutesLogin({ redirectTo }) {
    const isAuthenticated = localStorage.getItem('token')

    return !isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {
    return (
        <Routes>
            <Route element={<ProtectedRoutesLogin redirectTo='/' />}>
                <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<ProtectedRoutesLogin redirectTo='/' />}>
                <Route path="/cadastro" element={<Cadastro />} />
            </Route>
            <Route element={<ProtectedRoutes redirectTo='/login' />}>
                <Route path="/" element={<Principal />} />
            </Route>
        </Routes>

    );
}

export default MainRoutes;