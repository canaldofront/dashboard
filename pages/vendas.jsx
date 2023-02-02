import Heading from 'src/UI/Heading/Heading';
import GridChart from 'src/Components/GridChart/GridChart';
import { useSelector } from 'react-redux';

const columns = [
  { field: '_id', headerText: 'ID', width: '120' },
  { field: 'product', headerText: 'Produto', width: '200' },
  { field: 'quantity', headerText: 'Quantidade', width: '120' },
  { field: 'amount', headerText: 'Valor', width: '120', format: 'C2' },
  {
    field: 'date',
    headerText: 'Data',
    width: '120',
    format: { type: 'date', format: 'dd/MM/yyyy' },
  },
];

const Sales = () => {
  const { merged } = useSelector((state) => state.dashboard.orders);

  const data =
    merged?.map((order) => ({
      ...order,
      _id: order._id.slice(0, 6),
    })) || [];

  return (
    <section>
      <Heading title='Vendas' subtitle='Aqui está o seu histórico de vendas' />
      <GridChart data={data} columns={columns} />
    </section>
  );
};

export default Sales;
