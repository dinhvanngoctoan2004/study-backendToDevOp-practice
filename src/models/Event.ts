import { model, Schema, type Document, type Types } from 'mongoose';

export interface ITicketCategory {
  name: string;
  price: number;
  totalQuantity: number;
  availableQuantity: number;
}

export interface IEvent extends Document {
  title: string;
  slug: string;
  organizerId: Types.ObjectId;
  location: {
    name: string;
    city: string;
    address: string;
  };
  startTime: Date;
  endTime: Date;
  ticketCategories: ITicketCategory[];
  status: 'draft' | 'published' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const ticketCategorySchema = new Schema<ITicketCategory>({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  totalQuantity: { type: Number, required: true, min: 1 },
  availableQuantity: { type: Number, required: true, min: 0 },
});

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    organizerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    location: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    ticketCategories: [ticketCategorySchema],
    status: {
      type: String,
      enum: ['draft', 'published', 'completed', 'cancelled'],
      default: 'draft',
    },
  },
  { timestamps: true },
);

eventSchema.pre('validate', function () {
  if (this.endTime <= this.startTime) {
    this.invalidate('endTime', 'endTime must be greater than startTime');
  }
});

eventSchema.index({ organizerId: 1, startTime: -1 });
export const Event = model<IEvent>('Event', eventSchema);
