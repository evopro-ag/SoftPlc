import { Component, OnInit, getDebugNode } from '@angular/core';
import { Datablock } from '../datablock';
import { DatablockService } from "../datablock.service";      
import { MessageService } from '../message.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DatablockAddDialogComponent } from '../datablock-add-dialog/datablock-add-dialog.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-datablocks',
  templateUrl: './datablocks.component.html',
  styleUrls: ['./datablocks.component.scss']
})
export class DatablocksComponent implements OnInit {

  selectedDatablock: Datablock;
  datablocks: Datablock[];

  constructor(private datablockService: DatablockService, private messageService: MessageService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.datablockService.getDatablocks().subscribe(block => this.datablocks = block);
  }

  onSelect(datablock: Datablock): void {
    this.selectedDatablock = datablock;
  }

  onAdd(): void {
    let dialogRef : MatDialogRef<DatablockAddDialogComponent, any> = this.dialog.open(DatablockAddDialogComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(async result => {
      var id = Number.parseInt(result.id,10);
      await this.datablockService.postDatablock(id, Number.parseInt(result.size,10));
    });
  }


  onRemove(datablock: Datablock): void{
    this.datablockService.deleteDatablock(datablock.id);
    this.getDatablocks();
  }


  getDatablocks(): void {
    this.datablockService.getDatablocks();
  }
}