import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  AccumulationTooltip,
  Inject,
} from '@syncfusion/ej2-react-charts';
import { useSelector } from 'react-redux';
import useGetWeekDay from 'src/hooks/useGetWeekDay';

const PieChart = () => {
  const { list: orders } = useSelector((state) => state.dashboard.orders);
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

  const getWeekDay = useGetWeekDay();

  const data = days.map((day) => {
    const numOrders =
      orders?.filter((order) => getWeekDay(order.date) === day).length || 0;

    return {
      day,
      orders: numOrders,
      text: `${day}: ${numOrders}`,
    };
  });

  return (
    <div>
      <AccumulationChartComponent
        id='piecharts'
        legendSettings={{ visible: true }}
        enableSmartLabels={true}
        enableAnimation={true}
        tooltip={{ enable: true }}>
        <Inject
          services={[
            AccumulationLegend,
            PieSeries,
            AccumulationDataLabel,
            AccumulationTooltip,
          ]}
        />
        <AccumulationSeriesCollectionDirective>
          <AccumulationSeriesDirective
            dataSource={data}
            xName='day'
            yName='orders'
            radius='80%'
            innerRadius='20%'
            dataLabel={{
              visible: true,
              position: 'Outside',
              name: 'day',
            }}
          />
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
    </div>
  );
};

export default PieChart;
