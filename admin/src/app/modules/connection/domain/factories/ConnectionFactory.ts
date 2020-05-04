import { Injectable } from "@angular/core";

const signalR = require('@aspnet/signalr');

@Injectable()
export class ConnectionFactory {
  public create(url: string, options: { token: string }) {
    return new signalR.HubConnectionBuilder()
      .withUrl(`${url}?auth_token=${options.token}`)
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }
}
