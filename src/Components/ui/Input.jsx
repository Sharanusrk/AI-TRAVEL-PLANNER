import React from 'react'

const Input = ({onChange  }) => {
  return (
    <div>
        <input type="number"  placeholder='Ex.3' min="0" max="5" className='border rounded block w-full p-2 border-gray-400'  onChange={(e) => onChange(e.target.value)} />
      
    </div>
  )
}

export default Input
