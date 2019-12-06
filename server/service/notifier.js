const mailer = require('./mailer');

module.exports = {
  newReferralNotification: (referral) => {
    const subject = `Saisine ${referral.form.name} #${referral.id}`;

    sendNotificationUsingTemplate(
      referral,
      [referral.information.contact],
      subject,
      'new-community'
    );

    sendNotificationUsingTemplate(
      referral,
      ['territoie@cdg29.bzh', 'secr@cdg29.bzh'],
      subject,
      'new'
    );
  },

  validationNotification: () => {
    sendNotificationUsingTemplate(
      referral,
      [referral.information.contact],
      `Saisine ${referral.form.name} #${referral.id}`,
      'validation-community'
    );

    sendNotificationUsingTemplate(
      referral,
      ['secr@cdg29.bzh'],
      `[VALIDATION] Saisine ${referral.form.name} #${referral.id}`,
      'validation'
    );
  },

  escalationNotification: () => {
    sendNotificationUsingTemplate(
      referral,
      ['territoire@cdg29.bzh'],
      `[RELANCE] Saisine ${referral.form.name} #${referral.id}`,
      'escalation'
    );
  }

}

const sendNotificationUsingTemplate = (referral, recipients, subject, templateName) => {
  twig(`../../../server/assets/views/notification/${templateName}.twig`, {context: referral} , function (error, html) {
    console.log(error);
    mailer.send(recipients, subject, html);
  });
};

const getTerritoryEmail = () => {

}
