import { Injectable } from '@angular/core';
import { CommitteeApi, Committee } from '../shared/sdk';

@Injectable({
  providedIn: 'root',
})
export class OpeningService {
  private currentCap: Committee;
  private currentCt: Committee;

  constructor(private committeeApi: CommitteeApi) {
    this.getCurrentSession('cap').then(currentCap => this.currentCap = currentCap);
    this.getCurrentSession('ct').then(currentCt => this.currentCt = currentCt);
  }

  isOpen(): boolean {
    return this.isCapOpen() || this.isCtOpen();
  }

  isCapOpen(): boolean {
    return !!this.currentCap;
  }

  isCtOpen(): boolean {
    return !!this.currentCt;
  }

  getCurrentCap(): Committee {
    return this.currentCap;
  }

  getCurrentCt(): Committee {
    return this.currentCt;
  }

  private getCurrentSession(type: string): Promise<Committee> {
    return new Promise((resolve, reject) => {
      this.committeeApi.findOne({
        where: {
          type: type,
          limit: {
            gt: new Date()
          }
        },
        order: [
          'session ASC',
          'limit ASC'
        ]
      }).subscribe((committee: Committee) => {
        resolve(committee);
      });
    });
  }
}

