import { TodoList, useRemoveTodoMutation, useUpdateTodoMutation } from '../../generated/graphql';

interface Props {
    todos: TodoList["todos"]
    currentUser: string | null | undefined
}

const Todos: React.FC<Props> = ({ todos, currentUser }) => {
    const [removeTodo] = useRemoveTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();

    if(!todos) {
        return null
    }

    return (
        <>
        <ul className='todos-list'>
            {todos.map((todo, i) => (
                <li key={i} className={`todos-list__item ${todo.completed ? 'order-2' : 'order-1'}`}>
                    <input className="todos-list__item-checkbox" checked={todo.completed} type="checkbox" name="completed" onChange={() => {
                            updateTodo({ variables: {
                                id: todo.id,
                                listId: todo.listId
                            }})}} />
                    <p className={`todos-list__item-text ${todo.completed ? 'completed' : 'incomplete'}`}>{todo.title}</p>
                    <button
                        className="remove-button width-10"
                        onClick={(): void => {
                            removeTodo({ variables: { id: todo.id, listId: todo.listId } }); 
                        }}>X</button>
                </li>
            ))}
        </ul>
        <div className="text-color-gray">
            <p>{todos.length > 0 
                ? `${todos.filter(todo => todo.completed).length} out of ${todos.length} completed`
                : 'Please add what needs to be done above'}</p>
        </div>
        </>
    )
}

export default Todos
