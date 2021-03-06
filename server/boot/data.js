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
    { name: 'instructor', description: 'Instructeur (territoires)' },
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
    ], optionalAttachments: []},
    { name: 'Mise à disposition', committee: 'cap', code: 'cap02' , requiredAttachments: [
      'Convention de mise à disposition',
      'Courrier d\'acceptation de l\'agent'
    ], optionalAttachments: []},
    { name: 'Demande de licenciement pour inaptitude physique d\'un agent CNRACL (28h et plus)', committee: 'cap', code: 'cap03' , requiredAttachments: [
      'PV du comité médical',
      'Etat récapitulatif des arrêts',
      'Refus CNRACL',
      'Fiche d\'aptitude du médecin de prévention',
      'Impossibilité de reclassement'
    ], optionalAttachments: []},
    { name: 'Demande de licenciement pour inaptitude physique d\'un agent IRCANTEC (moins de 28h)', committee: 'cap', code: 'cap04' , requiredAttachments: [
      'PV du comité médical',
      'Etat récapitulatif des arrêts',
      'Fiche d\'aptitude du médecin de prévention',
      'Impossibilité de reclassement'
    ], optionalAttachments: []},
    { name: 'Prorogation de stage', committee: 'cap', code: 'cap05' , requiredAttachments: [
      'Entretien de suivi stagiaire',
      'Fiche de poste',
      'Compte rendu d\'entretien',
      'Curriculum vitae'
    ], optionalAttachments: []},
    { name: 'Refus de disponibilité ou de réintégration après disponibilité', committee: 'cap', code: 'cap06' , requiredAttachments: ['Demande de l\'agent'], optionalAttachments: []},
    { name: 'Licenciement en cours de stage', committee: 'cap', code: 'cap07' , requiredAttachments:[
      'Entretien de suivi stagiaire',
      'Fiche de poste',
      'Compte rendu d\'entretien',
      'Curriculum vitae'
    ], optionalAttachments: []},
    { name: 'Proposition d\'avancement à l\'échelon spécial', committee: 'cap', code: 'cap08' , requiredAttachments: [], optionalAttachments: []},
    { name: 'Proposition d\'avancement de grade', committee: 'cap', code: 'cap09' , requiredAttachments: ['Demande de l\'agent'], optionalAttachments: ['Tableau d\'avancement']},
    { name: 'Demande de révision de l\'entretien professionnel', committee: 'cap', code: 'cap10' , requiredAttachments: [
      'Compte rendu d\'entretien professionnel de l\'agent',
      'Demande de l\'agent',
      'Rapport/réponse de la collectivité'
    ], optionalAttachments: []},
    //a remettre en 2021 { name: 'Promotion interne', committee: 'cap', code: 'cap11' , requiredAttachments: [], optionalAttachments: []},
    { name: 'Refus de congé de formation syndicale ou professionnelle', committee: 'cap', code: 'cap12' , requiredAttachments: [], optionalAttachments: []},
    { name: 'Refus de télétravail ou de CET ou de temps partiel', committee: 'cap', code: 'cap13' , requiredAttachments: [], optionalAttachments: []},
    { name: 'Contrat article 38: non renouvellement du contrat', committee: 'cap', code: 'cap14' , requiredAttachments: [
      'Fiche de poste',
      'Compte rendu d\'entretien',
      'Curriculum vitae'
    ], optionalAttachments: []},
    { name: 'Supression d\'emploi', committee: 'cap', code: 'cap15' , requiredAttachments: [], optionalAttachments: []},
    { name: 'Règlement intérieur', committee: 'ct' , code: 'ct01', requiredAttachments: ['Projet de règlement intérieur'], optionalAttachments: []},
    { name: 'Mise en place du temps partiel sur autorisation', committee: 'ct' , code: 'ct02', requiredAttachments: [], optionalAttachments: []},
    { name: 'Formation', committee: 'ct' , code: 'ct03', requiredAttachments: [
      'Projet de règlement de formation ou plan de formation ou documents sur le CPF',
    ], optionalAttachments: []},
    { name: 'Ratios promus-promouvables', committee: 'ct' , code: 'ct04', requiredAttachments: [], optionalAttachments: []},
    { name: 'Protection sociale complémentaire', committee: 'ct' , code: 'ct05', requiredAttachments: [], optionalAttachments: []},
    { name: 'Contrat d\'apprentissage', committee: 'ct' , code: 'ct06', requiredAttachments: [], optionalAttachments: ['Délibération dérogatoire si l\'apprenti est mineur']},
    { name: 'Délégation de service public', committee: 'ct' , code: 'ct07', requiredAttachments: ['Projet de délégation'], optionalAttachments: []},
    { name: 'Modification du protocole ARTT', committee: 'ct' , code: 'ct08', requiredAttachments: [], optionalAttachments: []},
    { name: 'Astreintes et permanences', committee: 'ct' , code: 'ct09', requiredAttachments: [], optionalAttachments: []},
    { name: 'Tableau des emplois', committee: 'ct' , code: 'ct10', requiredAttachments: ['Tableau des emplois avant/après'], optionalAttachments: []},
    { name: 'Organisation des services', committee: 'ct' , code: 'ct11', requiredAttachments: [
      'Tableau des emplois avant/après',
      'Organigramme avant/après',
      'Fiches de postes'
    ], optionalAttachments: []},
    { name: 'Projet de conception ou aménagement de locaux', committee: 'ct' , code: 'ct12', requiredAttachments: [
      'Notice technique',
      'Plans'
    ], optionalAttachments: []},
    { name: 'Régime indemnitaire', committee: 'ct', code: 'ct13', requiredAttachments: [], optionalAttachments: ['Tableau des groupes de fonctions'] },
    { name: 'Compte épargne temps', committee: 'ct', code: 'ct14', requiredAttachments: [], optionalAttachments: [] },
    { name: 'Document unique', committee: 'ct', code: 'ct15', requiredAttachments: [
      'Document unique',
      'Organigramme de la collectivité'
    ], optionalAttachments: [] },
    { name: 'Nomination d\'un assistant de prévention', committee: 'ct', code: 'ct16', requiredAttachments: [
      'Organigramme de la collectivité',
      'Délibération',
      'Lettre de cadrage',
      'Accord écrit de l\'agent'
    ], optionalAttachments: [] }
  ];

  // app.models.AppUser.create(admin);
  // app.models.Role.create(roles);
  // app.models.RoleMapping.create(roleMapping);
  // app.models.Form.create(forms);
  // app.models.Territory.create(territories);
};
