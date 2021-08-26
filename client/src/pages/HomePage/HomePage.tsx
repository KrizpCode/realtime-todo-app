import { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { useNewTodoListsSubscription } from '../../generated/graphql';

import AddTodoList from '../../components/AddTodoList/AddTodoList';
import TodoLists from '../../components/TodoLists/TodoLists';

import Spinner from '../../components/Spinner/Spinner';

export const HomePage = () => {
    const currentUser = useContext(AuthContext);
    const history = useHistory();

    if (!currentUser) {
        history.push('/login')
    }

    const { data, loading } = useNewTodoListsSubscription({
        variables: {
            email: currentUser?.email ? currentUser.email : '',
        }
    });

    if(loading) {
        return (
            <>
                <Spinner loading={loading} />
            </>
        )
    }

    return (
        <>
            <AddTodoList />
            {data && <TodoLists todoLists={data?.todoLists}/>}
        </>
    )
}
