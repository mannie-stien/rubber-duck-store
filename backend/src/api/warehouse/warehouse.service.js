const Duck = require('../../models/duck.model');

class WarehouseService {
  async addDuck(duckData) {
    const { color, size, price, quantity } = duckData;

    // This is to find a non-deleted duck with the same unique attributes
    const existingDuck = await Duck.findOne({
      color,
      size,
      price,
      deleted: false,
    });

    if (existingDuck) {
      existingDuck.quantity += quantity;
      await existingDuck.save();
      return { duck: existingDuck, created: false };
    } else {
      // if no such duck exists, create a new one
      const newDuck = new Duck({
        color,
        size,
        price,
        quantity,
      });
      await newDuck.save();
      return { duck: newDuck, created: true };
    }
  }

  async listDucks() {
    return Duck.find({ deleted: false }).sort({ quantity: 'asc' });
  }

  async editDuck(id, updateData) {
    const allowedUpdates = ['price', 'quantity'];
    const updates = {};
    for (const key in updateData) {
      if (allowedUpdates.includes(key)) {
        updates[key] = updateData[key];
      }
    }
    
    if (Object.keys(updates).length === 0) {
        throw new Error('No valid fields to update provided.');
    }

    return Duck.findOneAndUpdate(
      { id, deleted: false },
      { $set: updates },
      { new: true } // Return the modified document
    );
  }

  async deleteDuck(id) {
    return Duck.findOneAndUpdate(
      { id, deleted: false },
      { $set: { deleted: true } },
      { new: true }
    );
  }
}

module.exports = new WarehouseService();