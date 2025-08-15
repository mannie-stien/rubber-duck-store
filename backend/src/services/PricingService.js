class PricingService {
  calculateTotal(order, packageDetails) {
    // The "context" object that will be passed through the chain.
    let costContext = {
      baseCost: order.quantity * order.price,
      finalCost: 0,
      increments: [],
      discounts: [],
    };

    // --- The Chain of Responsibility ---
    // Each function takes the context, modifies it, and the next function uses the result.
    costContext = this._applyBaseCost(costContext);
    costContext = this._applyVolumeDiscount(costContext, order.quantity);
    costContext = this._applyPackageMaterialCost(costContext, packageDetails.packageType);
    costContext = this._applyCountryTax(costContext, order.destinationCountry);
    costContext = this._applyShippingFee(costContext, order);
    
    // Format the final output
    return {
        totalToPay: parseFloat(costContext.finalCost.toFixed(2)),
        details: {
            increments: costContext.increments,
            discounts: costContext.discounts
        }
    };
  }

  _applyBaseCost(context) {
    context.finalCost = context.baseCost;
    return context;
  }


    // Rule ii: 20% discount for orders over 100 units.
  _applyVolumeDiscount(context, quantity) {
    if (quantity > 100) {
      const discountAmount = context.finalCost * 0.20;
      context.discounts.push({ reason: 'Volume Discount (20%)', amount: -discountAmount });
      context.finalCost -= discountAmount;
    }
    return context;
  }

    // Rule iii, iv, v
  _applyPackageMaterialCost(context, packageType) {
    if (packageType === 'wood') {
      const incrementAmount = context.finalCost * 0.05;
      context.increments.push({ reason: 'Wood Package Surcharge (5%)', amount: incrementAmount });
      context.finalCost += incrementAmount;
    } else if (packageType === 'plastic') {
      const incrementAmount = context.finalCost * 0.10;
      context.increments.push({ reason: 'Plastic Package Surcharge (10%)', amount: incrementAmount });
      context.finalCost += incrementAmount;
    } else if (packageType === 'cardboard') {
      const discountAmount = context.finalCost * 0.01;
      context.discounts.push({ reason: 'Cardboard Package Discount (1%)', amount: -discountAmount });
      context.finalCost -= discountAmount;
    }
    return context;
  }


    // Rule vi, vii, viii, ix
  _applyCountryTax(context, country) {
    let taxRate = 0.15; // Default tax
    if (country.toLowerCase() === 'usa') taxRate = 0.18;
    if (country.toLowerCase() === 'bolivia') taxRate = 0.13;
    if (country.toLowerCase() === 'india') taxRate = 0.19;

    const taxAmount = context.finalCost * taxRate;
    context.increments.push({ reason: `Destination Tax (${taxRate * 100}%)`, amount: taxAmount });
    context.finalCost += taxAmount;
    return context;
  }

    // Rule x, xi, xii
  _applyShippingFee(context, order) {
    let shippingFee = 0;
    let reason = '';

    if (order.shippingMode === 'Sea') {
      shippingFee = 400;
      reason = 'Sea Shipping Flat Fee';
    } else if (order.shippingMode === 'Land') {
      shippingFee = 10 * order.quantity;
      reason = 'Land Shipping Fee';
    } else if (order.shippingMode === 'Air') {
      shippingFee = 30 * order.quantity;
      reason = 'Air Shipping Fee';
      // Apply discount if order exceeds 1000 units
      if (order.quantity > 1000) {
          const discount = shippingFee * 0.15;
          shippingFee -= discount;
          context.discounts.push({ reason: 'High-Volume Air Shipping Discount (15%)', amount: -discount });
      }
    }
    
    context.increments.push({ reason: reason, amount: shippingFee });
    context.finalCost += shippingFee;
    return context;
  }
}

module.exports = new PricingService();