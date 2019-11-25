'use strict';

const multiparty = require('multiparty');
const fs = require('fs');

module.exports = function(Attachment) {
  Attachment.upload = (req, callback) => {
    return new Promise((resolve, reject) => {
      const form = new multiparty.Form();

      form.parse(req, (err, fields, files) => {
        if(err) return err;

        const referralId = fields.referral[0];
        const file = files.file[0];

        const fileContent = Buffer.from(fs.readFileSync(file.path)).toString('base64');

        const attachment = {
          name: file.originalFilename,
          file: fileContent,
          referralId: referralId
        };

        Attachment.create(attachment).then((theAttachment) => {
          resolve(theAttachment);
        });
      });
    });
  };

  Attachment.uploadSignedDocument = (req, callback) => {
    return new Promise((resolve, reject) => {
      const form = new multiparty.Form();

      form.parse(req, (err, fields, files) => {
        if(err) return err;

        const referralId = fields.referral[0];
        const file = files.file[0];

        const fileContent = Buffer.from(fs.readFileSync(file.path)).toString('base64');

        const attachment = {
          name: file.originalFilename,
          file: fileContent,
          signedDocumentOfId: referralId
        };

        Attachment.create(attachment).then((theAttachment) => {
          // Attachment.app.models.Referral.findById(referralId).then(referral => {
          //   referral.signedDocument = attachment;

            resolve(theAttachment);
          // });
        });
      });
    });
  };
};
