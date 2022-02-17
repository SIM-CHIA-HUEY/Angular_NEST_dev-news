import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionGitHubComponent } from './connection-git-hub.component';

describe('ConnectionGitHubComponent', () => {
  let component: ConnectionGitHubComponent;
  let fixture: ComponentFixture<ConnectionGitHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionGitHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionGitHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
