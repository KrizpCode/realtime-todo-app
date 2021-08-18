import React from 'react'
import './Todos.css';
import { TodosListQuery } from '../../generated/graphql';


interface Props {
    data: TodosListQuery;
}

const Todos: React.FC<Props> = ({ data }) => {

    return (
        <div className='TodosList'>
            {data.todos.map((todo, i) => (
                <h2 key={i} className={todo.completed ? 'completed' : 'incomplete'}>
                    {`ID: ${todo.id} Title: ${todo.title}`}
                </h2>)
            )}
        </div>
    )
}

export default Todos
