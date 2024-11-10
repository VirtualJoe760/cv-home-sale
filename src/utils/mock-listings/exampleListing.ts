import { PropertyListing } from "@/types/propertyListing";

export const exampleListing: PropertyListing[] = [
    {
        id: "1",
        address: {
            street: "123 Main St",
            unit: "",
            city: "cathedral-city",
            state: "CA",
            zip: "92211"
        },
        price: 500000,
        details: {
            type: "Single Family",
            bedrooms: 3,
            bathrooms: { full: 2, threeQuarter: 0, half: 1 },
            squareFeet: 2000,
            yearBuilt: 1985,
            levels: "Single",
            furnished: false
        },
        hoa: {
            fee: 300,
            includes: ["Trash", "Water"],
            amenities: ["Pool", "Clubhouse"]
        },
        features: {
            parking: {
                carportSpaces: 0,
                garageSpaces: 2,
                coveredSpaces: 2,
                totalSpaces: 2
            },
            pool: {
                hasPool: true,
                features: ["Heated", "Saltwater"],
                location: "Community"
            },
            view: "Mountain",
            gatedCommunity: true
        },
        appliances: ["Refrigerator", "Dishwasher", "Microwave"],
        utilities: {
            cooling: ["Central"],
            heating: ["Forced Air"],
            waterHeater: "Gas",
            laundry: "Inside"
        },
        additionalInfo: {
            shortTermRentalsAllowed: true,
            seniorCommunity: false,
            landType: "Fee",
            tax: { melloRoos: false }
        },
        description: "Beautiful property in cathedral-city with mountain views.",
        listingInfo: {
            listPricePerSqFt: 250,
            originalListPrice: 525000,
            listingDate: new Date("2024-01-15"),
            terms: ["Cash", "Conventional"],
            possession: "Close Of Escrow"
        },
        contactInfo: {
            agentName: "Jane Doe",
            agentEmail: "jane.doe@realestate.com",
            agentPhone: "555-123-4567"
        }
    }
];
