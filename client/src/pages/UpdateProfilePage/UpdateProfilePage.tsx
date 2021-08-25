import React, { useRef, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { AuthContext } from '../../context/AuthProvider';

import './UpdateProfilePage.css'

export const UpdateProfilePage = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const currentUser = useContext(AuthContext);
    const history = useHistory();

    if (!currentUser) {
        history.push('/login')
    }

    let email: string = '';
    if (currentUser && currentUser.email !== null) {
        email = currentUser.email;
    }

    const updateAccount = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);

        if(passwordRef.current!.value !== confirmPasswordRef.current!.value) {
            setLoading(false)
            return setErrorMessage('Passwords do not match')
        }

        const promises = [];

        if (emailRef.current!.value !== currentUser!.email) {
            promises.push(currentUser!.updateEmail(emailRef.current!.value));
        };

        if (passwordRef.current!.value) {
            promises.push(currentUser!.updatePassword(passwordRef.current!.value));
        };

        Promise.all(promises).then(() => {
            history.push('/');
        }).catch(() => {
            setErrorMessage('Failed to update account, please try again.')
            setLoading(false)
        }).finally(() => {
            setLoading(false);
        })
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
            <section className='update-container'>
                <h2 className="update-title">Update Profile</h2>
                <form className='update-form' onSubmit={updateAccount}>
                    {errorMessage && <p className="error-text">{errorMessage}</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        className='update-form__input'
                        ref={emailRef}
                        name="email"
                        id="email"
                        defaultValue={email}
                        required 
                    />
                    <input className='update-form__input' placeholder="New Password" type="password" ref={passwordRef} name="password" id="password" required />
                    <input className='update-form__input' placeholder="Confirm Password" type="password" ref={confirmPasswordRef} name="confirm-password" id="confirm-password" required />
                    <Link className="update-text-align-right" to='/'>Cancel</Link>
                    <input className='update-form__submit-button' type="submit" value="Update Profile" disabled={loading} />
                </form>
            </section>
        </>
    )
}
