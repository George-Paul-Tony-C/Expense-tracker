import React ,{ useRef, useState } from 'react'
import {LuUser , LuUpload , LuTrash} from 'react-icons/lu';

const ProfilePhotoSelector = ({image , setImage}) => {
    const inputRef = useRef(null);
    const [ previewUrl , setPreviewUrl ] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if(file) {
            setImage(file);

            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    }

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    }

    const onChooseFile = () => {
        inputRef.current.click();
    }
 
    return (
    <div className='flex justify-center mb-6'>
        <input 
            type="file" 
            accept='image/*'
            ref={inputRef}
            onChange={handleImageChange}
            className='hidden'
        />

        {!image ? (
            <div className='w-20 h-20 flex items-center justify-center bg-blue-100 rounded-2xl relative group'>
                <LuUser className='text-4xl text-primary'/>

                <button
                    type='button'
                    className='w-8 h-8 flex items-center justify-center bg-primary invisible group-hover:visible text-white rounded-lg absolute -bottom-1 -right-2'
                    onClick={onChooseFile}
                >
                    <LuUpload/>
                </button>

            </div>   
        ) : (
            <div className='relative group'>
                <img src={previewUrl} alt="profile photo" className='w-20 h-20 rounded-2xl object-cover' />
                <button 
                    className='w-8 h-8 flex items-center justify-center bg-red-500 invisible group-hover:visible text-white rounded-lg absolute -bottom-1 -right-2' 
                    type='button' 
                    onClick={handleRemoveImage}
                >
                    <LuTrash/>
                </button>
            </div>
        )}
    </div>
  )
}

export default ProfilePhotoSelector