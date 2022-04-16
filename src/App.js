import React, {useContext} from 'react';
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme/index'
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRoutes';
import {observer} from 'mobx-react-lite';
import AlertDialog from './components/login/AlertDialog';
import {Context} from './index';
import {CircularProgress} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

};
function App() {
    const {user} = useContext(Context)


  return (
      <BrowserRouter>
      <ThemeProvider theme={theme}>
          <AlertDialog/>
      </ThemeProvider>
      </BrowserRouter>
  );
}

export default observer(App);
