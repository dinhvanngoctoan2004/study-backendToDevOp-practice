import { Types } from 'mongoose';
import { TicketReservation } from '../models/Ticket.models.js';

export const getEventAnalytics = async (eventId: string) => {
  const result = await TicketReservation.aggregate([
    // Stage 1: Lọc dữ liệu theo eventId
    {
      $match: {
        eventId: new Types.ObjectId(eventId),
      },
    },
    // Stage 2: Gom nhóm & Tính doanh thu + số lượng vé
    {
      $group: {
        _id: '$eventId',
        totalRevenue: {
          $sum: {
            $cond: [{ $eq: ['$status', 'confirmed'] }, '$price', 0],
          },
        },
        confirmedTicketsCount: {
          $sum: {
            $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0],
          },
        },
        heldTicketsCount: {
          $sum: {
            $cond: [{ $eq: ['$status', 'held'] }, 1, 0],
          },
        },
      },
    },
    // Stage 3: JOIN với bảng 'events'
    {
      $lookup: {
        from: 'events',
        localField: '_id',
        foreignField: '_id',
        as: 'eventDetails',
      },
    },
    // Stage 4: Format dữ liệu đầu ra
    {
      $project: {
        _id: 0,
        eventId: '$_id',
        eventTitle: { $arrayElemAt: ['$eventDetails.title', 0] },
        totalRevenue: 1,
        confirmedTicketsCount: 1,
        heldTicketsCount: 1,
      },
    },
  ]);
  return result[0] || null;
};
