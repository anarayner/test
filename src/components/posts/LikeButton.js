import React, {useContext, useEffect, useState} from 'react';
import {CardActions} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {red} from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import {Context} from '../../index';

const LikeButton = ({post}) => {
    const {user, posts} = useContext(Context);

    const [postLikes, setPostLikes] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)

    useEffect(()=>{
        setIsLiked(post.likes.includes(user.user.id))
    }, [user.user.id, post.likes])

    const handleLike= ()=>{
        const formData = new FormData()
        formData.append('postId', post._id)
        formData.append('userId', user.user.id)
        posts.likePost(formData)
        if(!isLiked) {

            setPostLikes (postLikes + 1)
            setIsLiked (true)
        } else {
            setPostLikes (postLikes - 1)
            setIsLiked (false)
        }
    }
    return (
        <CardActions disableSpacing>

            <IconButton aria-label="like"
                        onClick={handleLike}
            >
                {postLikes > 0 ?
                    <FavoriteIcon sx={{color: red[700]}}/>
                    :
                    <FavoriteIcon/>
                }
            </IconButton>
            <Typography sx={{ml: 1}}>{postLikes}</Typography>

        </CardActions>
    );
};

export default LikeButton;
