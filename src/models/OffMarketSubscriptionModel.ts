import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOffMarketSubscription extends Document {
  userId: mongoose.Types.ObjectId;
  active: boolean;
  startDate: Date;
  endDate: Date;
}

const offMarketSubscriptionSchema: Schema<IOffMarketSubscription> = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  active: { type: Boolean, default: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
});

const OffMarketSubscriptionModel: Model<IOffMarketSubscription> =
  mongoose.models.OffMarketSubscription || mongoose.model<IOffMarketSubscription>('OffMarketSubscription', offMarketSubscriptionSchema);

export default OffMarketSubscriptionModel;
