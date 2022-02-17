import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewArticleComponent } from './create-new-article.component';

describe('CreateNewArticleComponent', () => {
  let component: CreateNewArticleComponent;
  let fixture: ComponentFixture<CreateNewArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
