export interface Precedent {
  description: string;
  action: string;
  csat: number; // 1-5 stars
  similarity: number; // 0-1
}

export interface Ticket {
  ticket_id: string;
  description: string;
  order_id: string;
  confidence: number; // 0-1
  action: 'refund' | 'redelivery' | 'coupon' | null;
  status: 'auto_resolved' | 'human_review';
  refusal_reason: string | null;
  precedents: Precedent[];
  drafted_reply: string;
  reasoning: string;
  timestamp: string;
  store_id?: number;
}

export const mockTickets: Ticket[] = [
  {
    ticket_id: 'TKT-14892',
    description: 'Customer received wrong item - ordered milk, got eggs',
    order_id: 'ORD-884729',
    confidence: 0.92,
    action: 'refund',
    status: 'auto_resolved',
    refusal_reason: null,
    precedents: [
      {
        description: 'Wrong item delivered - bread instead of butter',
        action: 'refund',
        csat: 5,
        similarity: 0.94
      },
      {
        description: 'Incorrect product in order',
        action: 'refund',
        csat: 4,
        similarity: 0.89
      },
      {
        description: 'Substitution error - wrong brand',
        action: 'refund',
        csat: 5,
        similarity: 0.87
      }
    ],
    drafted_reply: "We sincerely apologize for the error. We've processed a full refund of ₹89 to your original payment method. You should see it within 3-5 business days.",
    reasoning: "High-confidence wrong-item case with strong precedent match (94%). All similar cases resolved with immediate refund. Order value within auto-approval threshold.",
    timestamp: new Date(Date.now() - 120000).toISOString(),
    store_id: 4
  },
  {
    ticket_id: 'TKT-14893',
    description: 'Delivery partner was rude and threw items at door',
    order_id: 'ORD-884730',
    confidence: 0.68,
    action: null,
    status: 'human_review',
    refusal_reason: 'low_similarity',
    precedents: [
      {
        description: 'Delivery person unprofessional behavior',
        action: 'coupon',
        csat: 3,
        similarity: 0.71
      },
      {
        description: 'Rude delivery experience reported',
        action: 'coupon',
        csat: 4,
        similarity: 0.68
      },
      {
        description: 'Partner misconduct complaint',
        action: 'refund',
        csat: 5,
        similarity: 0.64
      }
    ],
    drafted_reply: "We're very sorry about your experience. We've flagged this with our delivery partner management team and would like to offer you a ₹200 coupon for your next order.",
    reasoning: "Behavioral complaint requiring investigation. Precedents show mixed resolution paths (coupon vs refund). Escalating to verify incident before committing to action.",
    timestamp: new Date(Date.now() - 90000).toISOString()
  },
  {
    ticket_id: 'TKT-14894',
    description: 'Missing item from order - paid for detergent but not in bag',
    order_id: 'ORD-884731',
    confidence: 0.88,
    action: 'refund',
    status: 'auto_resolved',
    refusal_reason: null,
    precedents: [
      {
        description: 'Item missing from delivery',
        action: 'refund',
        csat: 5,
        similarity: 0.91
      },
      {
        description: 'Incomplete order - shampoo missing',
        action: 'refund',
        csat: 4,
        similarity: 0.88
      },
      {
        description: 'Paid for item not received',
        action: 'refund',
        csat: 5,
        similarity: 0.86
      }
    ],
    drafted_reply: "We apologize for the missing item. A refund of ₹345 for the detergent has been processed to your payment method.",
    reasoning: "Standard missing-item case. Precedent consensus strong (91% similarity). Order history shows customer reliability.",
    timestamp: new Date(Date.now() - 60000).toISOString(),
    store_id: 4
  },
  {
    ticket_id: 'TKT-14895',
    description: 'Requesting refund for cancelled order that still got delivered',
    order_id: 'ORD-884732',
    confidence: 0.42,
    action: null,
    status: 'human_review',
    refusal_reason: 'guardrail: order_cancelled',
    precedents: [
      {
        description: 'Cancelled order was delivered anyway',
        action: 'refund',
        csat: 3,
        similarity: 0.79
      },
      {
        description: 'Customer cancelled but received items',
        action: 'coupon',
        csat: 2,
        similarity: 0.73
      },
      {
        description: 'Order cancellation not processed correctly',
        action: 'refund',
        csat: 4,
        similarity: 0.67
      }
    ],
    drafted_reply: "We see you cancelled order ORD-884732 at 2:14 PM, but delivery occurred at 2:28 PM. We're reviewing the timeline to determine the appropriate resolution.",
    reasoning: "Cancellation timing requires verification. System shows cancel request 14 minutes before delivery. Precedents disagree on action. Needs manual review of logs.",
    timestamp: new Date(Date.now() - 45000).toISOString()
  },
  {
    ticket_id: 'TKT-14896',
    description: 'Item expired - milk expiry date was 2 days ago',
    order_id: 'ORD-884733',
    confidence: 0.95,
    action: 'refund',
    status: 'auto_resolved',
    refusal_reason: null,
    precedents: [
      {
        description: 'Expired product delivered',
        action: 'refund',
        csat: 5,
        similarity: 0.96
      },
      {
        description: 'Yogurt past expiration date',
        action: 'refund',
        csat: 5,
        similarity: 0.93
      },
      {
        description: 'Received expired goods',
        action: 'refund',
        csat: 4,
        similarity: 0.91
      }
    ],
    drafted_reply: "We sincerely apologize for delivering an expired product. This is unacceptable. We've processed a full refund of ₹65 and added a ₹100 goodwill credit to your account.",
    reasoning: "Critical quality failure. Unanimous precedent for immediate refund + goodwill gesture. High customer trust impact.",
    timestamp: new Date(Date.now() - 30000).toISOString()
  },
  {
    ticket_id: 'TKT-14897',
    description: 'Charged twice for same order',
    order_id: 'ORD-884734',
    confidence: 0.77,
    action: 'refund',
    status: 'auto_resolved',
    refusal_reason: null,
    precedents: [
      {
        description: 'Double charge on card',
        action: 'refund',
        csat: 4,
        similarity: 0.88
      },
      {
        description: 'Payment processed twice',
        action: 'refund',
        csat: 5,
        similarity: 0.84
      },
      {
        description: 'Duplicate transaction',
        action: 'refund',
        csat: 4,
        similarity: 0.81
      }
    ],
    drafted_reply: "We've identified a duplicate charge of ₹847. The duplicate transaction has been reversed and should reflect in your account within 5-7 business days.",
    reasoning: "Payment system glitch. Verified duplicate transaction ID. Standard protocol for immediate reversal.",
    timestamp: new Date(Date.now() - 15000).toISOString()
  },
  {
    ticket_id: 'TKT-14898',
    description: 'Delivery delayed by 45 minutes, ice cream melted',
    order_id: 'ORD-884735',
    confidence: 0.59,
    action: null,
    status: 'human_review',
    refusal_reason: 'precedents_disagree',
    precedents: [
      {
        description: 'Late delivery caused frozen item to melt',
        action: 'refund',
        csat: 4,
        similarity: 0.82
      },
      {
        description: 'Delay led to food quality issue',
        action: 'coupon',
        csat: 3,
        similarity: 0.76
      },
      {
        description: 'Ice cream arrived melted due to delay',
        action: 'redelivery',
        csat: 5,
        similarity: 0.74
      }
    ],
    drafted_reply: "We apologize for the delay that affected your ice cream. We'd like to make this right - please let us know if you'd prefer a refund, redelivery, or coupon.",
    reasoning: "Precedents show inconsistent resolutions (refund/coupon/redelivery) with similar satisfaction scores. Customer preference needed for optimal outcome.",
    timestamp: new Date(Date.now() - 5000).toISOString(),
    store_id: 4
  },
  {
    ticket_id: 'TKT-14899',
    description: 'App showed delivered but order never arrived',
    order_id: 'ORD-884736',
    confidence: 0.51,
    action: null,
    status: 'human_review',
    refusal_reason: 'guardrail: refund>order_value',
    precedents: [
      {
        description: 'Marked delivered but not received',
        action: 'refund',
        csat: 2,
        similarity: 0.85
      },
      {
        description: 'Delivery status incorrect - never got order',
        action: 'redelivery',
        csat: 4,
        similarity: 0.79
      },
      {
        description: 'False delivery confirmation',
        action: 'refund',
        csat: 3,
        similarity: 0.75
      }
    ],
    drafted_reply: "We're investigating why the order shows delivered when you didn't receive it. Our delivery partner is checking the GPS and photo records.",
    reasoning: "Order value ₹1,847 exceeds auto-refund threshold (₹1,500). Requires delivery verification (GPS, photo proof) before approving refund.",
    timestamp: new Date(Date.now()).toISOString()
  },
  {
    ticket_id: 'TKT-14900',
    description: 'Packaging was torn, items spilled in bag',
    order_id: 'ORD-884737',
    confidence: 0.81,
    action: 'refund',
    status: 'auto_resolved',
    refusal_reason: null,
    precedents: [
      {
        description: 'Damaged packaging on delivery',
        action: 'refund',
        csat: 4,
        similarity: 0.87
      },
      {
        description: 'Bag torn, contents spilled',
        action: 'refund',
        csat: 5,
        similarity: 0.84
      },
      {
        description: 'Poor packaging led to spillage',
        action: 'refund',
        csat: 4,
        similarity: 0.80
      }
    ],
    drafted_reply: "We're sorry about the damaged packaging. We've refunded ₹276 for the affected items. Our packing team has been notified to prevent this.",
    reasoning: "Quality control failure. Consistent precedent for refund on packaging damage. Photo evidence from customer supports claim.",
    timestamp: new Date(Date.now() + 2000).toISOString(),
    store_id: 4
  },
  {
    ticket_id: 'TKT-14901',
    description: 'Wrong item - ordered organic but got regular',
    order_id: 'ORD-884738',
    confidence: 0.86,
    action: 'refund',
    status: 'auto_resolved',
    refusal_reason: null,
    precedents: [
      {
        description: 'Organic substituted with non-organic',
        action: 'refund',
        csat: 5,
        similarity: 0.91
      },
      {
        description: 'Wrong variant delivered',
        action: 'refund',
        csat: 4,
        similarity: 0.86
      },
      {
        description: 'Premium item replaced with standard',
        action: 'refund',
        csat: 4,
        similarity: 0.83
      }
    ],
    drafted_reply: "We apologize for the substitution error. The price difference of ₹124 has been refunded, plus a ₹50 goodwill credit for the inconvenience.",
    reasoning: "Variant mismatch with price difference. Precedent supports price-adjusted refund. Customer preference documented for organic items.",
    timestamp: new Date(Date.now() + 4000).toISOString(),
    store_id: 4
  }
];
