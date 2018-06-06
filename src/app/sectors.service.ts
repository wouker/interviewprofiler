import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Sector {
	id: number,
	name: string	
}

@Injectable({
  providedIn: 'root'
})
export class SectorsService {

  constructor(private http: HttpClient) { }

  sectors: Array<object> = [
    {
      id: 1,
      name: 'IT',
      categories: []
    },
    {
      id: 2,
      name: 'Economics',
      categories: [1,2,3]
    }
  ]

  getSectors() {
  	return this.sectors;
  }

  deleteSector(id) {
    var sectors_by_id = this.sectors.map(sec => sec.id);
    var index = sectors_by_id.indexOf(id);
    this.sectors.splice(index, 1);
  } 
}
