import React, { useState, useContext } from 'react';

import { useAddTodoListMutation } from '../../generated/graphql';
import { AuthContext } from '../../context/AuthProvider';

const AddTodoList = () => {
    const [title, setTitle] = useState('');
    const currentUser = useContext(AuthContext);

    const [addTodoList] = useAddTodoListMutation();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (!title || !currentUser?.email) return
        
        addTodoList({
            variables: {
                email: currentUser.email,
                title: title
            }
        });
        setTitle('');
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTitle(e.target.value);
    }

    return (
        <>
        <form
            className="add-todo-form"
            onSubmit={ handleSubmit }>
            <input
                className="form__input add-todo-input"
                placeholder="Add To-Do List"
                type="text"
                name="title"
                id="inputTitle"
                onChange={ handleChange }
                value={title}
            />
            <input
                className={`add-form--submit-button ${title && 'active'}`}
                type="submit"
                value="+"
            />
        </form>
        </>
    )
}

export default AddTodoList;
