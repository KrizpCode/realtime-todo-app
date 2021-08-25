import React, { useState } from 'react';

import './AddMember.css'
import { useAddMemberMutation } from '../../generated/graphql';

import { TodoList } from '../../generated/graphql';
import { auth } from '../../config/firebase';

interface Props {
    id: TodoList["id"]
}


const AddMember: React.FC<Props> = ({ id }) => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [message, setMessage] = useState('')

    const [addMember] = useAddMemberMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setMessage('')
        setErrorMessage('');

        if (!email) return

        try {
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
        <h1 className="update-title">Members</h1>
        {errorMessage && <p>{errorMessage}</p>}
        {message && <p>{message}</p>}
        <form
            className="add-member-form"
            onSubmit={ handleSubmit }>
            <input
                className="add-member-form--input-title"
                placeholder="Add Members Email"
                type="text"
                name="title"
                id="inputTitle"
                onChange={ handleChange }
                value={email}
            />
            <input
                className={`add-member-form--submit-button ${email && 'active'}`}
                type="submit"
                value="+"
            />
        </form>
        </>
    )
}

export default AddMember;
