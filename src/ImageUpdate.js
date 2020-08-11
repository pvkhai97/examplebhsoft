import React,{useState} from 'react'
import {Button} from '@material-ui/core';
import {storage, db} from './firebase';

function ImageUpdate() {

const [caption, setCaption] =useState('')
const [progress, setProgress] =useState('')
const [image, setImage] =useState('')

const handleChange =(e) =>{
    if(e.target.file[0]) {
        setImage(e.target.file[0]);
    }
}

const handleUpload =(e) => {
const uploadTask = storage.ref(`image/${image.name}`).put(image)
}

    return (
        <div>
            <input type='text'placeholder="enter .." onChange={event => setCaption(event.target.value)} value={caption}/>
            <input type='file' onChange={handleChange}/>
            <Button onClick={handleUpload}>
               Upload
            </Button>
        </div>
    )
}

export default ImageUpdate
