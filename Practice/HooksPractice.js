import React, {useState} from 'react'

const HooksPractice = () => {
    const [count, setCount] = useState(0)
  return (
    <div>
      <h2>count is : {count}</h2>
      <button>Click Me</button>
    </div>
  )
}

export default HooksPractice
