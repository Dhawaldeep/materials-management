import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduceMaterialsComponent } from './produce-materials.component';

describe('ProduceMaterialsComponent', () => {
  let component: ProduceMaterialsComponent;
  let fixture: ComponentFixture<ProduceMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduceMaterialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduceMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
