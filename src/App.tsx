import { hot } from 'react-hot-loader/root'
import { useState, useEffect } from "react";
import NInput from '@/components/NInput'

function App() {
  const [name, setName] = useState('default');

  useEffect(() => {
    console.log('reload23')
  }, []);

  useEffect(() => {
    console.log('reload32')
  }, []);
  return (
    <div className="App">
      <h1>Hello CodeSandbox!!</h1>
      <h2>Start editing to see some magic happen!asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf</h2>
      <div>
        <p>{name}</p>
        <NInput name={name} onInput={(e) => setName(e.target.value)} />
      </div>
    </div>
  );
}

export default hot(App);
