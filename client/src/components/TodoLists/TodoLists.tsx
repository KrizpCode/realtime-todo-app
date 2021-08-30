import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthProvider';
import { TodoListByEmailQuery } from '../../generated/graphql';
import { useRemoveTodoListMutation } from '../../generated/graphql';

interface Props {
    todoLists: TodoListByEmailQuery["todoListsByEmail"];
}

const TodoLists: React.FC<Props> = ({ todoLists }) => {
    const [removeTodo] = useRemoveTodoListMutation();

    const currentUser = useContext(AuthContext);

    if(!todoLists) {
        return null;
    }

    const myLists = () => {
        const myListArray = todoLists.filter(todoList => todoList?.admin.email === currentUser?.email);
        return myListArray;
    }

    const listsSharedWithMe = () => {
        const mySharedListArray = todoLists.filter(todoList => todoList?.admin.email !== currentUser?.email && todoList?.members.find(member => member.email === currentUser?.email));
        return mySharedListArray;
    }

    const myListArray = myLists();
    const mySharedListArray = listsSharedWithMe();

    return (
        <ul className='todos-list b-none'>
            <h1 className="text-color-gray">My To-Do Lists</h1>
            {myListArray.length > 0
                ? myListArray.map((todoList, i) => (
                    <li key={i} className={`todos-list__item pl-15px`}>
                            <Link className="todos-list__item-text" key={i} to={`/todo/${todoList!.id}`}>
                                <h2 className={`todos-list__item-text`}>{`${todoList!.title}`}</h2>
                            </Link>

                            <button
                                className="remove-button width-10"
                                onClick={(): void => {
                                    removeTodo({ variables: { id: todoList!.id } })
                                }}>X</button>
                        </li>
                    ))
                : <p className="text-align-center">You have no created lists yet</p>}

            <h1 className="text-color-gray margin-top-40px">Lists Shared With Me</h1>
            {mySharedListArray.length > 0
                ? mySharedListArray.map((todoList, i) => (
                    <li key={i} className={`todos-list__item pl-15px`}>
                            <Link className="todos-list__item-text" key={i} to={`/todo/${todoList!.id}`}>
                                <h2 className={`todos-list__item-text`}>{`${todoList!.title}`}</h2>
                            </Link>
                        </li>
                    ))
                : <p className="text-align-center">There is currently no shared lists with you</p>}
        </ul>
    )
}

export default TodoLists
