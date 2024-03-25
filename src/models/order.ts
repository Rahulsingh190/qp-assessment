interface Order {
    id: number;
    userId: number;
    items: { 
        itemId: number;
        quantity: number;
      }[];
    createdAt: Date;
    status: 'pending' | 'cancelled' | 'completed';
}

export default Order;
  