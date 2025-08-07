import { useState } from 'react'
import './App.css'
import Card from './components/Card'


function App() {
  let myobj={
    name: 'Riyaz',
    age: 20,
    channel: 'react'
  }
  return (
    <>
      <div className="bg-purple-900 text-black flex items-center p-4  text-4xl font-bold rounded-xl">
      Tailwind is Working 🎉
    </div>
    <Card userName="riyaz"  price="$64"/>
    <Card userName="riyaz2"  price="$29"/>
    <Card userName="riyaz3" />
    </>
  )
}

export default App
