import { api } from "../../../services/api";
import type { BookingResponseDto, Service } from "../types";

const CATEGORY_IMAGES: Record<string, string> = {
  venue:
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1198&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  caterer:
    "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop",
  photographer:
    "https://images.unsplash.com/photo-1614196826634-1d6f9dedcddf?q=80&w=1169&auto=format&fit=crop",
  dj: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1170&auto=format&fit=crop",
  decoration:
    "https://plus.unsplash.com/premium_photo-1664790560155-eeef67a1e77c?q=80&w=687&auto=format&fit=crop",

  // Fallbacks just in case
  catering:
    "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop",
  photography:
    "https://images.unsplash.com/photo-1614196826634-1d6f9dedcddf?q=80&w=1169&auto=format&fit=crop",
  music:
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1170&auto=format&fit=crop",
  decor:
    "https://plus.unsplash.com/premium_photo-1664790560155-eeef67a1e77c?q=80&w=687&auto=format&fit=crop",

  default:
    "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
};

const getCategoryImage = (category: string): string => {
  return CATEGORY_IMAGES[category?.toLowerCase()] || CATEGORY_IMAGES["default"];
};

export const fetchServices = async (
  filters: Record<string, unknown>,
): Promise<{ services: Service[]; maxPrice: number }> => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== "All") params.append(key, String(value));
  });

  const response = await api.get(`/user/services?${params.toString()}`);
  const { data, metadata } = response.data;

  const services = data.map(
    (s: {
      id: string;
      title: string;
      category: string;
      description: string;
      price: number;
      location: string;
      availableFrom?: string;
      availableTo?: string;
      bookedDates?: string[];
    }) => ({
      id: s.id,
      name: s.title,
      category: s.category,
      description: s.description,
      price: s.price,
      location: s.location,
      rating: 4.8,
      image: getCategoryImage(s.category),
      capacity: "Varies",
      availableDates: [],
      availableFrom: s.availableFrom,
      availableTo: s.availableTo,
      bookedDates: (s.bookedDates || []).map(
        (d: string) => new Date(d).toISOString().split("T")[0],
      ),
    }),
  );

  return { services, maxPrice: metadata?.maxPrice || 100000 };
};

const getDatesInRange = (startDate: Date, endDate: Date): string[] => {
  const dates: string[] = [];
  const current = new Date(startDate);
  const end = new Date(endDate);
  while (current <= end) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

export const fetchServiceById = async (serviceId: string): Promise<Service> => {
  const response = await api.get(`/user/service/${serviceId}`);
  const s = response.data.data;


  const bookedDates = (s.bookings || []).flatMap((b: any) => {
    if (b.startDate && b.endDate) {
      return getDatesInRange(new Date(b.startDate), new Date(b.endDate));
    }
    return [];
  });

  const formatDate = (date: string | Date | undefined): string | undefined => {
    if (!date) return undefined;
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toISOString().split('T')[0];
  };

  return {
    id: s.id,
    name: s.title,
    category: s.category,
    description: s.description,
    price: s.price ?? s.pricePerDay ?? 0,
    location: s.location,
    rating: 4.8,
    image: getCategoryImage(s.category),
    capacity: "Varies",
    availableDates: [],
    availableFrom: formatDate(s.availableFrom),
    availableTo: formatDate(s.availableTo),
    bookedDates: bookedDates.map((d: string) => d.split('T')[0]),
  };
};

export const fetchUserBookings = async (): Promise<BookingResponseDto[]> => {
  const response = await api.get("/user/bookings");
  const raw = response?.data;
  const rawData = raw?.data ?? raw;
  const bookings: any[] = Array.isArray(rawData)
    ? rawData
    : Array.isArray(rawData?.bookings)
      ? rawData.bookings
      : [];

  return bookings.map((booking: any) => {
    const service = booking?.service ?? booking?.serviceId ?? booking?.serviceDetails;

    const dateValue =
      booking?.startDate ??
      booking?.date ??
      booking?.bookingDate ??
      booking?.createdAt ??
      "";

    return {
      id: String(booking?.id ?? booking?._id ?? ""),
      userId: String(booking?.userId ?? booking?.user?._id ?? booking?.user ?? ""),
      date: dateValue ? new Date(dateValue).toISOString().split('T')[0] : "",
      status: String(booking?.status ?? ""),
      service: service
        ? {
          id: String(service?.id ?? service?._id ?? ""),
          title: String(service?.title ?? service?.name ?? ""),
          description: String(service?.description ?? ""),
          category: String(service?.category ?? ""),
          price: Number(service?.price ?? service?.pricePerDay ?? 0),
          location: String(service?.location ?? ""),
          availability: Boolean(service?.availability ?? service?.isAvailable ?? true),
          image: getCategoryImage(String(service?.category ?? "default")),
        }
        : undefined,
    };
  });
};

export const createBooking = async (
  serviceId: string,
  date: string,
): Promise<void> => {
  await api.post(`/user/service/${serviceId}`, { date });
};
