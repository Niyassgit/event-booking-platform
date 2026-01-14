export interface LoginPayload {
  email: string;
  password: string;
}

export interface signupPayLoad {
  email: string;
  name: string;
  password: string;
  cpassword: string;
  role: string;
}

export interface Service {
  id: string;
  title: string;
  category: "venue" | "caterer" | "dj" | "photographer" | "decoration";
  pricePerDay: number;
  description: string;
  location: string;
  availableFrom: string;
  availableTo: string;
}

export interface Booking {
  id: string;
  serviceTitle: string;
  userName: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled";
}
