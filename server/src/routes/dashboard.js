const router  = require('express').Router();
const Product = require('../models/Product');
const Order   = require('../models/Order');
const User    = require('../models/User');
const Event   = require('../models/Event');
const Booking = require('../models/Booking');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/dashboard/stats — admin
router.get('/stats', protect, adminOnly, async (req, res, next) => {
  try {
    const [
      totalProducts,
      totalOrders,
      totalUsers,
      totalEvents,
      totalBookings,
      pendingOrders,
      revenue,
      recentOrders,
      topProducts,
    ] = await Promise.all([
      Product.countDocuments({ isActive: true }),
      Order.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      Event.countDocuments({ isActive: true }),
      Booking.countDocuments(),
      Order.countDocuments({ status: 'pending' }),

      // Total revenue from delivered orders
      Order.aggregate([
        { $match: { status: 'delivered' } },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ]),

      // Last 5 orders
      Order.find().sort({ createdAt: -1 }).limit(5)
        .select('orderCode guestName total status createdAt'),

      // Orders by status breakdown
      Order.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
    ]);

    res.json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        totalUsers,
        totalEvents,
        totalBookings,
        pendingOrders,
        totalRevenue: revenue[0]?.total ?? 0,
        recentOrders,
        ordersByStatus: topProducts,
      },
    });
  } catch (err) { next(err); }
});

// GET /api/dashboard/revenue — monthly revenue chart
router.get('/revenue', protect, adminOnly, async (req, res, next) => {
  try {
    const data = await Order.aggregate([
      { $match: { status: { $in: ['delivered', 'confirmed'] } } },
      {
        $group: {
          _id: {
            year:  { $year:  '$createdAt' },
            month: { $month: '$createdAt' },
          },
          revenue: { $sum: '$total' },
          count:   { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 12 },
    ]);
    res.json({ success: true, data });
  } catch (err) { next(err); }
});

module.exports = router;
