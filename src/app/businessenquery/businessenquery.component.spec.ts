import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessenqueryComponent } from './businessenquery.component';

describe('BusinessenqueryComponent', () => {
  let component: BusinessenqueryComponent;
  let fixture: ComponentFixture<BusinessenqueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessenqueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessenqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
