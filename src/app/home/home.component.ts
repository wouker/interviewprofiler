import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Sector, SectorsService } from '../sectors.service';
import { Category, CategoriesService } from '../categories.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	constructor(private sectors_data: SectorsService, private categories_data: CategoriesService, public dialog: MatDialog) { }

	sectors: Array<object>;
	categories: Array<object>;
	new_sector: string;

	openDialog() {
    let dialogRef = this.dialog.open(AddSectorDialogComponent, {
      data: {
        new_sector: this.new_sector
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.length > 0) this.addSector(result);
    });
  }

  addSector(result) {
  	this.sectors_data.addSector(result);
  }

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

  editSector(sector) {
  	this.sectors_data.editSector(sector);
  }

}

@Component({
  selector: 'add-sector-dialog',
  templateUrl: 'add-sector-dialog.html',
})
export class AddSectorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddSectorDialogComponent>) {}

	bindSector(event) {
		this.data.new_sector = event.target.value;
	}

	close(data) {
		if(!data) var data = '';
		this.dialogRef.close(data);
	}
}