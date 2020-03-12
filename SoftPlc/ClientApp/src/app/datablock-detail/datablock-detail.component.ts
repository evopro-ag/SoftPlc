import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import {Datablock } from '../datablock';
import { MessageService } from '../message.service';
import { hexeditorline } from 'src/hexeditorline';
import { HexEditService } from '../hex-edit.service';
import { DatablockService } from '../datablock.service';

@Component({
  selector: 'app-datablock-detail',
  templateUrl: './datablock-detail.component.html',
  styleUrls: ['./datablock-detail.component.scss']
})
export class DatablockDetailComponent implements OnInit, OnChanges {

  @Input() datablock: Datablock;

  decodedData : string;
  decodedBytes : hexeditorline[];

  validationpattern: string;
  currentSize: number;

  constructor(private messageService: MessageService, private hexEditorService : HexEditService, private datablockService: DatablockService) { }

  ngOnInit(): void {
    this.validationpattern = "^[a-fA-F0-9]{2}$";

      this.hexEditorService.decoderB64.subscribe(data => {
        this.decodedData = this.hexEditorService.decodeBase64(data);
        this.decodedBytes = this.hexEditorService.mapBytesToHexlines(this.hexEditorService.convertAsciiToHex(this.decodedData));
       this.currentSize =  this.hexEditorService.getSizeOf(this.decodedBytes);
  }
      ); 

      this.hexEditorService.encoder.subscribe(data =>  {
        if(this.datablock){
          this.decodedBytes = this.hexEditorService.mapBytesToHexlines(this.hexEditorService.convertAsciiToHex(data));    
          var reCoded = this.hexEditorService.convertHexToAscii(this.hexEditorService.mapHexlinesToBytes(this.decodedBytes)); //use the actual sequence of bytes as source for 
        this.datablock.data = this.hexEditorService.encodeBase64(reCoded);          //the encoder instead of using the string input which can contain multi-byte chars
        this.currentSize =  this.hexEditorService.getSizeOf(this.decodedBytes);
      }
    }); 

    this.hexEditorService.decoderHex.subscribe(hex => {
      this.decodedBytes = this.hexEditorService.mapBytesToHexlines(this.hexEditorService.mapHexlinesToBytes(hex)); // workaround for grouping the bytes correctly after removing bytes
      this.decodedData = this.hexEditorService.convertHexToAscii(this.hexEditorService.mapHexlinesToBytes(hex));
      this.datablock.data = this.hexEditorService.encodeBase64(this.decodedData);
      this.currentSize =  this.hexEditorService.getSizeOf(this.decodedBytes);
    })

  }

  ngOnChanges(changes: SimpleChanges) {
    if( changes['datablock']){
    this.updateDatablock();
  }
  }

  updateDatablock(){
    if(this.datablock){
      this.hexEditorService.decoderB64.next(this.datablock.data);
    }
  }

  async onReload(){
    this.datablock = await this.datablockService.getDatablock(this.datablock.id).toPromise();
    this.updateDatablock();
  }

  async onSave(){
    this.datablockService.putDatablock(this.datablock);
    this.datablockService.getDatablocks();
  }


  onDataChanged(newBytes: string){
    this.hexEditorService.encoder.next(newBytes);
  }

  onHexChanged(newBytes: hexeditorline[], changedByte: string){
    if(changedByte.length >= 2 || changedByte == ""){
    this.hexEditorService.decoderHex.next(newBytes);
    }
  }

  trackByOffset(index, item) {
    return index;
  }


  moveToPrevious(focused: any){
    focused.previousElementSibling.focus();
  }
}
