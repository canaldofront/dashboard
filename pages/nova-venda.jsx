import AddSale from 'src/Components/AddSale/AddSale';
import Heading from 'src/UI/Heading/Heading';

const NewSale = () => {
  return (
    <section>
      <Heading title='Adicionar Venda' subtitle='Adicione uma nova venda' />
      <div>
        <AddSale />
      </div>
    </section>
  );
};

export default NewSale;
