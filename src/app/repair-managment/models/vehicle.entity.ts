export class Vehicle {
  public vehicleId: number;
  public license_plate: string;
  public brand: string;
  public model: string;
  public year: number;
  public fuel_type: string;

  constructor(
    vehicleId: number,
    license_plate: string,
    brand: string,
    model: string,
    year: number,
    fuel_type: string
  ) {
    if (vehicleId <= 0) throw new Error("Vehicle ID must be a positive number.");
    if (!license_plate || !/^[A-Z0-9-]{5,8}$/i.test(license_plate))
      throw new Error("License plate format is invalid.");
    if (!brand.trim()) throw new Error("Brand cannot be empty.");
    if (!model.trim()) throw new Error("Model cannot be empty.");
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear + 1)
      throw new Error(`Year must be between 1900 and ${currentYear + 1}.`);
    if (!fuel_type.trim()) throw new Error("Fuel type cannot be empty.");

    this.vehicleId = vehicleId;
    this.license_plate = license_plate;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.fuel_type = fuel_type;
  }
}
