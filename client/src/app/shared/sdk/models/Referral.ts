/* tslint:disable */
import {
  Form,
  AppUser,
  Attachment,
  Committee
} from '../index';

declare var Object: any;
export interface ReferralInterface {
  "approved"?: boolean;
  "data": any;
  "status": string;
  "id"?: number;
  "formId"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  "createdById"?: number;
  "updatedById"?: number;
  "validatedById"?: number;
  "validatedAt"?: Date;
  "committeeId"?: number;
  form?: Form;
  createdBy?: AppUser;
  updatedBy?: AppUser;
  validatedBy?: AppUser;
  attachments?: Attachment[];
  signedSummary?: Attachment;
  committee?: Committee;
}

export class Referral implements ReferralInterface {
  "approved": boolean;
  "data": any;
  "status": string;
  "id": number;
  "formId": number;
  "createdAt": Date;
  "updatedAt": Date;
  "createdById": number;
  "updatedById": number;
  "validatedById": number;
  "validatedAt": Date;
  "committeeId": number;
  form: Form;
  createdBy: AppUser;
  updatedBy: AppUser;
  validatedBy: AppUser;
  attachments: Attachment[];
  signedSummary: Attachment;
  committee: Committee;
  constructor(data?: ReferralInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Referral`.
   */
  public static getModelName() {
    return "Referral";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Referral for dynamic purposes.
  **/
  public static factory(data: ReferralInterface): Referral{
    return new Referral(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Referral',
      plural: 'Referrals',
      path: 'Referrals',
      idName: 'id',
      properties: {
        "approved": {
          name: 'approved',
          type: 'boolean',
          default: false
        },
        "data": {
          name: 'data',
          type: 'any'
        },
        "status": {
          name: 'status',
          type: 'string',
          default: 'new'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "formId": {
          name: 'formId',
          type: 'number'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
        "createdById": {
          name: 'createdById',
          type: 'number'
        },
        "updatedById": {
          name: 'updatedById',
          type: 'number'
        },
        "validatedById": {
          name: 'validatedById',
          type: 'number'
        },
        "validatedAt": {
          name: 'validatedAt',
          type: 'Date'
        },
        "committeeId": {
          name: 'committeeId',
          type: 'number'
        },
        "commiteeId": {
          name: 'commiteeId',
          type: 'number'
        },
      },
      relations: {
        form: {
          name: 'form',
          type: 'Form',
          model: 'Form',
          relationType: 'belongsTo',
                  keyFrom: 'formId',
          keyTo: 'id'
        },
        createdBy: {
          name: 'createdBy',
          type: 'AppUser',
          model: 'AppUser',
          relationType: 'belongsTo',
                  keyFrom: 'createdById',
          keyTo: 'id'
        },
        updatedBy: {
          name: 'updatedBy',
          type: 'AppUser',
          model: 'AppUser',
          relationType: 'belongsTo',
                  keyFrom: 'updatedById',
          keyTo: 'id'
        },
        validatedBy: {
          name: 'validatedBy',
          type: 'AppUser',
          model: 'AppUser',
          relationType: 'belongsTo',
                  keyFrom: 'validatedById',
          keyTo: 'id'
        },
        attachments: {
          name: 'attachments',
          type: 'Attachment[]',
          model: 'Attachment',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'referralId'
        },
        signedSummary: {
          name: 'signedSummary',
          type: 'Attachment',
          model: 'Attachment',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'signedSummaryOfId'
        },
        committee: {
          name: 'committee',
          type: 'Committee',
          model: 'Committee',
          relationType: 'belongsTo',
                  keyFrom: 'commiteeId',
          keyTo: 'id'
        }
      }
    }
  }
}
