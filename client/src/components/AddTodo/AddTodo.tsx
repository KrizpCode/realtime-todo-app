import { useState } from 'react';

import { useAddTodoMutation } from '../../generated/graphql';

const AddTodo = () => {
    const [title, setTitle] = useState('');

    const [addTodo] = useAddTodoMutation();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        addTodo({ variables: { title: title } });
        setTitle('');
        window.location.reload();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTitle(e.target.value);
    }

    return (
        <form
            className="add-todo-form"
            onSubmit={ handleSubmit }>
            <input
                className="add-todo-form--input-title"
                type="text"
                name="title"
                id="inputTitle"
                onChange={ handleChange }
                value={title}
            />
            <input
                className="add-todo-form--submit-button"
                type="submit"
                value="Add Todo"
            />
        </form>
    )
}

export default AddTodo
