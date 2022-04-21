import React, {useContext} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Moment from 'react-moment';
import {observer} from 'mobx-react';
import PostComments from './PostComments';
import {Box, Grid} from '@mui/material';
import ItemMenu from './ItemMenu';
import {Context} from '../../index';
import ListItemButton from '@mui/material/ListItemButton';
import {useNavigate} from 'react-router-dom';
import {USER_ROUTE} from '../../util/consts';
import theme from '../../theme';

const Post = ({post}) => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    console.log(post)
    return (
        <Card sx={{borderRadius: 2, mt: 2}}>
            <Grid container spacing={2} direction='row'  >
                <Grid item xs={8} sm={9} md={10} lg={10.5}>

                    <CardHeader
                        avatar={
                            <ListItemButton
                                sx={{p: 0, color:theme.palette.common.white,
                                    backgroundColor: theme.palette.common.white, '&:hover': {
                                        color: theme.palette.common.white,
                                        backgroundColor: theme.palette.common.white}}}
                                onClick={() => navigate(USER_ROUTE +'/' + post.userId._id)} >
                            <Avatar src={`${process.env.REACT_APP_API_URL}api/user/image/${post.userId.profilePicture}`}
                            />
                            </ListItemButton>
                        }
                        title={post.userId.username}
                        subheader={<Moment fromNow>{post.createdAt}</Moment>}
                    />

                </Grid>
                {user.user.id === post.userId._id?
                    <Grid item xs={4} sm={3} md={2} lg={1.5}>
                        <ItemMenu  props={post}/>
                    </Grid>
                    :
                    <></>
                }
            </Grid>
            {post.img?
                <CardMedia
                    component="img"
                    height="400"
                    image={process.env.REACT_APP_API_URL + post.img}
                    alt="img"
                />
                :
                <></>
            }

            <Box sx={{ml:3, mr:3, mt: 2}}>
                <Typography variant="body2" color="text.secondary" >
                    {post.content}
                </Typography>
            </Box>

            <PostComments post={post}/>
        </Card>
    );
};

export default observer(Post);
