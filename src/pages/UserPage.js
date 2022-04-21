import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {
    Box,
    Container,
    Grid,
    Paper,
} from '@mui/material';
import UserInfo from '../components/profile/UserInfo';
import {Context} from '../index';
import SideBar from '../components/sidebar/SideBar';
import PostsList from '../components/posts/PostsList';
import {useParams} from 'react-router-dom';
import theme from '../theme';
import CreatePostButton from '../components/profile/CreatePostButton';
import UserList from '../components/UserList';

const UserPage = observer(() => {
    const {posts, usersData, currentUser, user} = useContext(Context);
    const {id} = useParams()

    useEffect(()=>{
        usersData.fetchUsers()
        currentUser.fetchOneUser(id)
        posts.fetchProfilePosts(id)
        currentUser.fetchUserFollowing(id)
        currentUser.fetchUserFollowers(id)
       },[id, currentUser, posts, usersData])

    return (
        <Box sx={{display: 'flex', minHeight: '100vh'}}>
            <Grid container spacing={3} sx={{backgroundColor: theme.palette.background.default}}>
                <Grid item xs={6} sm={4} md={3} lg={2}>
                   <SideBar />
                </Grid>
                <Grid item xs={6} sm={8} md={9} lg={10}
                      sx={{ ml:30}}
                >
                      <Container  sx={{ mt: 10, mb: 4}}>
                          <Grid container spacing={3}>
                       {/* Posts */}
                       <Grid item xs={12} md={9} lg={9} >
                           <UserInfo />

                           <CreatePostButton/>


                           {user.user.id === id?
                           <CreatePostButton/>
                               :
                               <></>}
                           <PostsList/>
                       </Grid>
                       {/* message */}
                       <Grid item  md={3} lg={3}>

                           <Paper
                               sx={{
                                   p: 2,
                                   display: 'flex',
                                   flexDirection: 'column',
                               }}
                           >
                               <UserList/>
                           </Paper>
                       </Grid>
                       </Grid>
               </Container>
                </Grid>
            </Grid>
        </Box>
    );
});

export default UserPage;
