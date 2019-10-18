/* tslint:disable */
import {
  Role
} from '../index';

declare var Object: any;
export interface CommunityInterface {
  "name": string;
  "email"?: string;
  "realm"?: string;
  "username"?: string;
  "emailVerified"?: boolean;
  "id"?: number;
  "createdAt": Date;
  "updatedAt": Date;
  "password"?: string;
  accessTokens?: any[];
  roles?: Role[];
}

export class Community implements CommunityInterface {
  "name": string;
  "email": string;
  "realm": string;
  "username": string;
  "emailVerified": boolean;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  "password": string;
  accessTokens: any[];
  roles: Role[];
  constructor(data?: CommunityInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Community`.
   */
  public static getModelName() {
    return "Community";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Community for dynamic purposes.
  **/
  public static factory(data: CommunityInterface): Community{
    return new Community(data);
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
      name: 'Community',
      plural: 'Communities',
      path: 'Communities',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
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
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        roles: {
          name: 'roles',
          type: 'Role[]',
          model: 'Role',
          relationType: 'hasMany',
          modelThrough: 'RoleMapping',
          keyThrough: 'roleId',
          keyFrom: 'id',
          keyTo: 'principalId'
        },
      }
    }
  }
}
