import { useState } from 'react';
import './App.css'


function Counter() {

  const [count, setCount] = useState(0)
  const [clearCount, setClearCount] = useState(null)
  const [incrementColor, setIncrementColor] = useState(false)
  const [decrementColor, setDecrementColor] = useState(false)

  const incrementHandler = () => {
    clearInterval(clearCount)
    const intervalValid = setInterval(() => {
      setCount(prevState => prevState + 1)
    }, 1000)
    setClearCount(intervalValid)
    setIncrementColor(true)
    setDecrementColor(false)
  }

  const decrementHandler = () => {
    clearInterval(clearCount)
    const intervalValid = setInterval(() => {
      setCount(prevState => prevState === 0 ? prevState : prevState - 1)
    }, 1000)
    setClearCount(intervalValid)
    setIncrementColor(false)
    setDecrementColor(true)
  }
  const ResetHandler = () => {
    clearInterval(clearCount)
    setCount(0)
    setIncrementColor(false)
    setDecrementColor(false)
  }
  const PauseHandler = () => {
    clearInterval(clearCount)
    setCount(count)
    setIncrementColor(false)
    setDecrementColor(false)
  }

  let colorStyle = 'black';
  if (incrementColor) {
    colorStyle = 'red'
  } else if (decrementColor) {
    colorStyle = 'green'
  }

  return (
    <div>
      <h1 style={{ color: colorStyle }}>{count}</h1>
      <button onClick={incrementHandler}>{'Increment'}</button>
      <button onClick={PauseHandler}>{'Pause'}</button>
      <button onClick={ResetHandler}>{'Reset'}</button>
      <button onClick={decrementHandler}>{'Decrement'}</button>
    </div>
  );
}

export default Counter;
