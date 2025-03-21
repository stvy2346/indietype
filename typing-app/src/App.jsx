import { useState } from 'react'
import Header from './components/Header'
import Timerorspeed from './components/Timerorspeed'
import Restart from './components/Restart'

function App() {

  const handleRestart = ()=>{
    console.log("Restart clicked");
  }

  return (
    <main className="bg-zinc-900 min-h-screen flex flex-col items-center p-4">
      <Header/>
      <div className='flex justify-between items-center w-full max-w-xl mt-4'>
        <Timerorspeed/>
        <Restart onRestart={handleRestart}/>
      </div>
    </main>
  )
}

export default App
