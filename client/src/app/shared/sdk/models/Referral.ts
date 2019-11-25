/* tslint:disable */
import {
  Form,
  Community,
  Attachment
} from '../index';

declare var Object: any;
export interface ReferralInterface {
  "approved"?: boolean;
  "data": any;
  "id"?: number;
  "formId"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  "createdById"?: number;
  "updatedById"?: number;
  form?: Form;
  createdBy?: Community;
  updatedBy?: Community;
  attachments?: Attachment[];
  signedDocument?: Attachment;
}

export class Referral implements ReferralInterface {
  "approved": boolean;
  "data": any;
  "id": number;
  "formId": number;
  "createdAt": Date;
  "updatedAt": Date;
  "createdById": number;
  "updatedById": number;
  form: Form;
  createdBy: Community;
  updatedBy: Community;
  attachments: Attachment[];
  signedDocument: Attachment;
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
          type: 'Community',
          model: 'Community',
          relationType: 'belongsTo',
                  keyFrom: 'createdById',
          keyTo: 'id'
        },
        updatedBy: {
          name: 'updatedBy',
          type: 'Community',
          model: 'Community',
          relationType: 'belongsTo',
                  keyFrom: 'updatedById',
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
        signedDocument: {
          name: 'signedDocument',
          type: 'Attachment',
          model: 'Attachment',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'signedDocumentOfId'
        },
      }
    }
  }
}
