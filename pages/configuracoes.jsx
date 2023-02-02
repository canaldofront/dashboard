import Heading from 'src/UI/Heading/Heading';
import { useState } from 'react';
import client from 'src/sanity';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const Configurations = () => {
  const [formData, setFormData] = useState({
    name: 'Nome da Empresa',
    salesGoal: 1000,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { id: configId } = useSelector((state) => state.ui);

  const isButtonActive = formData.name && formData.salesGoal && !isLoading;
  const router = useRouter();

  const submitForm = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.salesGoal) return;
    setIsLoading(true);

    const configData = {
      company: formData.name,
      sales_goal: +formData.salesGoal,
    };

    try {
      await client.patch(configId).set(configData).commit();
      router.push('/');
    } catch {
      setIsLoading(false);
    }
  };
  return (
    <section>
      <Heading
        title='Configurações'
        subtitle='Defina as configurações da aplicação'
      />
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor='name' className='hidden'>
            Nome
          </label>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Nome da empresa'
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor='price' className='hidden'>
            Meta de vendas
          </label>
          <input
            type='number'
            name='price'
            id='price'
            placeholder='Meta de vendas'
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                salesGoal: e.target.value,
              }))
            }
          />
        </div>
        <button className='btn btn-primary' disabled={!isButtonActive}>
          {isLoading ? 'Carregando...' : 'Salvar'}
        </button>
      </form>
    </section>
  );
};

export default Configurations;
