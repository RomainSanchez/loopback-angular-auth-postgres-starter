/* tslint:disable */
import {
  Referral
} from '../index';

declare var Object: any;
export interface AttachmentInterface {
  "name": string;
  "file": any;
  "id"?: number;
  "referralId"?: number;
  referral?: Referral;
}

export class Attachment implements AttachmentInterface {
  "name": string;
  "file": any;
  "id": number;
  "referralId": number;
  referral: Referral;
  constructor(data?: AttachmentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Attachment`.
   */
  public static getModelName() {
    return "Attachment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Attachment for dynamic purposes.
  **/
  public static factory(data: AttachmentInterface): Attachment{
    return new Attachment(data);
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
      name: 'Attachment',
      plural: 'Attachments',
      path: 'Attachments',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "file": {
          name: 'file',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "referralId": {
          name: 'referralId',
          type: 'number'
        },
      },
      relations: {
        referral: {
          name: 'referral',
          type: 'Referral',
          model: 'Referral',
          relationType: 'belongsTo',
                  keyFrom: 'referralId',
          keyTo: 'id'
        },
      }
    }
  }
}
