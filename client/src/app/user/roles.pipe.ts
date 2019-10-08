import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'roles'})
export class RolesPipe implements PipeTransform {
  transform(roles: any[]): string {
    const roleNames = [];

    roles.forEach(role => {
      roleNames.push(role.name);
    });

    return roleNames.join(', ');
  }
}
