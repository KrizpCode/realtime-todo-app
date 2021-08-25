import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

import { auth } from '../../config/firebase';
import './ForgotPasswordPage.css';

export const ForgotPasswordPage = () => {
    const emailRef = useRef<HTMLInputElement>(null);

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setMessage('');
            setErrorMessage('');
            setLoading(true);
            await auth.sendPasswordResetEmail(emailRef.current!.value)
            setMessage('An email with instructions to reset your password has been sent.')
        } catch (error) {
            setErrorMessage(error.message);
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
            <section className='forgot-container'>
                <h2 className="forgot-title">Password Reset</h2>
                <form className='forgot-form' onSubmit={login}>
                    {errorMessage && <p className="error-text">{errorMessage}</p>}
                    {message && <p className="success-text">{message}</p>}
                    <input className='forgot-form__input' placeholder="Email" type="email" ref={emailRef} name="email" id="email" required />
                    <input className='forgot-form__submit-button margin-top-30px' type="submit" value="Reset Password" disabled={loading} />
                </form>
                <p className="text--small">Already have an account? <Link to='/login'>Login</Link></p>
            </section>
        </>
    )
}
