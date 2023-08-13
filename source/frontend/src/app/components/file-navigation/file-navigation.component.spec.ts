import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileNavigationComponent } from './file-navigation.component';

describe('FileNavigationComponent', () => {
  let component: FileNavigationComponent;
  let fixture: ComponentFixture<FileNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
