'use strict';

const notifier = require('../../server/service/notifier');

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

  /**
   * Send email notification to users on Referral creation/update
   * @param {number} referralId The Referral id
   * @param {Function(Error)} callback
   */
  AppUser.notify = async (referralId, callback) => {
    return new Promise((resolve, reject) => {
      AppUser.app.models.Referral.findById(referralId, { include: ['createdBy', 'updatedBy'] }).then(referral => {
        notifier.newReferralNotification(referral);

        if(!referral.updatedBy) {
          notifier.newReferralNotification(referral);

          return;
        }

        if(referral.status === 'valid') {
          notifier.validationNotification(referral);

          return;
        }

        if(referral.status == 'signed' && signedForMoreThanFiveDays(referral)) {
          notifier.escalationNotification(referral);
        }
      });
    });
  }
};

const signedForMoreThanFiveDays = (referral) => {
  return new Date() - referral.createdAt >= 432000;
}
