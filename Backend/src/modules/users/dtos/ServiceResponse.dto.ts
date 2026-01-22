export interface BookingDto {
    id: string;
    startDate: Date | string;
    endDate: Date | string;
    userId: string;
    serviceId: string;
    createdAt: Date | string;
}

export interface ServiceResponseDto {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    location: string;
    availability: boolean;
    availableFrom?: Date | string;
    availableTo?: Date | string;
    contactDetails: string;
    bookings?: BookingDto[];
}
