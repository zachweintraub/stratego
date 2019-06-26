import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraveyardRedComponent } from './graveyard-red.component';

describe('GraveyardRedComponent', () => {
  let component: GraveyardRedComponent;
  let fixture: ComponentFixture<GraveyardRedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraveyardRedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraveyardRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
