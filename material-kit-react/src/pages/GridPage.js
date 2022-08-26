import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Page from 'src/components/Page';
import { Button, ButtonGroup, Container, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/Iconify';
import { AgGridReact } from 'ag-grid-react';
import { COUNTRY_CODES } from 'src/common/constants';

// this is a hook, but we work also with classes
// 보여지는 데이터만 표출(전체를 조회하는 것이 아님) -> 스크롤 시, 렌더링
function MyRenderer(params) {
  const contry = params.value;
  const localCode = COUNTRY_CODES[contry];
  const url = localCode ? `https://flags.fmcdn.net/data/flags/mini/${localCode}.png` : '';
  return (
    <span className="my-renderer">
      <img src={url} className="my-spinner" alt="" />
      {contry}
    </span>
  );
}
// 컬럼 셋팅
const getColumnDefs = () => {
  return [
    // { headerName: 'GROUP A', groupId: 'groupA', children: [] },
    {
      headerName: 'Title',
      children: [
        {
          field: 'athlete',
          pinned: 'left',
          width: 200,
          rowDrag: true,
          lockPosition: 'left',
          cellClass: 'locked-col',
        },
      ],
    },
    { field: 'country', width: 210, cellRenderer: MyRenderer },
    {
      headerName: 'Details',
      children: [{ field: 'age', width: 120, type: 'numberColumn' }, { field: 'sport' }],
    },
    { field: 'year', width: 120 },
    {
      field: 'date',
      width: 160,
      filter: 'agDateColumnFilter',
      filterParams: {
        // provide comparator function
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          const dateAsString = cellValue;

          if (dateAsString == null) {
            return 0;
          }

          // In the example application, dates are stored as dd/mm/yyyy
          // We create a Date object for comparison against the filter date
          const dateParts = dateAsString.split('/');
          const year = Number(dateParts[2]);
          const month = Number(dateParts[1]) - 1;
          const day = Number(dateParts[0]);
          const cellDate = new Date(year, month, day);

          // Now that both parameters are Date objects, we can compare
          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
          return 0;
        },
        browserDatePicker: true,
      },
    },
    {
      headerName: 'Medals',
      groupId: 'medalsGroup',
      children: [
        // using medal column type
        { headerName: 'Gold', field: 'gold', type: 'medalColumn' },
        { headerName: 'Silver', field: 'silver', type: 'medalColumn' },
        { headerName: 'Bronze', field: 'bronze', type: 'medalColumn' },
        {
          headerName: 'Total',
          field: 'total',
          type: 'medalColumn',
          columnGroupShow: 'closed',
          width: 120,
        },
      ],
    },
    // { field: 'gold', initialWidth: 100 },
    // { field: 'silver', initialWidth: 100 },
    // { field: 'bronze', initialWidth: 100 },
    // { field: 'total', initialWidth: 100 },
  ];
};

const isFirstColumn = (params) => {
  const displayedColumns = params.columnApi.getAllDisplayedColumns();
  const thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
};

const GridPage = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // 그리드 컬럼 데이터
  const [columnDefs] = useState(getColumnDefs());

  // 그리드 옵션
  const defaultColDef = useMemo(() => {
    return {
      resizable: true, // 컬럼 사이즈 정렬
      sortable: true, // 정렬
      filter: true, // 필터
      pinned: null,
      sort: null,
      suppressMenu: true, // 헤더에 필터옵션 제거
      unSortIcon: true,
      headerCheckboxSelection: isFirstColumn,
      checkboxSelection: isFirstColumn,
      editable: true, // 데이터 작성 가능
      floatingFilter: true, // 필터 테이블에서 보여주기
      filterParams: {
        buttons: ['reset', 'cancel'],
        closeOnApply: true,
      },
    };
  }, []);

  // 컬럼 설정 따로 선언하는 방법
  const columnTypes = useMemo(() => {
    return {
      numberColumn: { width: 110, filter: 'agNumberColumnFilter' },
      medalColumn: { width: 100, columnGroupShow: 'open', filter: 'agNumberColumnFilter' },
      nonEditableColumn: { editable: false },
    };
  }, []);

  // csv export
  const onBtnExport = useCallback(() => {
    const params = { fileName: 'csv파일입니다.csv' };
    // gridRef.current.api.getDataAsCsv(params);
    gridRef.current.api.exportDataAsCsv(params);
  }, []);

  // const sizeToFit = useCallback(() => {
  //   gridRef.current.api.sizeColumnsToFit();
  // }, []);

  // data길이에 맞추어 컬럼 width 설정
  const autoSizeAll = (skipHeader) => {
    const allColumnIds = [];
    gridRef.current.columnApi.getColumns().forEach((column) => {
      allColumnIds.push(column.getId());
    });
    gridRef.current.columnApi.autoSizeColumns(allColumnIds, skipHeader);
  };

  // 그리드 클릭 시, 이벤트
  const cellClickedListener = useCallback((event) => {
    console.log('cellClicked', event);
  }, []);

  // 그리드 버튼 이벤트
  const buttonListener = useCallback(() => {
    gridRef.current.api.deselectAll(); // 선택 해제
  }, []);

  // 컬럼 설정한 것 초기화
  const onBtWithState = useCallback(() => {
    gridRef.current.api.setColumnDefs(getColumnDefs());
    autoSizeAll(false);
    gridRef.current.api.setFilterModel(null); // 필터 초기화
  }, []);

  const onBtnCheckBox = useCallback(() => {
    const getCheckNode = gridRef.current.api.getSelectedNodes();
    console.log(getCheckNode);
  }, []);

  // const onBtnImport = useCallback(() => {}, []);

  const containerStyle = useMemo(() => ({ width: '100%', height: 500 }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  // 서버 통신 -> 데이터 가져옴
  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  return (
    <Page title="Dashboard: Blog">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Grid
          </Typography>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={buttonListener} startIcon={<Iconify icon="mdi:checkbox-blank-off-outline" />}>
              선택 해제
            </Button>
            <Button onClick={onBtWithState} startIcon={<Iconify icon="mdi:reload" />}>
              테이블 설정 초기화
            </Button>
            <Button onClick={onBtnExport} startIcon={<Iconify icon="mdi:export-variant" />}>
              CSV Export
            </Button>
            {/* <Button onClick={onBtnImport} startIcon={<Iconify icon="mdi:import" />}>
              Data Import
            </Button> */}
            <Button onClick={onBtnCheckBox} startIcon={<Iconify icon="mdi:checkbox-marked-outline" />}>
              Get Check Data
            </Button>
          </ButtonGroup>
        </Stack>
        <div id="myGrid" style={containerStyle}>
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef} // Ref for accessing Grid's API
              rowData={rowData} // Row Data for Rows
              columnDefs={columnDefs} // Column Defs for Columns
              defaultColDef={defaultColDef} // Default Column Properties
              columnTypes={columnTypes}
              rowDragManaged="true" // row drag 가능
              animateRows="true" // row 애니메이션 효과
              rowSelection="multiple" // 클릭시, row선택유지
              suppressRowClickSelection="true"
              suppressDragLeaveHidesColumns="true"
              onCellClicked={cellClickedListener} // 클릭한 row의 데이터 가져옴
            />
          </div>
        </div>
      </Container>
    </Page>
  );
};

export default GridPage;
