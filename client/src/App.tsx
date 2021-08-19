import { useTodoListQuery } from './generated/graphql';

import './App.css';
import Todos from './components/Todos/Todos';
import AddTodo from './components/AddTodo/AddTodo';

function App() {
  const { data, error, loading } = useTodoListQuery();

  if(loading) return <div>Loading...</div>
  if(error) return <div>{`Error: ${error.message}`}</div>
  if(!data) return <div>No data found</div>

  return (
    <div className="App">
      <h1>Add a new Todo</h1>
      <AddTodo />
      {data && <Todos data={data}/>}
    </div>
  );
}

export default App;
