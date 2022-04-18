import {makeAutoObservable} from 'mobx';

export default class NotificationStore{
    _notification = [];

    constructor() {
        makeAutoObservable(this)
    }
    setNotification(notification){
        this._notification = notification
    }

    get notification(){
        return this._notification
    }

    add(notification){
        this.notification.push(notification)
    }
    remove(notification){
        const filteredNotification = this.notification.filter(post => post._id !== id)
        this._posts = filteredNotification
    }
}