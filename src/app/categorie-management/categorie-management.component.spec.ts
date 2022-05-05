import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieManagementComponent } from './categorie-management.component';

describe('CategorieManagementComponent', () => {
  let component: CategorieManagementComponent;
  let fixture: ComponentFixture<CategorieManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
