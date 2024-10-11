import React from 'react';
import { Minus, Plus } from 'lucide-react';

const SizeFont = ({ fontSize, setFontSize }) => {
  
  const increaseFontSize = () => setFontSize(prevSize => Math.min(prevSize + 1, 50)); 
  const decreaseFontSize = () => setFontSize(prevSize => Math.max(prevSize - 1, 10)); 

  return (
    <div className='flex gap-3 justify-center items-center'>
      <p 
        className='p-1 border-2 border-myCustomColor-primaryC rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300'
        onClick={increaseFontSize} 
      >
        <Plus size={25} />
      </p>

      <p>A</p> 
      
      <p 
        className='p-1 border-2 border-myCustomColor-primaryC rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300'
        onClick={decreaseFontSize} 
      >
        <Minus size={25} />
      </p>
    </div>
  );
};

export default SizeFont;
