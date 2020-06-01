import { Observable } from "rxjs/Rx";

import { BaseRestResource } from "./BaseRestResource";
import { BaseDataMapper } from "./BaseDataMapper";
import { stringify } from "../helpers/query-string";

const isObject = require('lodash/isObject');

export class BaseRepository {
  protected entityIdName: string = 'id';
  private defaultQueryParams;

  constructor(private restResource: BaseRestResource,
              private DataMapper?: typeof BaseDataMapper) {
  }

  public save(entity: object): Observable<any> {
    return this[this.isEntityNew(entity) ? 'create' : 'update'](entity);
  }

  public create(entity: object): Observable<any> {
    const entityData = this.prepareEntityForRequest(entity);
    const query = this.createQuery(entityData);
    return this.resource().create(query).first().map((res) => this.processResponse(res));
  }

  public update(entity: object): Observable<any> {
    if (this.isEntityNew(entity)) {
      return Observable.throw(
        new Error('BaseRepository#update(): you can not update a new entity')
      );
    }
    const entityData = this.prepareEntityForRequest(entity);
    const query = this.createQuery(entityData);
    return this.resource(entity)
      .update(query).first().map((res) => this.processResponse(res));
  }

  public patch(entity: object): Observable<any> {
    if (this.isEntityNew(entity)) {
      return Observable.throw(
        new Error('BaseRepository#update(): you can not patch a new entity')
      );
    }
    const entityData = this.prepareEntityForRequest(entity);
    const query = this.createQuery(entityData);
    return this.resource(entity)
      .patch(query).first().map((res) => this.processResponse(res));
  }

  public load(params: object = {}): Observable<any> {
    const query = { ...params, ...this.defaultQueryParams };
    return this.resource().get(query)
      .first()
      .map((res) => this.processResponse(res));
  }

  public loadById(id: string | number): Observable<any> {
    if (id == null) {
      return Observable.throw(
        new Error('BaseRepository#loadById(): id should not be null or undefined')
      );
    }
    return this.resource(id).get(this.defaultQueryParams).first().map((res) => this.processResponse(res));
  }

  public massDelete(entities: object[]): Observable<any> {
    const observableBatch = [];
    entities.forEach((entity) => {
      const observable = this.delete(entity);
      observableBatch.push(observable);
    });

    return Observable.forkJoin(observableBatch);
  }

  public delete(entity: object): Observable<any> {
    if (this.isEntityNew(entity)) {
      return Observable.throw(
        new Error('BaseRepository#delete(): you can not update a new entity')
      );
    }
    return this.resource(entity).delete().first().map((res) => this.processResponse(res));
  }

  public search(params?) {
    const searchParams = this.resolveSearchParams(params);
    const requestBody = Object.assign({}, searchParams, this.defaultQueryParams);
    return this.resource().get(requestBody)
      .first()
      .map((res) => this.processResponse(res));
  }

  public isEntityNew(entity: object): boolean {
    return entity && entity[this.entityIdName] == null;
  }

  public setDefaultQueryParams(params) {
    this.defaultQueryParams = params;
  }

  protected resource(...params): BaseRestResource {
    if (!params || params.length === 0) {
      return this.restResource;
    } else if (params.length === 1) {
      return this.restResource.child(this.resolveResourceParamLiteral(params[0]));
    }

    const resourcePath = params.reduce((result, param, index) => {
      if (index !== 0) {
        result += '/';
      }
      result += this.resolveResourceParamLiteral(param);
      return result;
    }, '');

    return this.restResource.child(resourcePath);
  }

  protected prepareEntityForRequest(entity: object): object {
    if (this.DataMapper) {
      return this.DataMapper.decode(entity);
    }
    return entity;
  }

  protected processResponse(responseJson: any): any {
    let result = { meta: null };
    if (!responseJson) {
      return;
    }

    let data;
    let meta = null;

    if (responseJson.list && Array.isArray(responseJson.list)) {
      data = responseJson.list;
      meta = {
        page: responseJson.page,
        per_page: responseJson.size,
        total: responseJson.total_count
      };
    } else {
      data = responseJson;
    }

    if (Array.isArray(data)) {
      result = data.map((entityData: any) => this.encodeEntity(entityData)) as any;
    } else {
      result = this.encodeEntity(data) as any;
    }

    result.meta = meta;

    return result;
  }

  /**
   * Private helpers methods
   */

  private createQuery(entityData) {
    if (entityData instanceof FormData) {
      return entityData;
    }

    return { ...entityData, ...this.defaultQueryParams };
  }

  private resolveResourceParamLiteral(param) {
    if (isObject(param)) {
      return param[this.entityIdName];
    }
    return param;
  }

  private resolveSearchParams(params?): object {
    if (params) {
      const result = Object.assign({}, params);
      if (params.page) {
        result.page = Number(result.page);
      }
      if (params.per_page) {
        result.size = Number(result.per_page);
        delete result.per_page;
      }

      return result;
    }
    return {};
  }

  private encodeEntity(entityData: any): object {
    if (this.DataMapper) {
      return this.DataMapper.encode(entityData);
    }

    return entityData;
  }
}
