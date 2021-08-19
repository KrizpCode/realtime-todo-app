import { TodoListQuery } from '../../generated/graphql';
import { useRemoveTodoMutation, useUpdateTodoMutation } from '../../generated/graphql';
import './Todos.css';


interface Props {
    data: TodoListQuery;
}

const Todos: React.FC<Props> = ({ data }) => {
    const [removeTodo] = useRemoveTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();

    return (
        <ul className='todosList'>
            {data.todos.map((todo, i) => (
                <li key={i} className="todoList--item">
                    <input type="checkbox" name="completed" onChange={() => {
                        updateTodo({ variables: { id: todo.id } });
                            window.location.reload();}}
                        checked={todo.completed} />
                    <h2 className={todo.completed ? 'completed' : 'incomplete'}>{todo.title}</h2>
                    <button
                        className="todoList--remove-button"
                        onClick={(): void => {
                            removeTodo({ variables: { id: todo.id } });
                            window.location.reload();
                        }}>+</button>
                </li>
            ))}
        </ul>
    )
}

export default Todos
