import { useState } from 'react'
import Header from './components/Header'
import Timerorspeed from './components/Timerorspeed'
import Restart from './components/Restart'
import Gameboard from './components/Gameboard'

function App() {

  const handleRestart = ()=>{
    console.log("Restart clicked");
  }

  return (
    <main className="bg-zinc-900 min-h-screen flex flex-col px-15 py-5">
      <Header/>
      <Timerorspeed/>
      <Gameboard/>
      <Restart onRestart={handleRestart}/>
    </main>
  )
}

export default App
