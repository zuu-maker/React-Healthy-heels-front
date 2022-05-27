import { Avatar, Badge, IconButton, LinearProgress, Stack } from '@mui/material';
import React from 'react';
import Resizer from "react-image-file-resizer";
import {storageBucket} from "../../firebase";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function FileUpload({values, setValues}) {

    const [progress, setProgress] = React.useState(0);

    const fileUploadAndResize = (e) => {
        
        let files = e.target.files;
        let allUploadedFiles = values.images;
        
        if(files){
            for(let i = 0; i < files.length; i++){
                const storageRef = storageBucket.ref(files[i].name)
                
                Resizer.imageFileResizer(files[i], 720,720, "JPEG", 100, 0, (uri) => {
                    // console.log(uri);
                    storageRef.putString(uri,'data_url')
                    .on('state_changed', snap => {
                        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                        setProgress(percentage);
                    }, err => {
                        console.log(err);
                        alert("upload Error");
                    }, async () => {
                        const url = await storageRef.getDownloadURL();
                        allUploadedFiles.push({
                            public_id: files[i].name.split('.')[0],
                            ref:files[i].name,
                            url
                        });

                        setValues({...values, images: allUploadedFiles});
                        setProgress(0);
                    })
                })
            }
        }
    }

    const handleRemove = (ref, public_id) => {
        const storageRef = storageBucket.ref(ref);

        storageRef.delete()
        .then(() =>{
            const {images} = values;
            let filteredImages = images.filter(item => {
                return item.public_id !== public_id
            });
            setValues({...values, images: filteredImages});
            // alert("Removed");
        })
        .catch((err) => {
            console.log(err);
        })
    }

  return (
    <div style={{marginBottom: '0.5rem', marginTop: '0.5rem'}}>
        {progress !== 0 && <LinearProgress variant="determinate" value={progress} />}
        <Stack direction="row" spacing={2}>
            {values.images.map((image) =>
                <Badge style={{cursor:'pointer'}} badgeContent="X" color="error" onClick={() => handleRemove(image.ref, image.public_id)}>
                    <Avatar 
                    variant="square" 
                    alt="" 
                    src={image.url}
                    sx={{ width: 160, height: 120 }}
                    />
                </Badge>
            )}
        </Stack>
        
        <label>
            {/* Upload Photo(s) */}
            <input 
            type="file" 
            multiple 
            accept="images/*" 
            hidden
            onChange={fileUploadAndResize}
            />
            <IconButton color="success" component="span">
                <AddAPhotoIcon  />
            </IconButton>
        </label>
        
    </div>
  );
}

export default FileUpload;
