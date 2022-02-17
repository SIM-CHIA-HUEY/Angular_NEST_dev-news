import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallCardArticlesComponent } from './small-card-articles.component';

describe('SmallCardArticlesComponent', () => {
  let component: SmallCardArticlesComponent;
  let fixture: ComponentFixture<SmallCardArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallCardArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallCardArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
