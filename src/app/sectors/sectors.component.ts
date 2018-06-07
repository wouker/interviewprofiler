import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Sector, SectorsService } from '../sectors.service';
import { Category, CategoriesService } from '../categories.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatExpansionPanel } from '@angular/material'

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss']
})
export class SectorsComponent implements OnInit {
	constructor(private sectors_data: SectorsService, private categories_data: CategoriesService, public dialog: MatDialog) { }

	sectors: Array<object>;
	categories: Array<object>;
	new_sector: string;
  search: string;
  filtered_sectors: Array<object>;

  openAddDialog() {
    let dialogRef = this.dialog.open(AddSectorDialogComponent, {
      data: {
        new_sector: this.new_sector
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != '' && result != undefined) this.addSector(result);
    });
  }

  openDeleteDialog(expansionPanel: MatExpansionPanel, e, sector) {
    e.stopPropagation();
    expansionPanel.close(); // Here's the magic
    
    let dialogRef = this.dialog.open(DeleteSectorDialogComponent, {
      data: {
        sector: sector
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == sector) this.deleteSector(result.id);
    });
  }

  openEditDialog(expansionPanel: MatExpansionPanel, e, sector) {
    e.stopPropagation();
    expansionPanel.close();

    let dialogRef = this.dialog.open(EditSectorDialogComponent, {
      data: {
        sector: sector,
        categories: this.categories
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== sector && result != undefined) this.editSector(result);
    });
  }

  addSector(result) {
  	this.sectors_data.addSector(result);
    this.alphabeticalOrder();
  }

  alphabeticalOrder() {
    this.sectors.sort(function(first, second) {
      var first_name = first.name.toUpperCase();
      var second_name = second.name.toUpperCase();
      return (first_name < second_name) ? -1 : (first_name > second_name) ? 1 : 0;
    });
  }

	getSectors() {
  	this.sectors =this.sectors_data.getSectors();
    this.alphabeticalOrder();  
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
    this.getSectors();
  }

  bindSearch(expansionPanel, e) {
    this.search = e.target.value;
    var self = this;
    var results = this.sectors.filter(sec => 
      sec.name.toLowerCase().indexOf(self.search) != -1
    );
    this.filtered_sectors = results;
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
    if(event.keyCode == 13) {
      this.close(this.data.new_sector);
    }
  }

  close(data) {
    if(!data) var data: any = '';
    this.dialogRef.close(data);
  }
}

@Component({
  selector: 'delete-sector-dialog',
  templateUrl: 'delete-sector-dialog.html',
})
export class DeleteSectorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeleteSectorDialogComponent>) {}

  close(data) {
    if(!data) var data: any = '';
    this.dialogRef.close(data);
  }
}

@Component({
  selector: 'edit-sector-dialog',
  templateUrl: 'edit-sector-dialog.html',
})
export class EditSectorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditSectorDialogComponent>) {}
  name: any = this.data.sector.name;
  categories: any = this.data.sector.categories;

  editedSector() {
    return {
      id: this.data.sector.id,
      name: this.name,
      categories: this.categories
    }
  }

  bindSectorName(event) {
    this.name = event.target.value;
    if(event.keyCode == 13) {
      this.close(this.editedSector());
    }
  }

  bindSectorCategories(id) {
    if(this.data.sector.categories.indexOf(id) == -1) this.data.sector.categories.push(id);
    else {
      var index =this.data.sector.categories.indexOf(id);
      this.data.sector.categories.splice(index, 1);
    }
  }

  close(data) {
    if(!data) var data: any = '';
    this.dialogRef.close(data);
  }
}