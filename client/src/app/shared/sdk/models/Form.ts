/* tslint:disable */

declare var Object: any;
export interface FormInterface {
  "name": string;
  "committee": string;
  "id"?: number;
}

export class Form implements FormInterface {
  "name": string;
  "committee": string;
  "id": number;
  constructor(data?: FormInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Form`.
   */
  public static getModelName() {
    return "Form";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Form for dynamic purposes.
  **/
  public static factory(data: FormInterface): Form{
    return new Form(data);
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
      name: 'Form',
      plural: 'Forms',
      path: 'Forms',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "committee": {
          name: 'committee',
          type: 'string',
          default: 'cap'
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
