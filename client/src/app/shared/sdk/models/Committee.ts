/* tslint:disable */

declare var Object: any;
export interface CommitteeInterface {
  "session": Date;
  "limit": Date;
  "notification"?: Date;
  "examination"?: Date;
  "recap"?: Date;
  "location"?: string;
  "type"?: string;
  "id"?: number;
  "createdAt": Date;
  "updatedAt": Date;
}

export class Committee implements CommitteeInterface {
  "session": Date;
  "limit": Date;
  "notification": Date;
  "examination": Date;
  "recap": Date;
  "location": string;
  "type": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: CommitteeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Committee`.
   */
  public static getModelName() {
    return "Committee";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Committee for dynamic purposes.
  **/
  public static factory(data: CommitteeInterface): Committee{
    return new Committee(data);
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
      name: 'Committee',
      plural: 'Committees',
      path: 'Committees',
      idName: 'id',
      properties: {
        "session": {
          name: 'session',
          type: 'Date'
        },
        "limit": {
          name: 'limit',
          type: 'Date'
        },
        "notification": {
          name: 'notification',
          type: 'Date'
        },
        "examination": {
          name: 'examination',
          type: 'Date'
        },
        "recap": {
          name: 'recap',
          type: 'Date'
        },
        "location": {
          name: 'location',
          type: 'string',
          default: 'CDG29'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "id": {
          name: 'id',
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
      },
      relations: {
      }
    }
  }
}
