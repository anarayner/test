import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {useContext} from 'react';
import {Context} from '../index';
import Typography from '@mui/material/Typography';
import {observer} from 'mobx-react';
import {USER_ROUTE} from '../util/consts';
import {useNavigate} from 'react-router-dom';
import {Divider, Fab} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import {addConversation} from '../services/ChatService';

const UserList = observer(()=> {
    const {usersData, user} = useContext(Context);
    const navigate = useNavigate()

    const addUserToConversation = (e)=>{
        const formData = new FormData()
        formData.append('senderId', user.user.id)
        formData.append('receiverId', '622a8ff95a974a13b7200f29')
        // console.log(user.user.id)
        addConversation(formData)
    }

    return (
        <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {usersData.users.map((user) => {
                return (
                    <div key={user._id+1}>
                    <ListItem
                        key={user._id}
                        disablePadding
                    >
                        <ListItemButton onClick={() => navigate(USER_ROUTE +'/' + user._id)} >
                            <ListItemAvatar>

                                <Avatar
                                    alt={`Avatar`}
                                    src={process.env.REACT_APP_API_URL + user.profilePicture}
                                />
                            </ListItemAvatar>
                            <Typography variant="body2" color="text.secondary">
                                {user.username}
                            </Typography>
                        </ListItemButton>
                        <Fab size="small"
                             color="primary"
                             aria-label="add"
                             onClick={addUserToConversation}
                        >
                            <AddIcon />
                        </Fab>
                    </ListItem>

                        <Divider sx={{mt: 1, mb: 1}}/>
                    </div>
                );
            })}
        </List>
    );
})

export default UserList;
