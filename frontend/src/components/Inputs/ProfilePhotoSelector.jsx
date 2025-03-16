import React ,{ useRef, useState } from 'react'
import {LuUser , LuUpload , LuTrash} from 'react-icons/lu';

const ProfilePhotoSelector = ({image , setImage}) => {
    const inputRef = useRef(null);
    const [ previewUrl , setPreviewUrl ] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files(0);
        if(file) {
            setImage(file);

            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    }

    const hangleRemoveImage = () => {
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
    </div>
  )
}

export default ProfilePhotoSelector