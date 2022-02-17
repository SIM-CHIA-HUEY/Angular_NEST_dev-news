import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManagementBlockComponent } from './users-management-block.component';

describe('UsersManagementBlockComponent', () => {
    let component: UsersManagementBlockComponent;
    let fixture: ComponentFixture<UsersManagementBlockComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UsersManagementBlockComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersManagementBlockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});