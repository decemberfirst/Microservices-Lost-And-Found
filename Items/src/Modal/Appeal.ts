import mongoose from 'mongoose';

interface AppealAttrs extends mongoose.Document {
  item: string;
  appealedBy: string;
  appealDescription: string;
  isAccepted: boolean;
  appealType: string;
}

enum AppealType {
  I_FOUND_THIS_ITEM = 'CLAIM-FOUND',
  THIS_IS_MY_ITEM = 'CLAIM-MY',
}

const AppealSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: [true, 'Please provide an item'],
  },
  appealedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide an appeal owner'],
  },
  appealType: {
    type: String,
    required: [true, 'Please provide an appeal type'],
    enum: ['CLAIM-MY', 'CLAIM-FOUND'], // CLAIM MY = THIS IS MY ITEM , CLAIM FOUND = I FOUND THIS ITEM
  },
  appealDescription: {
    type: String,
    required: [true, 'Please provide an appeal description'],
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
});

const Appeal = mongoose.model<AppealAttrs>('Appeal', AppealSchema);

export { Appeal, AppealType };
