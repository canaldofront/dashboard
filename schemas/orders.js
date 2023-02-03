export default {
  name: 'orders',
  title: 'Orders',
  type: 'document',
  fields: [
    {
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{type: 'products'}],
    },
    {
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
    },
  ],
}
