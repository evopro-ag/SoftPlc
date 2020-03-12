import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export class DialogData {
  id: number;
  size: number;
}


@Component({
  selector: 'app-datablock-add-dialog',
  templateUrl: './datablock-add-dialog.component.html',
  styleUrls: ['./datablock-add-dialog.component.scss']
})
export class DatablockAddDialogComponent {
  public data: DialogData;

  constructor(
    public dialogRef: MatDialogRef<DatablockAddDialogComponent>) {
        this.data = new DialogData();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }


    confirm() {
    this.dialogRef.close({ data: this.data }) 
    }
}
