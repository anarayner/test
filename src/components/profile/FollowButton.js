import React, {useContext, useEffect} from 'react';
import {Button} from '@mui/material';
import {useParams} from 'react-router-dom';
import {Context} from '../../index';
import {observer} from 'mobx-react';
import {addConversation} from '../../services/ChatService';




const FollowButton = ({user, userFollowers, setUserFollowers, followersCount, setFollowersCount}) => {
    const {currentUser} = useContext(Context)
    const {id} = useParams()
    useEffect(()=>{
        if(user.user.id) {
            currentUser.checkFollow (id, user.user.id)
        }
    },[id, currentUser, user.user.id])

    const handleFollow= ()=>{
        const formData = new FormData()
        formData.append('id', user.user.id)
        formData.append('receiverId', id)
        currentUser.follow(id, formData)
        addConversation(formData)
        setFollowersCount(followersCount + 1)

    }
    const handleUnfollow = () => {
        const formData = new FormData()
        formData.append('id', user.user.id)
        currentUser.unfollow(id, formData)
        setFollowersCount(followersCount - 1)
    }

    return (
        <>
            {currentUser.followed?
                <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{mt: 3}}
                    size='small'
                    onClick={handleUnfollow}
                >
                    Unfollow
                </Button>
                :
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{mt: 3}}
                    size='small'
                    onClick={handleFollow}
                >
                    Follow
                </Button>
            }
        </>

    );
};

export default observer(FollowButton);
