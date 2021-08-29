import React, { useState } from 'react';

import { useAddMemberMutation } from '../../generated/graphql';

import { TodoList } from '../../generated/graphql';
import { auth } from '../../config/firebase';

interface Props {
    id: TodoList["id"]
}

const emailValidationRegEx = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


const AddMember: React.FC<Props> = ({ id }) => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [message, setMessage] = useState('')

    const [addMember] = useAddMemberMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setMessage('')
        setErrorMessage('');

        try {
            if (!email || !emailValidationRegEx.test(email)) {
                throw new Error('Please provide an valid email')
            }

            const providers = await auth.fetchSignInMethodsForEmail(email)

            if (providers.length === 0) {
                setErrorMessage('User does not exist');
                return;
            } else {
                addMember({
                    variables: {
                        id,
                        email
                    }
                });

                setMessage(`Successfully added ${email} to list`)
            }
        } catch (error) {
            setErrorMessage(error.message);
        }

        setEmail('');
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    }

    return (
        <>
        {errorMessage && <p className="error-text">{errorMessage}</p>}
        {message && <p className="success-text">{message}</p>}
        <form
            className="add-form"
            onSubmit={ handleSubmit }>
            <input
                className="form__input"
                placeholder="Add Email"
                type="text"
                name="title"
                id="inputTitle"
                onChange={ handleChange }
                value={email}
            />
            <input
                className={`add-form--submit-button ${email && 'active'}`}
                type="submit"
                value="+"
            />
        </form>
        </>
    )
}

export default AddMember;
