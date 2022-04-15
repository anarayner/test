import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useContext, useState} from 'react';
import theme from '../../theme';
import {styled} from '@mui/system';
import {grey} from '@mui/material/colors';
import {Card, CircularProgress} from '@mui/material';
import {Context} from '../../index';
import AddUserList from '../AddUserList';

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
const ColorButton = styled(Button, {})({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
    '&:hover': {
        backgroundColor: grey[300],
        boxShadow: 'none'

    },
});
export default function AddConversation() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {usersData} = useContext(Context);


    return (
        < >

            <ColorButton
                onClick={handleOpen}
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                    borderRadius: 10,
                    backgroundColor: theme.palette.grey['200'],
                    ml: 3, mt:3 ,
                    boxShadow: 'none'
                }}
                style={{ height: 40}}
            >
                ADD CONVERSATION
            </ColorButton>
            <Modal
                open={open}
                onClose={handleClose}
            >

            </Modal>
        </>
    );
}