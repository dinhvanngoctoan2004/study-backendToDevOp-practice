import { Schema, model, Document, Types } from 'mongoose';

export interface ITicketReservation extends Document {
  eventId: Types.ObjectId;
  userId: Types.ObjectId;
  seatNumber: string;
  ticketCategoryName: string;
  price: number;
  status: 'held' | 'confirmed' | 'cancelled' | 'expired';
  heldUntil: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TicketReservationSchema = new Schema<ITicketReservation>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    seatNumber: { type: String, required: true, trim: true },
    ticketCategoryName: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['held', 'confirmed', 'cancelled', 'expired'],
      default: 'held',
    },
    heldUntil: { type: Date, required: true },
  },
  { timestamps: true },
);

//TTL Index: Tự động hết hạn/xóa vé giữ chỗ khi tới mốc heldUntil
TicketReservationSchema.index(
  { heldUntil: 1 },
  { expireAfterSeconds: 0, partialFilterExpression: { status: 'held' } },
);
// Unique Compound Index: Đảm bảo trong 1 sự kiện KHÔNG BAO GIỜ có 2 người giữ trùng số ghế
TicketReservationSchema.index(
  { eventId: 1, seatNumber: 1 },
  { unique: true, partialFilterExpression: { status: { $in: ['held', 'confirmed'] } } },
);

export const TicketReservation = model<ITicketReservation>(
  'TicketReservation',
  TicketReservationSchema,
);
