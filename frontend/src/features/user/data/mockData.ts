export const CATEGORIES = ["All", "Venue", "Catering", "Photography", "Music", "Decor"];

export const SERVICES = [
    {
        id: "1",
        name: "Grand Ballroom Strategy",
        category: "Venue",
        description: "A luxurious ballroom perfect for grand weddings and corporate galas. Features crystal chandeliers and a spacious dance floor.",
        price: 5000,
        location: "Downtown City Center",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800",
        capacity: "500 Guests",
        availableDates: ["2024-10-20", "2024-10-25"]
    },
    {
        id: "2",
        name: "Gourmet Delights Catering",
        category: "Catering",
        description: "Exquisite culinary experiences tailored to your event. Offering a wide range of international cuisines.",
        price: 1500,
        location: "Metro Area",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
        capacity: "Unlimited",
        availableDates: ["2024-10-22", "2024-11-01"]
    },
    {
        id: "3",
        name: "Luminous Photography",
        category: "Photography",
        description: "Capturing your most precious moments with artistic flair. specialized in candid and portrait photography.",
        price: 800,
        location: "Clifton Hill",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
        capacity: "1 Event/Day",
        availableDates: ["2024-10-15", "2024-10-30"]
    },
    {
        id: "4",
        name: "Sunset Garden",
        category: "Venue",
        description: "An open-air garden venue with breathtaking sunset views. Ideal for intimate gatherings and outdoor parties.",
        price: 3000,
        location: "Westside Bay",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af0bc3?auto=format&fit=crop&q=80&w=800",
        capacity: "200 Guests",
        availableDates: ["2024-11-05", "2024-11-12"]
    },
    {
        id: "5",
        name: "Harmony Jazz Band",
        category: "Music",
        description: "Live jazz band to elevate the atmosphere of your event. Smooth tunes and classic hits.",
        price: 1200,
        location: "Citywide",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
        capacity: "N/A",
        availableDates: ["2024-10-28", "2024-11-15"]
    },
    {
        id: "6",
        name: "Elegant Decorators",
        category: "Decor",
        description: "Transforming spaces into magical environments. Custom themes, floral arrangements, and lighting.",
        price: 2000,
        location: "North District",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&q=80&w=800",
        capacity: "N/A",
        availableDates: ["2024-10-21", "2024-11-08"]
    }
];

export const MOCK_BOOKINGS = [
    {
        id: "b1",
        serviceName: "Grand Ballroom Strategy",
        date: "2024-09-15",
        status: "completed",
        price: 5000,
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=100"
    },
    {
        id: "b2",
        serviceName: "Luminous Photography",
        date: "2024-11-20",
        status: "confirmed",
        price: 800,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=100"
    },
    {
        id: "b3",
        serviceName: "Gourmet Delights Catering",
        date: "2024-12-05",
        status: "pending",
        price: 1500,
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=100"
    }
];

export type Service = typeof SERVICES[0];
export type Booking = typeof MOCK_BOOKINGS[0];
