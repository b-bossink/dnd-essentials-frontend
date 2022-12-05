import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { StorageKeys } from 'src/app/storage-keys';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public data!: Notification;

  private hubConnection!: signalR.HubConnection;

    public startConnection = async () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('https://localhost:5001/notif')
                              .build();
      await this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .then(() => this.sendUserId())
        .catch(err => console.log('Error while starting connection: ' + err))
    }
    
    public addListener = async () => {
      this.hubConnection.on('notify', (data) => {
        this.data = data;
        alert(data.message);
      });
    }

    public sendUserId = async () => {
      const id = Number(localStorage.getItem(StorageKeys.userId));
      await this.hubConnection.invoke('identify', id)
      .catch(err => console.error(err));
    }

    getRandomInt(min: number, max: number) : number{
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; 
    }
}

interface Notification {
  title: string;
  message: string;
}
