'use strict';

const docGenerator = require('../../server/service/doc-generator');

module.exports = function(Committee) {
  Committee.generateAgenda = (id, callback) => {
    return new Promise((resolve, reject) => {
      try {
        Committee.findById(id, {include: ['referrals']}).then(committee => {
          committee.referrals.find().then(referrals => {
            docGenerator.generateAgenda(committee, referrals).then(doc => {
              resolve(doc);
            });
          })
        });
      } catch (error) {
        console.log(error)
      }

    });
  }
};
