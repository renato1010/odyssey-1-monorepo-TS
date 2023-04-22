import { locations } from "./locations_data.json";

type Locations = typeof locations;
type Location = Locations[number];

class LocationsAPI {
  getAllLocations() {
    return locations;
  }

  getLocation(id: Location["id"]) {
    return locations.find((l) => l.id === id);
  }
}

export { LocationsAPI };
