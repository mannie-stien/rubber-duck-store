class PackagingService {
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

// Rule vi: Fill with polystyrene balls for any land package.
  _getLandPackaging(size) {
    const packageType = this._getPackageTypeForSize(size);
    const protectionType = ['polystyrene balls'];
    return { packageType, protectionType };
  }
// Rule vii: Fill with moisture-absorbing beads and bubble wrap bags for any sea package.
  _getSeaPackaging(size) {
    const packageType = this._getPackageTypeForSize(size);
    const protectionType = ['moisture-absorbing beads', 'bubble wrap bags'];
    return { packageType, protectionType };
  }    
  // Rule iv & v
  _getAirPackaging(size) {
    const packageType = this._getPackageTypeForSize(size);
    let protectionType = [];
    if (packageType === 'wood' || packageType === 'cardboard') {
      protectionType.push('polystyrene balls');
    } else if (packageType === 'plastic') {
      protectionType.push('bubble wrap bags');
    }
    return { packageType, protectionType };
  }

// Rule i, ii, iii
  _getPackageTypeForSize(size) {
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