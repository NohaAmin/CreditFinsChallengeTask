import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMoviePageComponent } from './single-movie-page.component';

describe('SingleMoviePageComponent', () => {
  let component: SingleMoviePageComponent;
  let fixture: ComponentFixture<SingleMoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMoviePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
