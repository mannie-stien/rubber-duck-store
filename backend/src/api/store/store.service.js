const Duck = require('../../models/duck.model');
const PackagingService = require('../../services/PackagingService');
const PricingService = require('../../services/PricingService');

class StoreService {
  async processOrder(orderData) {
    const { color, size, quantity, destinationCountry, shippingMode } = orderData;

    // 1. Find the duck in the database to get its price
    const duck = await Duck.findOne({
      color,
      size,
      deleted: false,
    });

    if (!duck) {
      throw new Error(`Duck with specified color (${color}) and size (${size}) not found.`);
    }

    if (duck.quantity < quantity) {
      throw new Error(`Not enough stock. Available: ${duck.quantity}, Requested: ${quantity}`);
    }

    const fullOrderDetails = {
      ...orderData,
      price: duck.price,
    };
    
    // 2. Delegating logic to their respective service
    const packaging = PackagingService.determinePackaging(fullOrderDetails);
    const pricing = PricingService.calculateTotal(fullOrderDetails, packaging);

    // 4. Assembling the final, detailed responses
    const finalResponse = {
      packageType: packaging.packageType,
      protectionType: packaging.protectionType,
      totalToPay: pricing.totalToPay,
      details: {
        discounts: pricing.details.discounts,
        increments: pricing.details.increments,
      },
    };

    return finalResponse;
  }
}

module.exports = new StoreService();