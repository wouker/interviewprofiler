import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Category {
	id: number,
	name: string,
	questions: Array<string>
}

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories() {
  	return [
  		{
  			id: 1,
  			name: 'Javascript',
  			questions: []
  		},
  		{
  			id: 2,
  			name: 'NPM',
  			questions: []
  		},
  		{
  			id: 3,
  			name: 'Git',
  			questions: []

  		},
      {
        id: 4,
        name: 'Finances',
        questions: []
      },
  	]
  }
}
