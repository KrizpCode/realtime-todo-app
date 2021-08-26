import { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import AddTodo from '../../components/AddTodo/AddTodo';
import Todos from '../../components/Todos/Todos';
import { useParams } from 'react-router-dom';
import { useTodosByListIdSubscription  } from '../../generated/graphql';

import Spinner from '../../components/Spinner/Spinner';
import AddMember from '../../components/AddMember/AddMember';
import Members from '../../components/Members/Members';

export const TodoPage = () => {
    const {id}: { id: string } = useParams();

    const currentUser = useContext(AuthContext);
    const history = useHistory();

    if (!currentUser) {
        history.push('/login')
    }

    const { data, loading } = useTodosByListIdSubscription({
        variables: {
            listId: id,
        }
    });

    if(loading) {
        return (
            <>
                <Spinner loading={loading} />
            </>
        )
    }

    if(!data || !data.todosByListId.members.find(member => member.email === currentUser?.email)) {
        return (
            <>
                <Link to="/">- Go back -</Link>
                <h2>Oops, something went wrong</h2>
                <p>Either no data was found or unauthorized access</p>
            </>
        )
    }

    return (
        <>
            <h1 className="margin-bottom-10px text-color-gray">{data.todosByListId.title}</h1>
            {data.todosByListId.admin.email === currentUser?.email && <AddMember id={id} />}
            <h2 className="margin-top-10px text-color-gray">Members</h2>
            {data && <Members members={data.todosByListId.members} id={id} admin={data.todosByListId.admin} />}
            <AddTodo id={id} />
            {data && <Todos todos={data.todosByListId.todos} currentUser={currentUser?.email}/>}
        </>
    )
}
