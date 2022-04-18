import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import userStore from './store/userStore';
import postStore from './store/postStore'
import usersStore from './store/usersStore'
import currentUserStore from './store/currentUserStore';
import NotificationStore from './store/NotificationStore';

const user = new userStore()
const posts = new postStore()
const usersData = new usersStore()
const currentUser = new currentUserStore()
const notification = new NotificationStore()

export const Context = createContext({user, posts, usersData, currentUser, notification})

ReactDOM.render(
    <Context.Provider value={{user, posts, usersData, currentUser, notification}}>
    <App />
    </Context.Provider>,
  document.getElementById('root')
);
