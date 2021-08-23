import { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { AuthContext } from '../../context/AuthProvider';
import { useTodoListQuery, useNewTodoSubscription, NewTodoSubscription, TodoListQuery } from '../../generated/graphql';
import AddTodo from '../../components/AddTodo/AddTodo';
import Todos from '../../components/Todos/Todos';

import './HomePage.css'

interface DataStorage {
    todos: {
        __typename?: "Todo" | undefined;
        id: string;
        title: string;
        completed: boolean;
    }[]
}

export const HomePage = () => {
    const [ errorMessage, setErrorMessage ] = useState<string>('');
    const [ dataStorage, setDataStorage ] = useState<DataStorage>();

    const currentUser = useContext(AuthContext);
    const history = useHistory();

    if (!currentUser) {
        history.push('/login')
    }

    const handleLogout = async (): Promise<void> => {
        setErrorMessage('');

        try {
            await auth.signOut();
            history.push('/login');
        } catch(error) {
            setErrorMessage(error)
        }
    }

    // const { data, error, loading  } = useTodoListQuery();
    // const subscriptionData = useNewTodoSubscription().data!.todos;
    const { data } = useNewTodoSubscription();

    // if (!data) {
    //     return null;
    // }

    // if (subscriptionData) {
    //     setDataStorage({...dataStorage, subscriptionData})
    // }

    // if(loading) return <div>Loading...</div>
    // if(error) return <div>{`Error: ${error.message}`}</div>
    // if(!data) return <div>No data found</div>

    return (
        <>
            <nav className="navbar">
                <div className="navbar__user-wrapper">
                    <Link to="/">
                        <i className="fab fa-black-tie navbar-icon"></i>
                    </Link>
                    {currentUser && <p className="user-text--small">Logged in as: {currentUser.email}</p>}
                </div>
                <div className="navbar__user-wrapper">
                    <Link to='/update-profile'><i className="fas fa-user-cog navbar__edit-profile"></i></Link>
                    <button className="signout-button" onClick={handleLogout}>Sign Out</button>
                </div>
            </nav>
            {errorMessage && <p>{errorMessage}</p>}
            <AddTodo />
            {data && <Todos todos={data.todos}/>}
        </>
    )
}
