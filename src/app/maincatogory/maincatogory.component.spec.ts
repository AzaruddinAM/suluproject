import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaincatogoryComponent } from './maincatogory.component';

describe('MaincatogoryComponent', () => {
  let component: MaincatogoryComponent;
  let fixture: ComponentFixture<MaincatogoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaincatogoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaincatogoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
