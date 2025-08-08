import React, { useState } from 'react';

function App() {
  const [color, setColor] = useState("olive");

  return (
    <>
      <div className={`w-full h-screen duration-200`}
      style={{backgroundColor: color}}>
        <div className='flex fixed bottom-12 rounded-lg justify-center inset-x-0 px-4'>
          <div className='flex justify-center gap-3 bg-white rounded-3xl shadow-lg px-3 py-2'> 
            <button
              onClick={() => setColor("red")}
              className='outline-none px-4 rounded-full text-white hover:bg-red-800 duration-200 shadow-lg pb-1 '
              style={{ backgroundColor: 'red' }}
            >
              red
            </button>
            <button
              onClick={() => setColor('bg-green-700')}
              className='outline-none px-4 rounded-full text-white hover:bg-green-800 duration-200 shadow-lg pb-1'
              style={{ backgroundColor: 'green' }}
            >
              green
            </button>
            <button
              onClick={() => setColor('blue')}
              className='outline-none px-4 bg-blue-700 rounded-full text-white hover:bg-blue-800 duration-200 shadow-lg pb-1'
            >
              blue
            </button>
            <button
              onClick={() => setColor('olive')}
              className='outline-none px-4 rounded-full text-white hover:bg-lime-900 duration-200 shadow-lg pb-1'
              style={{ backgroundColor: 'olive'}}
            >
              olive
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
