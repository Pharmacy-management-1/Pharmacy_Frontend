export interface Prescription {
  id: number;
  userId: number;
  userName?: string;
  imageUrl: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  uploadedAt: Date;
  reviewedAt?: Date;
  rejectionReason?: string;
}