import React, {useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Moment from 'react-moment';
import {observer} from 'mobx-react';
import {Divider, ListItem, ListItemAvatar, ListItemText} from '@mui/material';
import ItemMenuComment from './ItemMenuComment';
import {Context} from '../../index';
import {USER_ROUTE} from '../../util/consts';
import ListItemButton from '@mui/material/ListItemButton';
import {useNavigate} from 'react-router-dom';
import {grey} from '@mui/material/colors';
import theme from '../../theme';

const Comment = ({comment, postComments}) => {
    const {user} = useContext(Context)
    const navigate = useNavigate()


    return (
        <>
        <ListItem alignItems="flex-start">
            <ListItemButton
                sx={{p: 0, color:theme.palette.common.white,
                    backgroundColor: theme.palette.common.white, '&:hover': {
                    color: theme.palette.common.white,
                        backgroundColor: theme.palette.common.white}}}
                onClick={() => navigate(USER_ROUTE +'/' + comment.userId._id)} >

            <ListItemAvatar>
                <Avatar src={process.env.REACT_APP_API_URL + comment.userId.profilePicture}/>
            </ListItemAvatar>
            </ListItemButton>
            <ListItemText
                primary={comment.userId.username}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        > {<Moment fromNow>{comment.createdAt}</Moment>}
                        </Typography>
                        <br/>
                        {comment.content}
                    </React.Fragment>
                }
            />
            {user.user.id === comment.userId._id ?
                <ItemMenuComment comment={comment} postComments={postComments}/>
                :
                <></>
            }

        </ListItem>
    <Divider variant="inset"  />
        </>
    );
};

export default observer(Comment);
