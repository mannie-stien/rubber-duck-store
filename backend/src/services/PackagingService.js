class PackagingService {
  determinePackaging(order) {
    switch (order.shippingMode) {
      case "Air":
        return this._getAirPackaging(order.size);
      case "Sea":
        return this._getSeaPackaging(order.size);
      case "Land":
        return this._getLandPackaging(order.size);
      default:
        throw new Error("Invalid shipping mode specified.");
    }
  }

  // Rule vi: Fill with polystyrene balls for any land package.
  _getLandPackaging(size) {
    const packageType = this._getPackageTypeForSize(size);
    const protectionType = ["polystyrene balls"];
    return { packageType, protectionType };
  }
  
  // Rule vii: Fill with moisture-absorbing beads and bubble wrap bags for any sea package.
  _getSeaPackaging(size) {
    const packageType = this._getPackageTypeForSize(size);
    const protectionType = ["moisture-absorbing beads", "bubble wrap bags"];
    return { packageType, protectionType };
  }


  // Rule iv & v
  _getAirPackaging(size) {
    const packageType = this._getPackageTypeForSize(size);
    const protectionMap = {
      wood: ["polystyrene balls"],
      cardboard: ["polystyrene balls"],
      plastic: ["bubble wrap bags"],
    };
    const protectionType = protectionMap[packageType];
    if (!protectionType) {
      throw new Error(
        `No protection type defined for package type: ${packageType}`
      );
    }
    return { packageType, protectionType };
  }

  // Rule i, ii, iii
  _getPackageTypeForSize(size) {
    const sizeToPackageMap = {
      XLarge: "wood",
      Large: "wood",
      Medium: "cardboard",
      Small: "plastic",
      XSmall: "plastic",
    };

    const packageType = sizeToPackageMap[size];
    if (!packageType) {
      throw new Error("Invalid duck size specified.");
    }

    return packageType;
  }
}

module.exports = new PackagingService();
