import { TodoListQuery } from '../../generated/graphql';
import { useRemoveTodoMutation, useUpdateTodoMutation } from '../../generated/graphql';
import './Todos.css';

interface Props {
    todos: TodoListQuery["todos"];
}

const Todos: React.FC<Props> = ({ todos }) => {
    const [removeTodo] = useRemoveTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();

    return (
        <ul className='todosList'>
            {todos.map((todo, i) => (
                <li key={i} className={`todoList--item ${todo.completed ? 'order-2' : 'order-1'}`}>
                    <input className="todoList--item-checkbox" type="checkbox" name="completed" onChange={() => {
                            updateTodo({ variables: { id: todo.id } });
                        }}
                        checked={todo.completed} />
                    <h2 className={`todoList--item-text ${todo.completed ? 'completed' : 'incomplete'}`}>{todo.title}</h2>
                    <button
                        className="todoList--remove-button"
                        onClick={(): void => {
                            removeTodo({ variables: { id: todo.id } }); 
                        }}>X</button>
                </li>
            ))}
        </ul>
    )
}

export default Todos
