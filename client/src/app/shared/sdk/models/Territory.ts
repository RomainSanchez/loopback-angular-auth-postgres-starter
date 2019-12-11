/* tslint:disable */

declare var Object: any;
export interface TerritoryInterface {
  "name": string;
  "code": number;
  "email": string;
  "id"?: number;
}

export class Territory implements TerritoryInterface {
  "name": string;
  "code": number;
  "email": string;
  "id": number;
  constructor(data?: TerritoryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Territory`.
   */
  public static getModelName() {
    return "Territory";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Territory for dynamic purposes.
  **/
  public static factory(data: TerritoryInterface): Territory{
    return new Territory(data);
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
      name: 'Territory',
      plural: 'Territories',
      path: 'Territories',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "code": {
          name: 'code',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
