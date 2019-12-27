import { Injectable } from '@angular/core';
import { CommitteeApi, Committee } from '../shared/sdk';

@Injectable({
  providedIn: 'root',
})
export class OpeningService {
  private ctOpen: boolean;
  private capOpen: boolean;

  constructor(private committeeApi: CommitteeApi) {
    this.getCurrentCap().then(r => console.log(r))
    this.committeeApi.find({
      where: {
        limit: {
          gt: new Date()
        }
      }
    }).subscribe((committees: Committee[]) => {
      this.capOpen = committees.filter(committee => committee.type === 'cap').length > 0;
      this.ctOpen = committees.filter(committee => committee.type === 'ct').length > 0;
    })
  }

  isOpen(): boolean {
    return this.capOpen || this.ctOpen;
  }

  isCapOpen(): boolean {
    return this.capOpen;
  }

  isCtOpen(): boolean {
    return this.ctOpen;
  }

  getCurrentCap(): Promise<Committee> {
    return this.getCurrentSession('cap');
  }

  getCurrentCt(): Promise<Committee> {
    return this.getCurrentSession('ct');
  }

  private getCurrentSession(type: string): Promise<Committee> {
    return new Promise((resolve, reject) => {
      this.committeeApi.find({
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
      }).subscribe((committees: Committee[]) => {
        resolve(committees[0]);
      });
    });
  }
}

