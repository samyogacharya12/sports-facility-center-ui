import { TimeSlot } from './time-slot.model';

export class Facility {
  id?: number;
  facilityName?: string;
  description?: string;
  capacity?: number;
  openingTime?: string;
  closingTime?: string;
  imageUrl?: string;
  timeSlots?: TimeSlot[];
}