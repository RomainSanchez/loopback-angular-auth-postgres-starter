const docx = require('docx');
const {
  Document,
  Paragraph,
  Packer,
  TextRun,
  Media,
  HeadingLevel,
  AlignmentType
} = docx;
const fs = require('fs');
const moment = require('moment');
const loopbackApp = require('../server');

moment.locale('fr');

module.exports = {
  generateAgenda: async (committee, referrals) => {
    return new Promise(async (resolve, reject) => {
      const elements = [];
      const document = new Document();
      const forms = await loopbackApp.models.Form.find({ where: { committee: committee.type }});

      try {
        if(committee.type === 'ct') {
          // LOGO
          elements.push(new Paragraph(Media.addImage(
            document,
            fs.readFileSync(`${__dirname}/../assets/img/logo_cdg29.png`), 200, 70)
          ));

          elements.push(new Paragraph({
            text: 'ORDRE DU JOUR COMITE TECHNIQUE',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: {
              before: 200,
            }
          }));

          elements.push(new Paragraph({
            text: getFormattedDate(committee.session, true),
            alignment: AlignmentType.CENTER,
            border: {
              bottom: {
                  color: "auto",
                  space: 5,
                  value: "single",
                  size: 6,
              },
            },
          }));

          elements.push(new Paragraph({
            children: [
              new TextRun('key'),
              new TextRun(': ${referral.data[key]}')
            ]
          }))
          //forms.forEach(form => {
            addReferralTypeBlock(elements, forms[0], referrals);
          //});

          document.addSection({
            children: elements,
          });
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }

      Packer.toBase64String(document).then(string => {
        resolve(string);
      })
    });
  }
}

const getFormattedDate = (date, fullText = false) => {
  const momDate = moment(date);

  if(fullText) {
    return `${momDate.format('dddd')} ${momDate.format('DD')} ${momDate.format('MMMM YYYY')}`;
  }

  return momDate.format('DD/MM/YYYY');
}

const addReferralTypeBlock = (elements, type, referrals) => {
  elements.push(new Paragraph({
    text: type.name,
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.CENTER,
    spacing: {
      before: 200,
    }
  }));

  referrals.forEach(referral => {
    elements.push(...getReferralBlock(referral));
  });
};

const getReferralBlock = referral => {
  const fields = [];

  const keys = Object.keys(referral.data).filter(key => key !== 'information');

  keys.forEach(key => {
    fields.push(new Paragraph({
      children: [
        new TextRun(key),
        new TextRun(referral.data[key])
      ]
    }));
  });

  return fields;
};


