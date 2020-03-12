import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatablocksComponent } from './datablocks.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

describe('DatablocksComponent', () => {
  let component: DatablocksComponent;
  let fixture: ComponentFixture<DatablocksComponent>;

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
      declarations: [ DatablocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatablocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
