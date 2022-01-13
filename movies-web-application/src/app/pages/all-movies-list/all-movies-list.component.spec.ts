import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMoviesListComponent } from './all-movies-list.component';

describe('AllMoviesListComponent', () => {
  let component: AllMoviesListComponent;
  let fixture: ComponentFixture<AllMoviesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMoviesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
