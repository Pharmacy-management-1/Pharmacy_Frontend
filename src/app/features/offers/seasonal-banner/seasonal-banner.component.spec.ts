import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonalBannerComponent } from './seasonal-banner.component';

describe('SeasonalBannerComponent', () => {
  let component: SeasonalBannerComponent;
  let fixture: ComponentFixture<SeasonalBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeasonalBannerComponent]
    });
    fixture = TestBed.createComponent(SeasonalBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
