class PackagingService {
  /**
   * @param {object} order 
   * @returns {{packageType: string, protectionType: string[]}}
   */
  determinePackaging(order) {
    switch (order.shippingMode) {
      case 'Air':
        return this._getAirPackaging(order.size);
      case 'Sea':
        return this._getSeaPackaging(order.size);
      case 'Land':
        return this._getLandPackaging(order.size);
      default:
        throw new Error('Invalid shipping mode specified.');
    }
  }

  _getLandPackaging(size) {
    const packageType = this._getPackageTypeForSize(size);
    // Rule vi: Fill with polystyrene balls for any land package.
    const protectionType = ['polystyrene balls'];
    return { packageType, protectionType };
  }

  _getSeaPackaging(size) {
    const packageType = this._getPackageTypeForSize(size);
    // Rule vii: Fill with moisture-absorbing beads and bubble wrap bags for any sea package.
    const protectionType = ['moisture-absorbing beads', 'bubble wrap bags'];
    return { packageType, protectionType };
  }

  _getAirPackaging(size) {
    const packageType = this._getPackageTypeForSize(size);
    let protectionType = [];

    // Rule iv & v
    if (packageType === 'wood' || packageType === 'cardboard') {
      protectionType.push('polystyrene balls');
    } else if (packageType === 'plastic') {
      protectionType.push('bubble wrap bags');
    }
    return { packageType, protectionType };
  }

  _getPackageTypeForSize(size) {
    // Rule i, ii, iii
    if (size === 'XLarge' || size === 'Large') {
      return 'wood';
    } else if (size === 'Medium') {
      return 'cardboard';
    } else if (size === 'Small' || size === 'XSmall') {
      return 'plastic';
    }
    throw new Error('Invalid duck size specified.');
  }
}

module.exports = new PackagingService();