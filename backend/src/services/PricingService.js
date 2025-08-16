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
        discounts: costContext.discounts,
      },
    };
  }

  _applyBaseCost(context) {
    context.finalCost = context.baseCost;
    return context;
  }

  // Rule ii: 20% discount for orders over 100 units.
  _applyVolumeDiscount(context, quantity) {
    if (quantity > 100) {
      const discountAmount = context.finalCost * 0.2;
      context.discounts.push({
        reason: "Volume Discount (20%)",
        amount: -discountAmount,
      });
      context.finalCost -= discountAmount;
    }
    return context;
  }

  // Rule iii, iv, v
  _applyPackageMaterialCost(context, packageType) {
    const materialCostStrategies = {
      wood: {
        type: "increment",
        rate: 0.05,
        reason: "Wood Package Surcharge (5%)",
      },
      plastic: {
        type: "increment",
        rate: 0.1,
        reason: "Plastic Package Surcharge (10%)",
      },
      cardboard: {
        type: "discount",
        rate: 0.01,
        reason: "Cardboard Package Discount (1%)",
      },
    };
    const strategy = materialCostStrategies[packageType];
    if (!strategy) {
      throw new Error(`Unknown package type: ${packageType}`);
    }
    const amount = context.finalCost * strategy.rate;
    const entry = {
      reason: strategy.reason,
      amount: strategy.type === "discount" ? -amount : amount,
    };
    if (strategy.type === "discount") {
      context.discounts.push(entry);
      context.finalCost -= amount;
    } else {
      context.increments.push(entry);
      context.finalCost += amount;
    }
    return context;
  }

  // Rule vi, vii, viii, ix
  _applyCountryTax(context, country) {
    let taxRate = 0.15; // Default tax
    if (country.toLowerCase() === "usa") taxRate = 0.18;
    if (country.toLowerCase() === "bolivia") taxRate = 0.13;
    if (country.toLowerCase() === "india") taxRate = 0.19;

    const taxAmount = context.finalCost * taxRate;
    context.increments.push({
      reason: `Destination Tax (${taxRate * 100}%)`,
      amount: taxAmount,
    });
    context.finalCost += taxAmount;
    return context;
  }

  // Rule x, xi, xii
  _applyShippingFee(context, order) {
    const shippingStrategies = {
      Sea: {
        fee: () => 400,
        reason: "Sea Shipping Flat Fee",
      },
      Land: {
        fee: () => 10 * order.quantity,
        reason: "Land Shipping Fee",
      },
      Air: {
        fee: () => {
          let fee = 30 * order.quantity;
          if (order.quantity > 1000) {
            const discount = fee * 0.15;
            fee -= discount;
            context.discounts.push({
              reason: "High-Volume Air Shipping Discount (15%)",
              amount: -discount,
            });
          }
          return fee;
        },
        reason: "Air Shipping Fee",
      },
    };

    const strategy = shippingStrategies[order.shippingMode];
    if (!strategy) {
      throw new Error(`Unsupported shipping mode: ${order.shippingMode}`);
    }

    const shippingFee = strategy.fee();
    context.increments.push({ reason: strategy.reason, amount: shippingFee });
    context.finalCost += shippingFee;

    return context;
  }
}

module.exports = new PricingService();
