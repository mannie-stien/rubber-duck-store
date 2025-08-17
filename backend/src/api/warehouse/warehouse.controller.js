const warehouseService = require('./warehouse.service');
const Joi = require('joi');

// Validation schema for adding a duck using joi
const addDuckSchema = Joi.object({
  color: Joi.string().valid('Red', 'Green', 'Yellow', 'Black').required(),
  size: Joi.string().valid('XLarge', 'Large', 'Medium', 'Small', 'XSmall').required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().min(1).required(),
});



const editDuckSchema = Joi.object({
    price: Joi.number().positive(),
    quantity: Joi.number().integer().min(0),
}).or('price', 'quantity');


class WarehouseController {
  async addDuck(req, res) {
    try {
      const { error, value } = addDuckSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { duck, created } = await warehouseService.addDuck(value);
      const statusCode = created ? 201 : 200;
      res.status(statusCode).json(duck);
    } catch (error) {
      res.status(500).json({ message: 'Error adding duck', error: error.message });
    }
  }

  async listDucks(req, res) {
    try {
      const ducks = await warehouseService.listDucks();
      res.status(200).json(ducks);
    } catch (error) {
      res.status(500).json({ message: 'Error listing ducks', error: error.message });
    }
  }

  async editDuck(req, res) {
    try {
      const { id } = req.params;
      const { error, value } = editDuckSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      
      const updatedDuck = await warehouseService.editDuck(id, value);

      if (!updatedDuck) {
        return res.status(404).json({ message: 'Duck not found or already deleted' });
      }
      res.status(200).json(updatedDuck);
    } catch (error) {
      res.status(500).json({ message: 'Error editing duck', error: error.message });
    }
  }

  async deleteDuck(req, res) {
    try {
      const { id } = req.params;
      const deletedDuck = await warehouseService.deleteDuck(id);

      if (!deletedDuck) {
        return res.status(404).json({ message: 'Duck not found' });
      }
      res.status(200).json({ message: `Duck with ID ${id} deleted successfully.` });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting duck', error: error.message });
    }
  }
}

module.exports = new WarehouseController();