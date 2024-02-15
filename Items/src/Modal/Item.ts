import mongoose, { Document, Schema } from 'mongoose';

interface ItemAttrs extends Document {
  itemCategory: string;
  itemName: string;
  itemDescription: string;
  itemOwner: string;
  itemImages: [string];
  hasOwnerClaimed: boolean;
  postType: string;
  appeal: string;
  lostLocation: {
    type: string;
    coordinates: [number, number];
  };
  lostDate: Date;
  lostTime: Date;
}

const ItemSchema = new Schema({
  itemCategory: {
    type: String,
    required: [true, 'Please provide an item category'],
  },
  itemName: {
    type: String,
    required: [true, 'Please provide an item name'],
  },
  itemDescription: {
    type: String,
    required: [true, 'Please provide an item description'],
  },
  itemImages: {
    type: [String],
    required: [true, 'Please provide an item image'],
  },
  postType: {
    type: String,
    enum: ['LOST', 'FOUND'],
    required: [true, 'Please provide a post type'],
  },
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a registered by'],
  },
  lostLocation: {
    type: {
      type: String,
      required: true,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      required: [true, 'Please provide location coordinates'],
    },
  },
  lostDate: {
    type: Date,
    required: [true, 'Please provide a lost date'],
  },
  hasOwnerClaimed: {
    type: Boolean,
    default: false,
  },
});

ItemSchema.index({ lostLocation: '2dsphere' });
ItemSchema.virtual('appeals', {
  ref: 'Appeal',
  localField: '_id',
  foreignField: 'item',
});

const Item = mongoose.model<ItemAttrs>('Item', ItemSchema);

export { Item };
