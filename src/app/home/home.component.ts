import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sector, SectorsService } from '../sectors.service';
import { Category, CategoriesService } from '../categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	constructor(private sectors_data: SectorsService, private categories_data: CategoriesService) { }

	sectors: Array<object>;
	categories: Array<object>;
	new_sector: string;

	getSectors() {
  	this.sectors =this.sectors_data.getSectors();
	}

	getCategories() {
  	this.categories = this.categories_data.getCategories();
	}

	deleteSector(id) {
		this.sectors_data.deleteSector(id);
		this.getSectors();
	}

	getCategoryFromSector(id) {
		var categories_by_id = this.categories.map(category => category.id);
		var result = this.categories[categories_by_id.indexOf(id)];
		return result;
	}

  ngOnInit() {
  	this.getSectors();
  	this.getCategories();
  }

}
