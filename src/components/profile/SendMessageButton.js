import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useContext, useState} from 'react';
import {useParams} from 'react-router-dom';
import theme from '../../theme';
import {styled} from '@mui/system';
import {grey} from '@mui/material/colors';
import {Card, TextField} from '@mui/material';
import {Context} from '../../index';
import {sendDirectMessage, sendMessage} from '../../services/ChatService';
import MouseOverPopover from '../UI/MouseOverPopover';
import {observer} from 'mobx-react';

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

function SendMessageButton() {
    const {user, currentUser} = useContext(Context);
    const {id} = useParams()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [input, setInput] = useState('')
    console.log(id, user.user.id)


    const addMessage = (e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('receiverId', id)
        formData.append('sender', user.user.id)
        formData.append('content', input)
        sendDirectMessage(formData).then(() => {
            setOpen (false)
        })
    }

    return (
        <>

            {currentUser.followed?
                <Button
                    onClick={handleOpen}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{mt: 3}}
                    size='small'
                >
                    Send message
                </Button>
                :
                <MouseOverPopover>
                    {<Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{mt: 3}}
                        size="small"
                        disabled
                    >
                        Send message
                    </Button>}
                </MouseOverPopover>
            }
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <form>
                       <TextField fullWidth
                                  multiline
                                  onChange={(e) => setInput(values => e.target.value )}
                                  sx={{mb:2}}/>

                        <Button variant='contained' disabled={!input} onClick={addMessage}> Send</Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
}
export default observer(SendMessageButton)