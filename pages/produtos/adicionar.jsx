import Heading from 'src/UI/Heading/Heading';
import { useState } from 'react';
import client from 'src/sanity';
import { useRouter } from 'next/router';

const AddProduct = () => {
  const [formData, setFormData] = useState({ name: '', price: '', image: '' });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const isButtonActive =
    formData.name && formData.price && formData.image && !isLoading;

  const uploadImage = async (e) => {
    const imageData = e.target.files[0];
    setIsLoading(true);

    try {
      const image = await client.assets.upload('image', imageData, {
        contentType: imageData.type,
        filename: imageData.name,
      });

      setFormData((prevState) => ({
        ...prevState,
        image,
      }));
      setIsLoading(false)
    } catch {
      setIsLoading(false);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.image) return;

    setIsLoading(true);

    const productData = {
      _type: 'products',
      name: formData.name,
      price: +formData.price,
      orders: 0,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: formData.image._id,
        },
      },
    };

    try {
      await client.create(productData);
      router.push('/');
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <Heading
        title='Adiconar Produto'
        subtitle='Preencha os campos para adicionar um produto'
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
            placeholder='Nome do produto'
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
            Preço
          </label>
          <input
            type='number'
            name='price'
            id='price'
            placeholder='Preço'
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                price: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor='image' className='hidden'>
            Imagem
          </label>
          <input type='file' name='image' id='image' onChange={uploadImage} />
        </div>
        <button className='btn btn-primary' disabled={!isButtonActive}>
          {isLoading ? 'Carregando...' : 'Adicionar'}
        </button>
      </form>
    </section>
  );
};

export default AddProduct;
