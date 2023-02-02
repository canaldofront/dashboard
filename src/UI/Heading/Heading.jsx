import styles from './Heading.module.scss';

const Heading = ({ title, subtitle }) => {
  return (
    <div className={styles.heading}>
      <h1>{title}</h1>
      <h2 className='h4'>{subtitle}</h2>
    </div>
  );
};

export default Heading;
