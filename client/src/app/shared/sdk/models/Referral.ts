/* tslint:disable */
import {
  Form
} from '../index';

declare var Object: any;
export interface ReferralInterface {
  "createdAt": Date;
  "approved"?: boolean;
  "data": any;
  "id"?: number;
  "formId"?: number;
  form?: Form;
}

export class Referral implements ReferralInterface {
  "createdAt": Date;
  "approved": boolean;
  "data": any;
  "id": number;
  "formId": number;
  form: Form;
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
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "approved": {
          name: 'approved',
          type: 'boolean'
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
      }
    }
  }
}
