import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../config/firebase";
import { AuthContext } from "../../context/AuthProvider";

const NavBar = () => {
    const [ errorMessage, setErrorMessage ] = useState<string>('');

    const currentUser = useContext(AuthContext);

    const history = useHistory();

    if (!currentUser) {
        history.push('/login')
    }

    const handleLogout = async (): Promise<void> => {
        setErrorMessage('');

        try {
            await auth.signOut();
            history.push('/login');
        } catch(error) {
            setErrorMessage(error)
        }
    }

    const handleClick = () => {
        history.push('/login');
    }

    return (
        <nav className="navbar">
            <div className="navbar__user-wrapper">
                <Link to="/">
                    <i className="fab fa-black-tie navbar-icon"></i>
                </Link>
                {currentUser && <p className="user-text--small">Logged in as: <strong>{currentUser.email}</strong></p>}
            </div>
            <div className="navbar__user-wrapper">
                {currentUser && <Link to='/update-profile'><i className="fas fa-user-cog navbar__edit-profile"></i></Link>}
                {currentUser 
                    ? <button className="signout-button" onClick={handleLogout}>Sign Out</button>
                    : <button className="signout-button" onClick={handleClick}>Log In</button>}
            </div>
        </nav>
    )
}

export default NavBar




