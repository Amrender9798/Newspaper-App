import React from 'react'

const Error = () => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative h-screen flex justify-center items-center" role="alert">
         <div>
         <p className="font-bold text-2xl mb-4">Something went wrong</p>
         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Try Again</button>
         </div>
         
    </div>    
  )
}

export default Error