export interface Offer {
  id: number;
  title: string;
  description: string;
  discountPercentage: number;
  validFrom: Date;
  validTo: Date;
  isActive: boolean;
  imageUrl?: string;
}