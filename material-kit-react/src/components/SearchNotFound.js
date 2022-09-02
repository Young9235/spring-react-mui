import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        입력된 값을 확인해주세요. &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. 해당 데이터 결과가 없습니다.
      </Typography>
    </Paper>
  );
}
