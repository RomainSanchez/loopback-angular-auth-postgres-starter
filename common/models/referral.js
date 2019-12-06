'use strict';

const twig = require('node-twig').renderFile;
const pdf = require('html-pdf');

module.exports = function(Referral) {
  Referral.generateSummary = async (id, callback) => {
    return new Promise((resolve, reject) => {
      Referral.findById(id, {include: ['form']}).then(referral => {
        referral.form.get().then(form => {
          twig(`../../../server/assets/views/form/${form.code}.twig`,{context: referral} , function (error, template) {
            console.log(error);
          //  console.log(template);

            // pdfRenderer.create(template).toFile('./summary.pdf', (err, res) => {
            //   console.log(err, res);
            // })

            pdf.create(template).toBuffer((err, buffer) => {
              resolve(buffer)
            })
          });
        });
      });
    });
  }
};
