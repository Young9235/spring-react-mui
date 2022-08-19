import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Page from 'src/components/Page';
import { Button, Container, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/Iconify';
import { AgGridReact } from 'ag-grid-react';

// https://www.ag-grid.com/react-data-grid/column-updating-definitions/

function GridPage() {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // 그리드 컬럼 데이터
  const [columnDefs] = useState([
    { field: 'make', flex: 2 },
    { field: 'model', flex: 2 },
    { field: 'price', flex: 2 },
    { field: 'total', flex: 1 },
  ]);

  // 그리드 옵션
  const defaultColDef = {
    resizable: true, // 컬럼 사이즈 정렬
    sortable: true, // 정렬
    filter: true, // 필터
  };

  // 그리드 클릭 시, 이벤트
  const cellClickedListener = useCallback((event) => {
    console.log('cellClicked', event);
  }, []);

  // 그리드 버튼 이벤트
  const buttonListener = useCallback(() => {
    gridRef.current.api.deselectAll(); // 선택 해제
  }, []);

  const buttonStateInit = useCallback(() => {
    gridRef.current.api.deselectAll(); // 선택 해제
  }, []);

  const containerStyle = useMemo(() => ({ width: '100%', height: 500 }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  // 서버 통신 -> 데이터 가져옴
  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
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
          <Button
            variant="contained"
            onClick={buttonListener}
            startIcon={<Iconify icon="mdi:checkbox-blank-off-outline" />}
          >
            deselect
          </Button>

          <Button
            variant="contained"
            onClick={buttonStateInit}
            startIcon={<Iconify icon="mdi:checkbox-blank-off-outline" />}
          >
            buttonInit
          </Button>
        </Stack>
        <div style={containerStyle}>
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef} // Ref for accessing Grid's API
              rowData={rowData} // Row Data for Rows
              columnDefs={columnDefs} // Column Defs for Columns
              defaultColDef={defaultColDef} // Default Column Properties
              // rowSelection="multiple" // 클릭시, row선택유지
              onCellClicked={cellClickedListener} // 클릭한 row의 데이터 가져옴
            />
          </div>
        </div>
      </Container>
    </Page>
  );
}

export default GridPage;
