import { useState, useCallback, useEffect, useRef, use } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const[characterAllowed, setCharacterAllowed] = useState(false) 
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 20)
    window.navigator.clipboard.writeText(password)
  }, [password])

  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberAllowed) str += "0123456789"
    if(characterAllowed) str += "!@#$%^&*()_+[]{}|;:',.<>?/~`"
    for(let i=1; i<=length; i++){
      let char =Math.floor(Math.random() * str.length+1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, characterAllowed])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg  px-4 py-3 my-8 text-teal-400 bg-gray-800'>
      <h1 className='text-white text-center font-bold text-2xl mb-4'>Password generator</h1>
      <div className='flex justify-center rounded-lg mb-4 overflow-hidden'>
        <input type="text"
        value={password}
        className='outline-none w-full px-3 py-1 text-lg  bg-gray-200 text-gray-800 '
        placeholder='Password'
        readOnly 
        ref={passwordRef}
        />

        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-1 hover:bg-blue-800 active:bg-blue-900 '>copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => setLength(e.target.value)}
          />
          <label> Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={numberAllowed}
          onChange={() => setNumberAllowed(prev=> !prev)}
          
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={characterAllowed}
          onChange={() => setCharacterAllowed(prev=> !prev)}
          
          />
          <label htmlFor='characterInput'>Characters</label>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
