export interface SeasonalOffer {
  id: number;
  title: string;
  description: string;
  discountPercentage: number;
  code: string;
  validFrom: Date;
  validTo: Date;
  applicableOn: 'all' | 'category' | 'specific';
  minOrderAmount?: number;
  maxDiscount?: number;
  imageUrl: string;
  isActive: boolean;
}