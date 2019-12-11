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
      AppUser.app.models.Referral.findById(referralId, { include: ['createdBy', 'updatedBy', 'form'] }).then(referral => {
        notifier.newReferralNotification(referral);

        resolve();

        if(!referral.updatedBy) {
          notifier.newReferralNotification(referral);

          resolve();
          return;
        }

        if(referral.status === 'valid') {
          notifier.validationNotification(referral);

          resolve();
          return;
        }

        if(referral.status === 'refused') {
          notifier.refusalNotification(referral);
          resolve();

          return;
        }

        if(referral.status == 'signed') {
          if(signedForMoreThanFiveDays(referral)) {
            notifier.escalationNotification(referral);

            resolve();
            return;
          }

          // notifier.completeNotification(referral);
        }
      });
    });
  }
};

const signedForMoreThanFiveDays = (referral) => {
  return new Date() - referral.createdAt >= 432000;
}
