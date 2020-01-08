const mailer = require('./mailer');
const twig = require('node-twig').renderFile;
const loopbackApp = require('./../server');

module.exports = {
  newReferralNotification: async (referral) => {
    const community = await referral.createdBy.get();

    sendNotificationUsingTemplate(
      referral,
      ['rsanchez@cdg29.bzh'],
      `Saisine #${referral.id}`,
      'new-community'
    );

    sendNotificationUsingTemplate(
      referral,
      [await getTerritoryEmail(community.territory), 'secr@cdg29.bzh'],
      `[Nouvelle] Saisine #${referral.id}`,
      'new'
    );
  },

  validationNotification: () => {
    sendNotificationUsingTemplate(
      referral,
      [referral.information.contact],
      `Saisine #${referral.id}`,
      'validation-community'
    );

    sendNotificationUsingTemplate(
      referral,
      ['secr@cdg29.bzh'],
      `[VALIDATION] Saisine #${referral.id}`,
      'validation'
    );
  },

  refusalNotification: () => {
    sendNotificationUsingTemplate(
      referral,
      [referral.information.contact],
      `Saisine #${referral.id}`,
      'refusal-community'
    );
  },

  escalationNotification: () => {
    sendNotificationUsingTemplate(
      referral,
      ['territoire@cdg29.bzh'],
      `[RELANCE] Saisine #${referral.id}`,
      'escalation'
    );
  },

  decisionNotification: () => {
    sendNotificationUsingTemplate(
      referral,
      ['community@cdg29.bzh'],
      `Saisine #${referral.id}`,
      'decision'
    );
  }

}

const sendNotificationUsingTemplate = (referral, recipients, subject, templateName) => {
  twig(`../../../server/assets/views/notification/${templateName}.twig`, {context: referral} , function (error, html) {
    console.log(error);
    console.log(html);
    //mailer.send(recipients, subject, html);
  });
};

const getTerritoryEmail = async (territoryCode) => {
  const territory = await loopbackApp.models.Territory.findOne({where: {
    code: territoryCode
  }})

  return territory.email;
}
