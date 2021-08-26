// import { TodoList, useUpdateTodoMutation } from '../../generated/graphql';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { TodoList, useRemoveMemberMutation } from '../../generated/graphql'
// import './Todos.css';

interface Props {
    members: TodoList["members"]
    id: TodoList["id"]
    admin: TodoList["admin"]
}

const Members: React.FC<Props> = ({ members, id, admin }) => {
    const [removeTodo] = useRemoveMemberMutation();
    const currentUser = useContext(AuthContext);

    if(!members) {
        return null
    }

    return (
        <ul className='members-list'>
            {members.map((member, i) => (
                <li key={i} className="members-list__item">
                    <h4 className="members-list__item-text">{member.email}</h4>
                    {admin.email === currentUser?.email
                        && admin.email !== member.email ?
                            <button
                                className="remove-button"
                                onClick={(): void => {
                                    removeTodo({
                                        variables: {
                                            email: member.email,
                                            id
                                        }
                                    }); 
                                }}>X</button>
                        : ''}
                </li>
            ))}
        </ul>
    )
}

export default Members
