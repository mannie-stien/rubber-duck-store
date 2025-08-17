const storeService = require('./store.service');
const Joi = require('joi');

// Validation schema for the incoming order usin joi
const orderSchema = Joi.object({
  color: Joi.string().valid('Red', 'Green', 'Yellow', 'Black').required(),
  size: Joi.string().valid('XLarge', 'Large', 'Medium', 'Small', 'XSmall').required(),
  quantity: Joi.number().integer().min(1).required(),
  destinationCountry: Joi.string().required(),
  shippingMode: Joi.string().valid('Land', 'Air', 'Sea').required(),
});

class StoreController {
  async createOrder(req, res) {
    try {
      // 1. Validate the incoming request body for safty
      const { error, value } = orderSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }


      const orderResult = await storeService.processOrder(value);
      res.status(200).json(orderResult);
    } catch (error) {
      res.status(error.message.includes('not found') || error.message.includes('stock') ? 404 : 500).json({
        message: 'Error processing your order',
        error: error.message,
      });
    }
  }
}

module.exports = new StoreController();