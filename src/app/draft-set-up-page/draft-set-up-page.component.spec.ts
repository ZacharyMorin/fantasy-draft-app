import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftSetUpPageComponent } from './draft-set-up-page.component';

describe('DraftSetUpPageComponent', () => {
  let component: DraftSetUpPageComponent;
  let fixture: ComponentFixture<DraftSetUpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftSetUpPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DraftSetUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
