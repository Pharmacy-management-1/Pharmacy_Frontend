import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickReorderComponent } from './quick-reorder.component';

describe('QuickReorderComponent', () => {
  let component: QuickReorderComponent;
  let fixture: ComponentFixture<QuickReorderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickReorderComponent]
    });
    fixture = TestBed.createComponent(QuickReorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
