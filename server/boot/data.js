'use strict';

module.exports = function(app) {
  /* Initialize roles, admin user, forms
     Customize before first boot
     COMMENT/REMOVE AFTER first boot
  */
  const admin = {
    name: 'full name',
    email: 'email@admin.fake',
    realm: 'backend',
    username: 'username',
    emailVerified: true,
    password: 'password'
  };

  const roles = [
    { name: 'admin', description: 'Administrateur' },
    { name: 'secretary', description: 'Secrétaire' },
    { name: 'community', description: 'Collectivité' },
    { name: 'validator', description: 'Valideur' },
    { name: 'cap', description: 'Authorisé à saisir la CAP' },
    { name: 'ct', description: 'Authorisé à saisir le CT' }
  ];

  const roleMapping = [
    { principalType: 'USER', principalId: 1, roleId: 1 },
    { principalType: 'USER', principalId: 1, roleId: 2 },
    { principalType: 'USER', principalId: 1, roleId: 3 },
    { principalType: 'USER', principalId: 1, roleId: 4 },
    { principalType: 'USER', principalId: 1, roleId: 5 },
    { principalType: 'USER', principalId: 1, roleId: 6 }
  ];

  const territories = [
    { name: 'Territoire de Brest', code: 1, 'email': 'cdg.contact1@cdg29.bzh'},
    { name: 'Territoire de Cornouaille', code: 2, 'email': 'cdg.contact2@cdg29.bzh'},
    { name: 'Territoire de Morlaix', code: 3, 'email': 'cdg.contact3@cdg29.bzh'}
  ];

  const forms = [
    { name: 'Refus de titularisation', committee: 'cap', code: 'cap01' , requiredAttachments: [
      'Entretien de suivi stagiaire',
      'Fiche de poste',
      'Compte rendu d\'entretien',
      'Curriculum vitae'
    ]},
    { name: 'Mise à disposition', committee: 'cap', code: 'cap02' , requiredAttachments: ['Convention de mise à disposition']},
    { name: 'Demande de licenciement pour inaptitude physique d\'un agent CNRACL', committee: 'cap', code: 'cap03' , requiredAttachments: [
      'PV du comité médical',
      'Etat récapitulatif des arrêts',
      'Refus CNRACL',
      'Fiche d\'aptitude du médecin de prévention',
      'Impossibilité de reclassement'
    ]},
    { name: 'Demande de licenciement pour inaptitude physique d\'un agent IRCANTEC', committee: 'cap', code: 'cap04' , requiredAttachments: [
      'PV du comité médical',
      'Etat récapitulatif des arrêts',
      'Fiche d\'aptitude du médecin de prévention',
      'Impossibilité de reclassement'
    ]},
    { name: 'Prorogation de stage', committee: 'cap', code: 'cap05' , requiredAttachments: [
      'Entretien de suivi stagiaire',
      'Fiche de poste',
      'Compte rendu d\'entretien',
      'Curriculum vitae'
    ]},
    { name: 'Refus de disponibilité ou de réintégration après disponibilité', committee: 'cap', code: 'cap06' , requiredAttachments: []},
    { name: 'Licenciement en cours de stage', committee: 'cap', code: 'cap07' , requiredAttachments:[
      'Entretien de suivi stagiaire',
      'Fiche de poste',
      'Compte rendu d\'entretien',
      'Curriculum vitae'
    ]},
    { name: 'Proposition d\'avancement à l\'échelon spécial', committee: 'cap', code: 'cap08' , requiredAttachments: []},
    { name: 'Proposition d\'avancement de grade', committee: 'cap', code: 'cap09' , requiredAttachments: ['Demande de l\'agent']},
    { name: 'Demande de révision de l\'entretien professionnel', committee: 'cap', code: 'cap10' , requiredAttachments: ['Compte rendu d\'entretien']},
    { name: 'Promotion interne', committee: 'cap', code: 'cap11' , requiredAttachments: []},
    { name: 'Refus de congé de formation syndicale ou professionnelle', committee: 'cap', code: 'cap12' , requiredAttachments: []},
    { name: 'Refus de télétravail ou de CET ou de temps partiel', committee: 'cap', code: 'cap13' , requiredAttachments: []},
    { name: 'Contrat article 38: non renouvellement du contrat', committee: 'cap', code: 'cap14' , requiredAttachments: [
      'Fiche de poste',
      'Compte rendu d\'entretien',
      'Curriculum vitae'
    ]},
    { name: 'Règlement intérieur', committee: 'ct' , code: 'ct01', requiredAttachments: ['Projet de règlement intérieur']},
    { name: 'Mise en place du temps partiel sur autorisation', committee: 'ct' , code: 'ct02', requiredAttachments: []},
    { name: 'Formation', committee: 'ct' , code: 'ct03', requiredAttachments: [
      'Projet de règlement de formation',
      'Plan de formation'
    ]},
    { name: 'Ratios promus-promouvables', committee: 'ct' , code: 'ct04', requiredAttachments: []},
    { name: 'Protection sociale complémentaire', committee: 'ct' , code: 'ct05', requiredAttachments: []},
    { name: 'Contrat d\'apprentissage', committee: 'ct' , code: 'ct06', requiredAttachments: ['Délibération dérogatoire']},
    { name: 'Délégation de service public', committee: 'ct' , code: 'ct07', requiredAttachments: ['Projet de délégation']},
    { name: 'Modification du protocole ARTT', committee: 'ct' , code: 'ct08', requiredAttachments: []},
    { name: 'Astreintes et permanences', committee: 'ct' , code: 'ct09', requiredAttachments: []},
    { name: 'Tableau des emplois', committee: 'ct' , code: 'ct10', requiredAttachments: ['Tableau des emplois avant/après']},
    { name: 'Organisation des services', committee: 'ct' , code: 'ct11', requiredAttachments: [
      'Tableau des emplois avant/après',
      'Organigramme avant/après',
      'Fiches de postes'
    ]},
    { name: 'Projet de conception ou aménagement de locaux', committee: 'ct' , code: 'ct12', requiredAttachments: [
      'Notice technique',
      'Plans'
    ]},
    { name: 'Régime indemnitaire', committee: 'ct', code: 'ct13', requiredAttachments: ['Tableau des groupes de fonctions'] }
  ];

  // app.models.AppUser.create(admin);
  // app.models.Role.create(roles);
  // app.models.RoleMapping.create(roleMapping);
  // app.models.Form.create(forms);
  // app.models.Territory.create(territories);
};
