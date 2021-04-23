import { useState } from "react";
import NInput from '@/components/NInput'

export default function App() {
  const [name, setName] = useState('default');
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div>
        <p>{name}</p>
        <NInput name={name} onInput={(e) => setName(e.target.value)} />
      </div>
    </div>
  );
}
