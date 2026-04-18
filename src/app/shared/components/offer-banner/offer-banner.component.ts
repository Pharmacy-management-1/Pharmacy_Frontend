import { Component, OnInit, OnDestroy } from '@angular/core';
import { OfferService, SeasonalOffer } from '../../../core/services/offer.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-banner',
  templateUrl: './offer-banner.component.html',
  styleUrls: ['./offer-banner.component.css']
})
export class OfferBannerComponent implements OnInit, OnDestroy {
  offers: SeasonalOffer[] = [];
  currentOfferIndex = 0;
  private autoSlideSubscription?: Subscription;

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.loadOffers();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    if (this.autoSlideSubscription) {
      this.autoSlideSubscription.unsubscribe();
    }
  }

  loadOffers(): void {
    this.offerService.getActiveOffers().subscribe({
      next: (offers) => {
        this.offers = offers.filter(offer => offer.isActive);
      },
      error: (error) => {
        console.error('Failed to load offers', error);
      }
    });
  }

  startAutoSlide(): void {
    this.autoSlideSubscription = interval(5000).subscribe(() => {
      this.nextSlide();
    });
  }

  nextSlide(): void {
    if (this.offers.length > 0) {
      this.currentOfferIndex = (this.currentOfferIndex + 1) % this.offers.length;
    }
  }

  prevSlide(): void {
    if (this.offers.length > 0) {
      this.currentOfferIndex = (this.currentOfferIndex - 1 + this.offers.length) % this.offers.length;
    }
  }

  goToSlide(index: number): void {
    this.currentOfferIndex = index;
  }

  copyOfferCode(code: string): void {
    navigator.clipboard.writeText(code).then(() => {
      // You can add a toast notification here
      console.log('Code copied:', code);
    });
  }

  applyOffer(offer: SeasonalOffer): void {
    // Apply offer to cart
    this.offerService.applyOfferToCart(offer.code).subscribe({
      next: (response) => {
        // Show success message
        console.log('Offer applied successfully');
      },
      error: (error) => {
        console.error('Failed to apply offer', error);
      }
    });
  }
}