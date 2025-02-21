import React from 'react';

import useUser from "@repo/ui/hooks/user/useUser";

import './Navbar.scss';


const Navbar: React.FC = () => {
    const { user } = useUser();
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <span className="logo">MeuApp</span>
            </div>
            <div className="navbar-right">
                <div className="profile">Bem-vindo, <strong>{user.name}</strong></div>
            </div>
        </nav>
    );
};

export default Navbar;