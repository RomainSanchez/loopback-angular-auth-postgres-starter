'use strict';

module.exports = function(AppUser) {
  /**
   * Remove a role from a AppUser (user)
   * @param {string} id The appUser id
   * @param {string} roleId The role id
   * @param {Function(Error)} callback
   */
  AppUser.prototype.removeRole = async (appUserId, roleId, callback) => {
    const roleMappingModel = AppUser.app.models.RoleMapping;

    const mapping = await roleMappingModel.findOne({where: {
      principalType: 'USER',
      principalId: appUserId,
      roleId: roleId
    }});

    if(mapping) {
      roleMappingModel.remove(mapping);
    }
  };
};
