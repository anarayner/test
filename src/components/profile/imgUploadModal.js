import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useContext, useState} from 'react';
import {useParams} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import {PhotoCamera} from '@material-ui/icons';
import {Context} from '../../index';
import {dataURLtoFile} from '../../util/dataURLtoFile';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 10,
    borderRadius:5,
    p: 4,
};

export default function ImgUploadModal() {
    const {currentUser} = useContext(Context);


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [file, setFile] = useState(null)
    const selectFile = (e) => {
        setFile(e.target.files[0])
    }
    const {id} = useParams()
    const addImage = ()=>{
        const imageURL = file.toDataURL('image/jpg')
        const convertedURLtoFile = dataURLtoFile(imageURL, 'image.jpg')
        console.log(imageURL)
        console.log(convertedURLtoFile)
        const formData = new FormData()
        formData.append('profilePicture', file)
        currentUser.uploadProfilePicture(id, formData).then((data) => setOpen(false))
    }

    return (
        <div>
            <IconButton onClick={handleOpen} color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="img-upload"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form>

                <input type='file' accept='image/*' onChange={selectFile} style={{fontSize: 'medium'}}/>
                        <Button variant='contained' disabled={!file} onClick={addImage}> Upload</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}