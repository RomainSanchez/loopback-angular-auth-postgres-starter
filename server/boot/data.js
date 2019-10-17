'use strict';

module.exports = function(app) {
  /* Initialize roles, admin user, forms
     Customize before first boot
     COMMENT AFTER first boot
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
    { principalType: 'USER', principalId: 1, roleId: 2 }
  ];

  const forms = [
    { name: 'Détachement', committee: 'cap' },
    { name: 'Détachement sur emploi fonctionnel', committee: 'cap' },
    { name: 'Refus de détachement de la collectivité d\'origine', committee: 'cap' },
    { name: 'Mise à disposition', committee: 'cap' },
    { name: 'Demande d\'intégration directe', committee: 'cap' },
    { name: 'Demande de changement d\'affectation dans la même collectivité', committee: 'cap' },
    { name: 'Demande de disponibilité pour convenances personnelles', committee: 'cap' },
    { name: 'Demande de réintégration après disponibilité', committee: 'cap' },
    { name: 'Demande de reclassement par détachement dans un autre emploi suite à inaptitude physique', committee: 'cap' },
    { name: 'Demande de licenciement pour inaptitude physique d\'un agent CNRACL', committee: 'cap' },
    { name: 'Demande de licenciement pour inaptitude physique d\'un agent IRCANTEC', committee: 'cap' },
    { name: 'Prorogation de stage', committee: 'cap' },
    { name: 'Refus de titularisation', committee: 'cap' },
    { name: 'Licenciement en cours de stage', committee: 'cap' },
    { name: 'Proposition d\'avancement à l\'échelon spécial', committee: 'cap' },
    { name: 'Proposition d\'avancement de grade', committee: 'cap' },
    { name: 'Demande de révision de l\'entretien professionnel', committee: 'cap' },
    { name: 'Promotion interne', committee: 'cap' },
    { name: 'Refus de congé de formation syndicale ou professionnelle', committee: 'cap' },
    { name: 'Suppression d\'emploi', committee: 'cap' },
    { name: 'Transfert de personnel', committee: 'cap' },
    { name: 'Règlement intérieur', committee: 'ct' },
    { name: 'Mise en place du temps partiel sur autorisation', committee: 'ct' },
    { name: 'Formation', committee: 'ct' },
    { name: 'Ratios promus-promouvables', committee: 'ct' },
    { name: 'Protection sociale complémentaire', committee: 'ct' },
    { name: 'Contrat d\'apprentissage', committee: 'ct' },
    { name: 'Délégation de service public', committee: 'ct' },
    { name: 'Modification du protocole ARTT', committee: 'ct' },
    { name: 'Astreintes et permanences', committee: 'ct' },
    { name: 'Tableau des emplois', committee: 'ct' },
    { name: 'Organisation des services', committee: 'ct' },
    { name: 'Projet de conception ou aménagement de locaux', committee: 'ct' },
    { name: 'Régime indemnitaire', committee: 'ct' }
  ];

  app.models.Community.create(admin);
  app.models.Role.create(roles);
  app.models.RoleMapping.create(roleMapping);
  app.models.Form.create(forms);
};
