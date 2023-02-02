import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import client from 'src/sanity';
import { useRouter } from 'next/router';

const AddSale = () => {
  const [formData, setFormData] = useState({ product: '', quantity: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const isButtonActive = formData.product && formData.quantity && !isLoading;

  const { list: products } = useSelector((state) => state.dashboard.products);
  const router = useRouter();

  const data =
    products?.map((product) => ({
      id: product._id,
      product: product.name,
    })) || [];

  const filterData = (args) => {
    let query = new Query();

    query =
      args.text !== ''
        ? query.where('product', 'startswith', args.text, true)
        : query;

    args.updateData(data, query);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!formData.product || !formData.quantity) return;
    setIsLoading(true);

    const orderData = {
      _type: 'orders',
      product: { _ref: formData.product, _type: 'reference' },
      quantity: +formData.quantity,
      date: new Date(),
    };

    try {
      await client.create(orderData);
      await client.patch(formData.product).inc({ orders: +formData.quantity }).commit();
      router.push('/');
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <div>
        <label htmlFor='dropdown' className='hidden'>
          Produto
        </label>
        <DropDownListComponent
          id='ddlelement'
          fields={{ value: 'id', text: 'product' }}
          dataSource={data}
          popupHeight='200px'
          placeholder='Selecione um produto'
          allowFiltering={true}
          filtering={filterData}
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              product: e.target.value,
            }))
          }
        />
      </div>
      <div>
        <label htmlFor='quantity' className='hidden'>
          Quantidade
        </label>
        <input
          type='number'
          name='quantity'
          id='quantity'
          min='0'
          placeholder='Quantidade'
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              quantity: e.target.value,
            }))
          }
        />
      </div>
      <button className='btn btn-primary' disabled={!isButtonActive}>
        {isLoading ? 'Carregando...' : 'Confirmar'}
      </button>
    </form>
  );
};

export default AddSale;
