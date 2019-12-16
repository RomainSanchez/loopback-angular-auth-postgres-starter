/* tslint:disable */
import { Injectable } from '@angular/core';
import { Role } from '../../models/Role';
import { AppUser } from '../../models/AppUser';
import { Form } from '../../models/Form';
import { Referral } from '../../models/Referral';
import { Attachment } from '../../models/Attachment';
import { Territory } from '../../models/Territory';
import { Committee } from '../../models/Committee';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Role: Role,
    AppUser: AppUser,
    Form: Form,
    Referral: Referral,
    Attachment: Attachment,
    Territory: Territory,
    Committee: Committee,
    
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
