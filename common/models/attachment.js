'use strict';

const multiparty = require('multiparty');
const fs = require('fs');

module.exports = function(Attachment) {
  Attachment.upload = async (req, callback) => {
    const form = new multiparty.Form();

    form.parse(req, async (err, fields, files) => {
      if(err) return err;

      const referralId = fields.referral[0];
      const file = files.file[0];

      const fileContent = Buffer.from(fs.readFileSync(file.path)).toString('base64');

      const attachment = {
        name: file.originalFilename,
        file: fileContent,
        referralId: referralId
      };

      await Attachment.create(attachment);
    });
  };
};
