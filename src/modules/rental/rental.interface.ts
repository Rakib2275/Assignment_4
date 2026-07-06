export interface ICreateRentalRequest {
  propertyId: string;
  message: string;
  moveInDate: Date;
  durationMonth: number;
  totalAmount: number;
}