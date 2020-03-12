import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatablocksComponent } from './datablocks/datablocks.component';
import { DatablockDetailComponent } from './datablock-detail/datablock-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { TextMaskModule } from 'angular2-text-mask';
import { DatablockAddDialogComponent } from './datablock-add-dialog/datablock-add-dialog.component';
import {  MatDialogModule } from '@angular/material/dialog';
import {  MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    DatablocksComponent,
    DatablockDetailComponent,
    MessagesComponent,
    DatablockAddDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TextMaskModule,
    MatDialogModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[DatablockAddDialogComponent]
})
export class AppModule { }
