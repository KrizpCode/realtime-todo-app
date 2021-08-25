import React, { useState } from 'react';

import './AddTodo.css'
import { useAddTodoMutation } from '../../generated/graphql';

import { TodoList } from '../../generated/graphql';
import { auth } from '../../config/firebase';

interface Props {
    id: TodoList["id"],
    listName: TodoList["title"]
}

const AddTodo: React.FC<Props> = ({ id, listName }) => {
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
            <h1 className="update-title">{listName}</h1>
        <form
            className="add-todo-form"
            onSubmit={ handleSubmit }>
            <input
                className="add-todo-form--input-title"
                placeholder="Add Todo"
                type="text"
                name="title"
                id="inputTitle"
                onChange={ handleChange }
                value={title}
            />
            <input
                className={`add-todo-form--submit-button ${title && 'active'}`}
                type="submit"
                value="+"
            />
        </form>
        </>
    )
}

export default AddTodo
