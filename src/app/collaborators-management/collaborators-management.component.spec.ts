import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsManagementComponent } from './collaborators-management.component';

describe('CollaboratorsManagementComponent', () => {
  let component: CollaboratorsManagementComponent;
  let fixture: ComponentFixture<CollaboratorsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboratorsManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
