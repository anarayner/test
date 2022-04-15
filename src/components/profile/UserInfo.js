import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Badge, Box, Button, CircularProgress, Grid, Paper} from '@mui/material';
import {Typography} from '@material-ui/core';
import Divider from '@mui/material/Divider';
import {useParams} from 'react-router-dom';
import {Context} from '../../index';
import {observer} from 'mobx-react';
import ImgUploadModal from './imgUploadModal';
import FollowButton from './FollowButton';
import EditProfileButton from './EditProfileButton';
import FollowersModal from './followersModal';
import FollowingModal from './followingModal';
import {fetchUserFollowers, fetchUserFollowing} from '../../services/UsersService';
import SendMessageButton from './SendMessageButton';

const UserInfo = observer (() => {
        const {id} = useParams()
        const {user, posts, currentUser} = useContext(Context);

        const [userFollowers, setUserFollowers] = useState([])
        const [followersCount, setFollowersCount] = useState(0)
        const [userFollowing, setUserFollowing] = useState([])

        useEffect (() => {
            fetchUserFollowers(id).then(data =>{
                setUserFollowers(data)
                setFollowersCount(data.length)

            })
            fetchUserFollowing(id).then(data =>{
                setUserFollowing(data)
            })

        }, [id]);

        return (
        <Paper>
                <div key={currentUser.currentUser.id}>
        <Box sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
            boxShadow: 1,
            mt:5, p: 2,
        }}
        >
            <Grid container spacing={3} direction='row'>
                <Grid item sm={12} md={3}>
                    <Box sx={{
                        height: 150,
                        width: 150,
                        mt: -5,
                        border: 1,
                        borderColor: '#930505',
                        borderRadius: 100,
                        backgroundColor: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {!currentUser.currentUser.profilePicture?
                            <CircularProgress />
                            :

                            <Avatar
                                src={process.env.REACT_APP_API_URL + currentUser.currentUser.profilePicture}
                                sx={{height: 135, width: 135}}
                            />
                        }

                    </Box>
                    <ImgUploadModal/>

                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ml:3}}>

                            <Typography variant="body1"  >
                                {currentUser.currentUser.username}
                            </Typography>
                        <Divider sx={{pt:1, mb: 1}} />
                        <Typography variant="body2"  >
                            {currentUser.currentUser.city}
                        </Typography>
                        <Typography variant="body2"  >
                            {currentUser.currentUser.work}
                        </Typography>
                        <Typography variant="body2"  >
                            {currentUser.currentUser.description}
                        </Typography>
                        <Grid container spacing={3}  sx={{mt: 1}}>
                            <Grid item sm={12} md={4}  >
                                <Box sx={{display: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }}>
                                    <FollowersModal followersCount={followersCount} userFollowers={userFollowers}/>

                                <Typography variant="body2" color='textSecondary'>
                                    follower
                                </Typography>
                                </Box>
                            </Grid>
                            <Grid item sm={12} md={4}>
                                <Box sx={{display: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}>
                                    <FollowingModal userFollowing={userFollowing}/>
                                    <Typography variant="body2" color='textSecondary' align='center'>
                                        following
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item sm={12} md={4}>
                                <Box sx={{display: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}>
                                    <Button>
                                        <Typography variant="h3" color='textSecondary' >{posts.posts.length}</Typography>
                                    </Button>

                                    <Typography variant="body2" color='textSecondary' align='center'>
                                        posts
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>

                    </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Box>
                        {user.user.id === id?
                            <EditProfileButton/>
                            :
                            <>
                                <FollowButton user={user}
                                              followersCount={followersCount}
                                              setFollowersCount={setFollowersCount}
                                              setUserFollowers={setUserFollowers}
                                              userFollowers={userFollowers}/>
                                <SendMessageButton/>
                            </>
                        }

                    </Box>
                </Grid>
            </Grid>


        </Box>
                </div>

        </Paper>

    )

}
)

export default UserInfo;
