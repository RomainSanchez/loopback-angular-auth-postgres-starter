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
    { name: 'backend', description: 'Accès back office' },
    { name: 'community', description: 'Collectivité' }
  ];

  const roleMapping = [
    { principalType: 'USER', principalId: 1, roleId: 1 },
    { principalType: 'USER', principalId: 1, roleId: 2 },
    { principalType: 'USER', principalId: 1, roleId: 3 }
  ];

  const forms = [
    { name: 'Détachement', committee: 'cap', code: 'cap01' },
    { name: 'Détachement sur emploi fonctionnel', committee: 'cap', code: 'cap02' },
    { name: 'Refus de détachement de la collectivité d\'origine', committee: 'cap', code: 'cap03' },
    { name: 'Mise à disposition', committee: 'cap', code: 'cap04' },
    { name: 'Demande d\'intégration directe', committee: 'cap', code: 'cap05' },
    { name: 'Demande de changement d\'affectation dans la même collectivité', committee: 'cap', code: 'cap06' },
    { name: 'Demande de disponibilité pour convenances personnelles', committee: 'cap', code: 'cap07' },
    { name: 'Demande de réintégration après disponibilité', committee: 'cap', code: 'cap08' },
    { name: 'Demande de reclassement par détachement dans un autre emploi suite à inaptitude physique', committee: 'cap', code: 'cap09' },
    { name: 'Demande de licenciement pour inaptitude physique d\'un agent CNRACL', committee: 'cap', code: 'cap10' },
    { name: 'Demande de licenciement pour inaptitude physique d\'un agent IRCANTEC', committee: 'cap', code: 'cap11' },
    { name: 'Prorogation de stage', committee: 'cap', code: 'cap12' },
    { name: 'Refus de titularisation', committee: 'cap', code: 'cap13' },
    { name: 'Licenciement en cours de stage', committee: 'cap', code: 'cap14' },
    { name: 'Proposition d\'avancement à l\'échelon spécial', committee: 'cap', code: 'cap15' },
    { name: 'Proposition d\'avancement de grade', committee: 'cap', code: 'cap16' },
    { name: 'Demande de révision de l\'entretien professionnel', committee: 'cap', code: 'cap17' },
    { name: 'Promotion interne', committee: 'cap', code: 'cap18' },
    { name: 'Refus de congé de formation syndicale ou professionnelle', committee: 'cap', code: 'cap19' },
    { name: 'Suppression d\'emploi', committee: 'cap', code: 'cap20' },
    { name: 'Transfert de personnel', committee: 'cap', code: 'cap21' },
    { name: 'Règlement intérieur', committee: 'ct' , code: 'ct01'},
    { name: 'Mise en place du temps partiel sur autorisation', committee: 'ct' , code: 'ct02'},
    { name: 'Formation', committee: 'ct' , code: 'ct03'},
    { name: 'Ratios promus-promouvables', committee: 'ct' , code: 'ct04'},
    { name: 'Protection sociale complémentaire', committee: 'ct' , code: 'ct05'},
    { name: 'Contrat d\'apprentissage', committee: 'ct' , code: 'ct06'},
    { name: 'Délégation de service public', committee: 'ct' , code: 'ct07'},
    { name: 'Modification du protocole ARTT', committee: 'ct' , code: 'ct08'},
    { name: 'Astreintes et permanences', committee: 'ct' , code: 'ct09'},
    { name: 'Tableau des emplois', committee: 'ct' , code: 'ct10'},
    { name: 'Organisation des services', committee: 'ct' , code: 'ct11'},
    { name: 'Projet de conception ou aménagement de locaux', committee: 'ct' , code: 'ct12'},
    { name: 'Régime indemnitaire', committee: 'ct', code: 'ct13' }
  ];

  // app.models.Community.create(admin);
  // app.models.Role.create(roles);
  // app.models.RoleMapping.create(roleMapping);
  // app.models.Form.create(forms);
};
