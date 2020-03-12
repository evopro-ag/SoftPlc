import { TestBed } from '@angular/core/testing';

import { DatablockService } from './datablock.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

describe('DatablockService', () => {
  let service: DatablockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
      ]
    });
    service = TestBed.inject(DatablockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
