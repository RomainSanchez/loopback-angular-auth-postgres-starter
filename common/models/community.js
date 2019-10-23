'use strict';

module.exports = function(Community) {
  /**
   * Remove a role from a Community (user)
   * @param {string} id The community id
   * @param {string} roleId The role id
   * @param {Function(Error)} callback
   */
  Community.prototype.removeRole = async (communityId, roleId, callback) => {
    const roleMappingModel = Community.app.models.RoleMapping;

    const mapping = await roleMappingModel.findOne({where: {
      principalType: 'USER',
      principalId: communityId,
      roleId: roleId
    }});

    if(mapping) {
      roleMappingModel.remove(mapping);
    }
  };
};