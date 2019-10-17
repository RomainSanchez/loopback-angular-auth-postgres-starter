import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  @ViewChild('stepper') private stepper: MatStepper;
  committee: string;
  capFormTypes: string[] = [
    'Détachement',
    'Détachement sur emploi fonctionnel',
    'Refus de détachement de la collectivité d\'origine',
    'Mise à disposition',
    'Demande d\'intégration directe',
    'Demande de changement d\'affectation dans la même collectivité',
    'Demande de disponibilité pour convenances personnelles',
    'Demande de réintégration après disponibilité',
    'Demande de reclassement par détachement dans un autre emploi suite à inaptitude physique',
    'Demande de licenciement pour inaptitude physique d\'un agent CNRACL',
    'Demande de licenciement pour inaptitude physique d\'un agent IRCANTEC',
    'Prorogation de stage',
    'Refus de titularisation',
    'Licenciement en cours de stage',
    'Proposition d\'avancement à l\'échelon spécial',
    'Proposition d\'avancement de grade',
    'Demande de révision de l\'entretien professionnel',
    'Promotion interne',
    'Refus de congé de formation syndicale ou professionnelle',
    'Suppression d\'emploi',
    'Transfert de personnel'
  ];
  ctFormTypes: string[] = [
    'Règlement intérieur',
    'Mise en place du temps partiel sur autorisation',
    'Formation',
    'Ratios promus-promouvables',
    'Protection sociale complémentaire',
    'Contrat d\'apprentissage',
    'Délégation de service public',
    'Modification du protocole ARTT',
    'Astreintes et permanences',
    'Tableau des emplois',
    'Organisation des services',
    'Projet de conception ou aménagement de locaux',
    'Régime indemnitaire'
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  setCommittee(committee: string) {
    this.committee = committee;
    this.stepper.next();
  }

  setFormType(formType: string) {
    this.router.navigate([`/form/${this.committee}/${formType}`]);
  }
}

