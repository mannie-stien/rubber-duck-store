const mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');

const AutoIncrement = AutoIncrementFactory(mongoose);

const duckSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
      enum: ['Red', 'Green', 'Yellow', 'Black'],
    },
    size: {
      type: String,
      required: true,
      enum: ['XLarge', 'Large', 'Medium', 'Small', 'XSmall'],
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

duckSchema.plugin(AutoIncrement, { inc_field: 'id', start_seq: 1 });

const Duck = mongoose.model('Duck', duckSchema);

module.exports = Duck;