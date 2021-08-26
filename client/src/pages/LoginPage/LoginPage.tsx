import React, { useRef, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

import { auth } from '../../config/firebase';
import Spinner from '../../components/Spinner/Spinner';

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
            setLoading(false)
        }
    };

    if(loading) {
        return (
            <>
                <Spinner loading={loading} />
            </>
        )
    }

    return (
        <section className="form-container">
            <h1 className="form-title">Log In</h1>
            <form className="form" onSubmit={login}>
                {errorMessage && <p className="error-text">{errorMessage}</p>}
                <input
                    className="form__input"
                    type="email"
                    ref={emailRef}
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                />
                <input
                    className="form__input"
                    type="password"
                    ref={passwordRef}
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                />
                <p className="text-align-right text--small"><Link to='/forgot-password'>Forgot password?</Link></p>
                <input className="form__submit-button margin-top-20px" type="submit" value="Sign In" disabled={loading} />
            </form>
            <p className="text--small margin-top-10px">Not a member? <Link to='/registration'>Create account</Link></p>
        </section>
    )
}
