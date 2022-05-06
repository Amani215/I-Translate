import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynonymCardComponent } from './synonym-card.component';

describe('SynonymCardComponent', () => {
  let component: SynonymCardComponent;
  let fixture: ComponentFixture<SynonymCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynonymCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynonymCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
