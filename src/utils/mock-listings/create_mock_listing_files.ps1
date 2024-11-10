# Define the list of cities with camel-cased file names
$cityNames = @("palmDesert", "laQuinta", "ranchoMirage", "indio", "cathedralCity", "desertHotSprings", "coachella", "bermudaDunes", "thousandPalms")

# Function to generate a unique ID
function generateUniqueId {
    return [guid]::NewGuid().ToString()
}

# Master file content to import all listings
$masterFilePath = ".\mockListings.ts"
$importStatements = ""
$listingsArray = "export const mockListings = ["

foreach ($city in $cityNames) {
    $importStatements += "import { ${city}Listings } from './${city}Listings';`n"
    $listingsArray += "`n`t...${city}Listings,"
}

$listingsArray += "`n];"
$masterFileContent = @"
import { PropertyListing } from "@/types/propertyListing";
$importStatements
$listingsArray
"@
Set-Content -Path $masterFilePath -Value $masterFileContent

# Create individual city listing files with camel-cased file names
foreach ($city in $cityNames) {
    $filePath = ".\${city}Listings.ts"
    $listings = "import { PropertyListing } from '@/types/propertyListing';`n`nexport const ${city}Listings: PropertyListing[] = [`n"
    
    for ($i = 0; $i -lt 6; $i++) {
        # Generate a unique ID for each listing
        $uniqueId = generateUniqueId
        # Randomize listing status
        $status = if ($i -lt 3) { "Active" } elseif ($i -lt 5) { "Closed" } else { "Pending" }
        
        $listings += @"
    {
        id: "$uniqueId",
        address: {
            street: "123 Main St",
            unit: "",
            city: "$city",
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
        description: "Beautiful property in $city with mountain views.",
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
    },
"@
    }

    $listings += "];"
    Set-Content -Path $filePath -Value $listings
}

Write-Output "All files have been created in the current 'mock-listings' folder with camel-cased names and randomized data."
