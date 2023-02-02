import {
  HeatMapComponent,
  Inject,
  Tooltip,
} from '@syncfusion/ej2-react-heatmap';
import { useSelector } from 'react-redux';
import useGetWeekDay from 'src/hooks/useGetWeekDay';

const labelsX = {
  labels: [
    '00h - 04h',
    '04h - 08h',
    '08h - 12h',
    '12h - 16h',
    '16h - 20h',
    '20h - 00h',
  ],
};

const labelsY = {
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
};

const HeatMap = () => {
  const { list: orders } = useSelector((state) => state.dashboard.orders);

  const getWeekDay = useGetWeekDay();
  const getHours = (timestamp) => new Date(timestamp).getHours();

  const data = [];
  for (let i = 0; i < 24; i += 4) {
    const filteredOrders =
      orders?.filter(
        (order) => getHours(order.date) >= i && getHours(order.date) < i + 4
      ) || [];

    const ordersPerDay = labelsY.labels.map(
      (day) =>
        filteredOrders?.filter((order) => getWeekDay(order.date) === day)
          .length || 0
    );

    data.push(ordersPerDay);
  }

  return (
    <div>
      <HeatMapComponent
        titleSettings={{
          text: 'Vendas por dia e horário',
          textStyle: {
            size: '14px',
            fontWeight: '400',
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI',
          },
        }}
        xAxis={labelsX}
        yAxis={labelsY}
        dataSource={data}
        showTooltip={true}>
        <Inject services={[Tooltip]} />
      </HeatMapComponent>
    </div>
  );
};

export default HeatMap;
