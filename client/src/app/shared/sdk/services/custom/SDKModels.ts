/* tslint:disable */
import { Injectable } from '@angular/core';
import { Role } from '../../models/Role';
import { Community } from '../../models/Community';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Role: Role,
    Community: Community,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
