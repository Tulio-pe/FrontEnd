
export class Vehicle {
    private _vehicleId: number;

  /**
   * @private
   * @type {string}
   * @description Vehicle's license plate (e.g., ABC-123).
   */
  private _license_plate: string;

  /**
   * @private
   * @type {string}
   * @description Vehicle brand (e.g., Toyota, Ford).
   */
  private _brand: string;

  /**
   * @private
   * @type {string}
   * @description Vehicle model (e.g., Corolla, Mustang).
   */
  private _model: string;

  /**
   * @private
   * @type {number}
   * @description Manufacturing year of the vehicle.
   */
  private _year: number;

  /**
   * @private
   * @type {string}
   * @description Fuel type (e.g., gasoline, diesel, electric).
   */
  private _fuel_type: string;

  /**
   * Creates a new Vehicle instance.
   * @param {number} vehicleId - The unique ID of the vehicle (must be positive).
   * @param {string} license_plate - The vehicle's license plate.
   * @param {string} brand - The brand of the vehicle.
   * @param {string} model - The model of the vehicle.
   * @param {number} year - The vehicle's manufacturing year.
   * @param {string} fuel_type - The type of fuel the vehicle uses.
   * @throws {Error} If any of the provided values are invalid.
   */
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

    this._vehicleId = vehicleId;
    this._license_plate = license_plate;
    this._brand = brand;
    this._model = model;
    this._year = year;
    this._fuel_type = fuel_type;
  }

  /** @returns {number} The unique vehicle ID. */
  public get vehicleId(): number {
    return this._vehicleId;
  }

  /** @returns {string} The vehicle's license plate. */
  public get license_plate(): string {
    return this._license_plate;
  }

  /** @returns {string} The vehicle's brand. */
  public get brand(): string {
    return this._brand;
  }

  /** @returns {string} The vehicle's model. */
  public get model(): string {
    return this._model;
  }

  /** @returns {number} The vehicle's year. */
  public get year(): number {
    return this._year;
  }

  /** @returns {string} The fuel type used by the vehicle. */
  public get fuel_type(): string {
    return this._fuel_type;
  }
}
