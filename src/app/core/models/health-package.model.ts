export interface HealthPackage {
  id: number;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  discountPercentage: number;
  duration: string;
  products: PackageProduct[];
  savings: number;
  imageUrl: string;
  isActive: boolean;
  features: string[];
}

export interface PackageProduct {
  productId: number;
  productName: string;
  quantity: number;
  regularPrice: number;
}

export interface UserSubscription {
  id: number;
  packageId: number;
  packageName: string;
  deliveryInterval: string;
  nextDeliveryDate: Date;
  status: string;
  startDate: Date;
}