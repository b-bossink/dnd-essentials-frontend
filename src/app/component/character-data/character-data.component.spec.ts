import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDataComponent } from './character-data.component';

describe('CharacterDataComponent', () => {
  let component: CharacterDataComponent;
  let fixture: ComponentFixture<CharacterDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
