import { Injectable } from "@angular/core";
import { LoginResource } from "app/modules/auth/domain/resources/LoginResource";
import { StorageService } from "app/modules/core/infrastructure/StorageService";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import * as Raven from 'raven-js';
import * as moment from 'moment';
const get = require('lodash/get');

import { HttpResource } from "app/modules/core/infrastructure/HttpResource";
import { User } from "app/modules/auth/domain/interfaces/User";
import { AccessRoleEnum } from "app/modules/access/domain/enums/AccessRoleEnum";

export interface LoginState {
  isLogged: boolean
  user: User
  type: AccessRoleEnum
  token: string
}

@Injectable()
export class LoginService {
  private SESSION_STORAGE_KEY = 'session';
  private TOKEN_EXPIRATION_DAYS = 3;
  private _state: LoginState = { isLogged: null, token: null, user: null, type: null };
  private state = new BehaviorSubject<LoginState>(this._state);

  public state$: Observable<LoginState> = this.state.asObservable();

  constructor(private loginResource: LoginResource,
              private storage: StorageService,
              private httpResource: HttpResource) {
  }

  public login(credentials: { username: string, password: string }) {
    return this.createSessionData(credentials)
      .do((session: { access_token: string, user: User, created_at: string, type: AccessRoleEnum }) => {
        const sessionData = Object.assign({}, session, {
          created_at: new Date()
        });
        this.setupSessionData(sessionData);
      })
      .catch((error) => {
        this.changeState({ isLogged: false });
        return Observable.throw(error);
      });
  }

  public createSessionData(credentials: { username: string, password: string }) {
    return this.loginResource.create({
      username: credentials.username,
      password: credentials.password
    })
      .first();
  }

  public checkSession() {
    const session = this.storage.getItem(this.SESSION_STORAGE_KEY);
    this.loginBySession(session);
  }

  public logout() {
    this.storage.setItem(this.SESSION_STORAGE_KEY, null);
    this.setState({ isLogged: false, user: null, token: null, type: null });
    this.httpResource.clearHeaders();
  }

  public getState(): LoginState {
    return this._state;
  }

  public getFromState(path): any {
    return get(this.getState(), path);
  }

  private loginBySession(session) {
    if (session && session.accessToken != null
      && !this.isTokenExpired(session.created_at)) {
      this.setupSessionData(session);
    } else {
      this.logout();
    }
  }

  private setupSessionData(session) {
    this.storage.setItem(this.SESSION_STORAGE_KEY, session);
    this.setState({
      isLogged: true,
      token: session.access_token,
      user: session.user,
      type: session.type,
      company: session.company
    });
    this.httpResource.setHeaders({
      Authorization: `Bearer ${session.access_token}`
    });
    // Raven.setUserContext({
    //   id: session.user.id
    // });
  }

  private setState(state) {
    this.state.next(state);
    this._state = state;
  }

  private changeState(changes) {
    const state = Object.assign({}, this._state, changes);
    this.setState(state);
  }

  private isTokenExpired(createdDate: string) {
    const expiredDate = moment(createdDate).add(this.TOKEN_EXPIRATION_DAYS, 'd');
    const currentDate = moment();
    return currentDate.isAfter(expiredDate);
  }

}
