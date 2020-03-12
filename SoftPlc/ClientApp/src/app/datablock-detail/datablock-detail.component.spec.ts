import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { DatablockDetailComponent } from './datablock-detail.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DatablockAddDialogComponent } from '../datablock-add-dialog/datablock-add-dialog.component';

describe('DatablockDetailComponent', () => {
  let component: DatablockDetailComponent;
  let fixture: ComponentFixture<DatablockDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[    BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        TextMaskModule,
        MatDialogModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatIconModule],
      declarations: [ DatablockDetailComponent ],
      providers: [	{ provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatablockDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
