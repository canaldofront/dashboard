import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
} from '@syncfusion/ej2-react-grids';
import { Inject, Page, Sort } from '@syncfusion/ej2-react-grids';
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'pt-BR': {
    grid: {
      EmptyRecord: 'Nenhum registro foi encontrado',
    },
    pager: {
      currentPageInfo: '{0} de {1} páginas',
      totalItemsInfo: '({0} itens)',
    },
  },
});

const GridChart = ({ columns, data }) => {
  const customizeCell = (args) => {
    if (args.column.field === 'image') {
      args.cell.querySelector('img').setAttribute('src', args.data.image);
    }
  };

  const renderColumns = columns.map((column, i) => (
    <ColumnDirective key={i} {...column}></ColumnDirective>
  ));

  return (
    <div>
      <GridComponent
        id='adaptiveBrowser'
        dataSource={data}
        allowPaging={true}
        pageSettings={{ pageSize: 10 }}
        allowFiltering={true}
        filterSettings={{ type: 'Excel' }}
        allowSorting={true}
        queryCellInfo={customizeCell}
        locale='pt-BR'>
        <ColumnsDirective>{renderColumns}</ColumnsDirective>
        <Inject services={[Page, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default GridChart;
