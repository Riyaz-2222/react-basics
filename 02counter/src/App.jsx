import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let [counter, setCounter] = useState(0);

  // let counter = 0;
  const addValue = () => {
    if (counter <21){counter++;}
    else {
    alert("Counter value cannot be greater than 20");
    }
    setCounter(counter);
  }

  const romoveValue = () => {
    if (counter > 0)
    {
    counter--;}
    else {
      alert("Counter value cannot be less than 0");
    }
    setCounter(counter);
  }
  return (
    <>
      <h1>Hello React</h1>
      <h2>Counter value: {counter}</h2>

      <button
      onClick={addValue}>Add Value {counter}</button>
      <br />
      <button onClick={romoveValue}>Remove Value {counter}</button>
    </>
  )
}

export default App
