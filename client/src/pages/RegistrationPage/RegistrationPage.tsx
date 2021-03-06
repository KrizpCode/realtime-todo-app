import React, { useRef, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

import { auth } from '../../config/firebase';
import Spinner from '../../components/Spinner/Spinner';

export const RegistrationPage = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const currentUser = useContext(AuthContext);
    const history = useHistory();

    if(currentUser) {
        history.push('/')
    }

    const createAccount = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(passwordRef.current!.value !== confirmPasswordRef.current!.value) {
            return setErrorMessage('Passwords do not match')
        }

        try {
            setErrorMessage('');
            setLoading(true);
            await auth.createUserWithEmailAndPassword(
                emailRef.current!.value,
                passwordRef.current!.value
            )
            history.push('/');
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            }
        }

        setLoading(false);
    };

    if(loading) {
        return (
            <>
                <Spinner loading={loading} />
            </>
        )
    }

    return (
        <>
            <section className="form-container">
                <h2 className="form-title">Sign Up</h2>
                <form className='form' onSubmit={createAccount}>
                    {errorMessage && <p className="error-text">{errorMessage}</p>}
                    <input className="form__input" placeholder="Email" type="email" ref={emailRef} name="email" id="email" required />
                    <input className="form__input" placeholder="Password" type="password" ref={passwordRef} name="password" id="password" required />
                    <input className="form__input" placeholder="Confirm Password" type="password" ref={confirmPasswordRef} name="confirm-password" id="confirm-password" required />
                    <input className="form__submit-button margin-top-20px" type="submit" value="Sign Up" disabled={loading} />
                </form>
                <p className="text--small margin-top-10px">Already have an account? <Link to='/login'>Login</Link></p>
            </section>
        </>
    )
}
