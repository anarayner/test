import React, {useContext, useEffect, useState} from 'react';
import {CircularProgress, Fade, Snackbar} from '@mui/material';
import {Context} from '../../index';
import {observer} from 'mobx-react-lite';
import Spinner from '../UI/Spinner'
import AppRouter from '../AppRoutes';


function AlertDialog() {

    const {user} = useContext(Context)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',

    };

    useEffect(()=>{
        if(localStorage.getItem('token')){
            user.checkAuth()
        }
    },[])

    const [state, setState] = React.useState({
        open: true,
        Transition: Fade,
        vertical: 'top',
        horizontal: 'right',
    });
    const handleClose = () => {
        setState({ ...state, open: false });
    };


    return (
        <>
            {user.isAuth?
                <Snackbar
                    open={state.open}
                    onClose={handleClose}
                    TransitionComponent={state.Transition}
                    message="User is authorized"
                    key={state.Transition.name}
                />
                :

                <>
                    {/*<CircularProgress sx={style}/>*/}
                    <Snackbar
                        open={state.open}
                        onClose={handleClose}
                        TransitionComponent={state.Transition}
                        message="User is not authorized"
                        key={state.Transition.name}
                    />
                </>
            }
            {user.isLoading?
                <CircularProgress sx={style}
                />
                :
                <AppRouter/>
            }

        </>

    );
}

export default observer(AlertDialog)