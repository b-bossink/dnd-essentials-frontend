import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsGenerationComponent } from './stats-generation.component';

describe('StatsGenerationComponent', () => {
  let component: StatsGenerationComponent;
  let fixture: ComponentFixture<StatsGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsGenerationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
