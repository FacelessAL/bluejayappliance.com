---
description: How to write unique geo-specific city/service combo page content
---

# Writing City/Service Page Content

Each city/service combo page (e.g., `/naperville-il-appliance-repair/dishwasher-repair`) needs unique, geo-specific content that is NOT doorway-style. Every page must feel like it was written specifically for that city + service combination.

## Content Structure

Each entry in `src/data/service-locations.json` should include these fields:

```json
{
  "published": true,
  "localParagraph": "2-3 sentences about this specific service in this specific city. Reference the city name, local context, and Blue Jay's commitment to this area.",
  "localInsights": "2-3 sentences about local factors that affect this appliance type in this city. Reference housing stock, water quality, climate, neighborhoods, or local lifestyle factors.",
  "repairTips": "2-3 practical sentences giving homeowners in this city advice about maintaining this appliance type. Reference local conditions where relevant.",
  "neighborhoodsCovered": ["Neighborhood 1", "Neighborhood 2", "Neighborhood 3", "Neighborhood 4", "Neighborhood 5", "Neighborhood 6"]
}
```

## Writing Guidelines

1. **No doorway content** — Each page must be genuinely unique. Do not use templates with city name swapped in. Write each paragraph from scratch with different angles, different sentences, different structure.

2. **Geo-specific references** — Every page should reference real aspects of the city:
   - Real neighborhood names
   - Housing characteristics (e.g., "historic homes in downtown Naperville", "newer developments in Aurora's far east side")
   - Local water conditions (hard water is common in DuPage/Will County IL)
   - Climate factors (harsh IL winters affecting appliances, summer humidity)
   - Population/demographic context where relevant

3. **Service-specific depth** — Tie the appliance type to local factors:
   - Dishwashers: hard water mineral buildup, older plumbing in certain neighborhoods
   - Dryers: lint buildup risks in older homes, gas vs electric preferences by area
   - Washers: high-efficiency models in newer developments, older top-loaders in established neighborhoods
   - Refrigerators: power fluctuations, humidity effects on seals
   - Stoves/Ovens: gas vs electric prevalence by neighborhood, older gas lines
   - Ranges: similar to stoves with cooking-culture angle
   - Garbage disposals: older plumbing compatibility, hard water effects on components

4. **Tone** — Professional, helpful, locally knowledgeable. Write like a technician who lives in the area and knows the community. No salesy fluff.

5. **No duplicate phrases across pages** — Track what you've written. If you used "our experienced technicians" on one page, use different phrasing on the next.

## Process (One Page at a Time)

1. Pick the next city/service combination to write
2. Research/recall real neighborhood names and local characteristics for that city
3. Write all 4 content fields (localParagraph, localInsights, repairTips, neighborhoodsCovered)
4. Update the entry in `src/data/service-locations.json`
5. Move to the next page
6. After completing all 7 services for a city, build and verify, then commit

## City Order

Write all 7 services for each city before moving to the next:
1. Naperville (primary market)
2. Aurora
3. Joliet
4. Plainfield
5. Lisle
6. Darien
7. Addison
8. Lombard
9. Roselle
10. Wheaton
11. Elmhurst
12. Hinsdale
13. Oak Brook
14. Woodridge
15. Glen Ellyn
16. Bolingbrook
17. Willowbrook
18. Bloomingdale
19. Downers Grove
20. Glendale Heights
21. Elk Grove Village

## Service Order (per city)

1. dishwasher-repair
2. dryer-repair
3. washer-repair
4. refrigerator-and-freezer-repair
5. stove-and-oven-repair
6. range-repair
7. garbage-disposal-repair-and-installation
