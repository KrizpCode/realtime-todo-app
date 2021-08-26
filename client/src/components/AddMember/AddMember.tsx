import React, { useState } from 'react';

import { useAddMemberMutation } from '../../generated/graphql';

import { TodoList } from '../../generated/graphql';
import { auth } from '../../config/firebase';

interface Props {
    id: TodoList["id"]
}

const emailValidationRegEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/


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
                console.log('nope Get stuck here')

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
