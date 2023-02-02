import styles from './Card.module.scss';

const Card = ({ title, subtitle, value }) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <h4>{subtitle}</h4>
      <h5 className='h3'>{value}</h5>
    </div>
  );
};

export default Card;
