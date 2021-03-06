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

  Attachment.uploadSignedSummary = (req, callback) => {
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
          signedSummaryOfId: referralId
        };

        Attachment.create(attachment).then((theAttachment) => {
          resolve(theAttachment);
        });
      });
    });
  };
};
