import React, { useRef, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

import { auth } from '../../config/firebase';
import './LoginPage.css';

export const LoginPage = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const currentUser = useContext(AuthContext);
    const history = useHistory();

    if(currentUser) {
        history.push('/')
    }

    const login = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            setErrorMessage('');
            setLoading(true);
            await auth.signInWithEmailAndPassword(
                emailRef.current!.value,
                passwordRef.current!.value
            )
            history.push('/');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <section className="login-container">
            <h1 className="login-title">Log In</h1>
            <form className="form" onSubmit={login}>
                {errorMessage && <p className="error-text">{errorMessage}</p>}
                {/* <label htmlFor="email">Email:</label> */}
                <input
                    className="form__input"
                    type="email"
                    ref={emailRef}
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                />
                {/* <label htmlFor="password">Password:</label> */}
                <input
                    className="form__input"
                    type="password"
                    ref={passwordRef}
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                />
                <p className="text-align-right"><Link to='/forgot-password'>Forgot password?</Link></p>
                <input className="form__submit-button" type="submit" value="Sign In" disabled={loading} />
            </form>
            <p className="text--small">Not a member? <Link to='/registration'>Create account</Link></p>
        </section>
    )
}
