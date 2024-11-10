# Define the cities array with lowercase and hyphenated names
$cities = @("palm-springs", "palm-desert", "la-quinta", "rancho-mirage", "indio", "cathedral-city", "desert-hot-springs", "coachella", "bermuda-dunes", "thousand-palms")

# Create a folder for each city in the current directory
foreach ($city in $cities) {
    New-Item -Path $city -ItemType Directory -Force
}

Write-Output "All city folders have been created!"
