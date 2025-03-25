import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
  
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center justify-center w-12 h-12 bg-blue-50 text-primary rounded-lg">
          {icon ? (
            <img src={icon} alt='icon' className='w-12 h-12'/>// Display selected emoji
          ) : (
            <LuImage className="w-6 h-6" />
          )}
        </div>
        <p className="text-sm">{icon ? "Change Icon" : "Pick Icon"}</p>
      </div>


      {isOpen && (
        <div className="absolute z-10 top-14 left-0 w-full max-w-[320px] p-4 bg-white border rounded-lg shadow-md">
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-red-600 w-7 h-7 hover:border-red-600 flex items-center justify-center bg-white hover:bg-red-50 border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
            >
              <LuX className="w-5 h-5" />
            </button>
          </div>
          <EmojiPicker
            className="max-w-[290px]"
            onEmojiClick={(emoji) => {
                onSelect(emoji?.imageUrl || "")
                setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
