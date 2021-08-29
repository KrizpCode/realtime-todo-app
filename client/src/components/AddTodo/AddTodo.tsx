import React, { useState } from 'react';

import { useAddTodoMutation } from '../../generated/graphql';

import { TodoList } from '../../generated/graphql';

interface Props {
    id: TodoList["id"],
}

const AddTodo: React.FC<Props> = ({ id }) => {
    const [title, setTitle] = useState('');

    const [addTodo] = useAddTodoMutation();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (!title) return
        
        addTodo({
            variables: {
                listId: id,
                title
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
                placeholder="Add Todo"
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

export default AddTodo
