import Heading from 'src/UI/Heading/Heading';
import Link from 'next/link';
import GridChart from 'src/Components/GridChart/GridChart';
import { useSelector } from 'react-redux';
import useImage from 'src/hooks/useImage';

const columns = [
  {
    field: 'image',
    headerText: 'Imagem',
    width: '120',
    textAlign: 'center',
    template: '<img class="grid-image"/>',
  },
  { field: 'name', headerText: 'Nome', width: '200' },
  { field: 'price', headerText: 'Preço', width: '120', format: 'C2' },
  { field: 'orders', headerText: 'Pedidos', width: '120' },
];

const Products = () => {
  const { list: products } = useSelector((state) => state.dashboard.products);

  const getImage = useImage();

  const data =
    products?.map((product) => ({
      ...product,
      image: getImage(product.image).url(),
    })) || [];

  return (
    <section>
      <Heading title='Produtos' subtitle='Esses são os produtos disponíveis' />
      <Link href='/produtos/adicionar' className='btn btn-primary mb-3'>
        Novo produto
      </Link>
      <GridChart data={data} columns={columns} />
    </section>
  );
};

export default Products;
