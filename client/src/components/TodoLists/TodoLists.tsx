import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AuthContext } from '../../context/AuthProvider';
import { TodoListByEmailQuery } from '../../generated/graphql';
import { useRemoveTodoListMutation } from '../../generated/graphql';
import './TodoLists.css';

interface Props {
    todoLists: TodoListByEmailQuery["todoListsByEmail"];
}

const TodoLists: React.FC<Props> = ({ todoLists }) => {
    const [removeTodo] = useRemoveTodoListMutation();

    const currentUser = useContext(AuthContext);

    const history = useHistory();

    if (!currentUser) {
        history.push('/login')
    }

    if(!todoLists) {
        return null;
    }

    return (
        <ul className='todosList'>
            <h1 className="todo-lists-title">My To-Do Lists</h1>
            {todoLists.map((todoList, i) => {
                if(todoList?.admin.email === currentUser?.email) {
                    return (
                        <li key={i} className={`todoList--item`}>
                            <Link className="todoList--link-item" key={i} to={`/todo/${todoList!.id}`}>
                                <h2 className={`todoList--item-text`}>{`${todoList!.title}`}</h2>
                            </Link>

                            <button
                                className="todoList--remove-button"
                                onClick={(): void => {
                                    removeTodo({ variables: { id: todoList!.id } })
                                }}>X</button>
                        </li>
                    )
                }
            })}
            <div className="todo-lists-title-container">
                <h1 className="todo-lists-title">Lists Shared With Me</h1>
                <button className="refreshButton" onClick={() => window.location.reload()}>Refresh</button>
            </div>
            {todoLists.map((todoList, i) => {
                if(todoList?.admin.email !== currentUser?.email && todoList?.members.find(member => member.email === currentUser?.email)) {
                    return (
                        <li key={i} className={`todoList--item`}>
                            <Link className="todoList--link-item" key={i} to={`/todo/${todoList!.id}`}>
                                <h2 className={`todoList--link-item`}>{`${todoList!.title}`}</h2>
                            </Link>

                            <button
                                className="todoList--remove-button"
                                onClick={(): void => {
                                    removeTodo({ variables: { id: todoList!.id } })
                                }}>X</button>
                        </li>
                    )
                }
            })}
        </ul>
    )
}

export default TodoLists
