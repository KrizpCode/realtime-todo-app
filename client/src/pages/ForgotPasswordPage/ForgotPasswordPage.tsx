import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

import { auth } from '../../config/firebase';

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
            <section className='form-container'>
                <h2 className="form-title">Password Reset</h2>
                <form className='form' onSubmit={login}>
                    {errorMessage && <p className="error-text">{errorMessage}</p>}
                    {message && <p className="success-text">{message}</p>}
                    <input className='form__input' placeholder="Email" type="email" ref={emailRef} name="email" id="email" required />
                    <input className='form__submit-button margin-top-20px' type="submit" value="Reset Password" disabled={loading} />
                </form>
                <p className="text--small margin-top-10px">Already have an account? <Link to='/login'>Login</Link></p>
            </section>
        </>
    )
}
