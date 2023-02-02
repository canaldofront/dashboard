import { useSelector } from 'react-redux';
import styles from './TopSales.module.scss';
import Image from 'next/image';
import useImage from 'src/hooks/useImage';

const TopSales = () => {
  const { top: topProducts } = useSelector((state) => state.dashboard.products);

  const getImage = useImage();

  const renderProducts =
    topProducts?.map((product) => (
      <li key={product._id}>
        <Image
          src={getImage(product.image).url()}
          alt={product.name}
          width={64}
          height={64}
        />
        <h4>{product.name}</h4>
      </li>
    )) || [];

  return (
    <div className={styles['top-sales']}>
      <h3>Produtos mais vendidos</h3>
      <ul className={styles.content}>{renderProducts}</ul>
    </div>
  );
};

export default TopSales;
