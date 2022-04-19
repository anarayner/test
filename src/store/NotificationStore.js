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
    remove(){
         this._notification = []
    }
}