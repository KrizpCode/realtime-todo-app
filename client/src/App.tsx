import React from 'react';
import './App.css';
import { useTodosListQuery } from './generated/graphql';
import Todos from './components/Todos/Todos';

function App() {
  const { data, error, loading } = useTodosListQuery();

  if(loading) return <div>Loading...</div>

  if(error || !data) {
    console.error(error);
    return <div>Error</div>
  }

  return (
    <div className="App">
        {data && <Todos data={data}/>}
    </div>
  );
}

export default App;
