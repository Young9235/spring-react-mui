import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
// material
import {
  Stack,
  Container,
  Typography,
  Grid,
  styled,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Autocomplete,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
// components
import Page from 'src/components/Page';

import instance from 'src/utils/axios-instance';
import Loader from 'src/components/Loader';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Card from '@mui/material/Card';
import { top100Films } from 'src/common/constants';
import MyUploader from 'src/components/file-upload/MyUploader';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function NewBook() {
  const [showPassword, setShowPassword] = useState(false);
  const [ststusError, setStstusError] = useState(false);
  const [progress, setProgress] = useState(false);
  const [age, setAge] = useState('');
  const [price, setPrice] = useState('');

  const selHandleChange = (event) => {
    setAge(event.target.value);
  };
  const priceHandleChange = (event) => {
    let value = event.target.value; // 입력값을 value 라고 선언
    const numCheck = /^[0-9,]/.test(value); // 입력값이 숫자와 콤마(,)인지 확인 (불린값이 나옴)

    if (!numCheck && value) return; // 숫자가 아닌 문자로 이루어져 있으면 pass! (입력이 x)

    if (numCheck) {
      // 숫자이면
      const numValue = value.replaceAll(',', ''); // 잠시 콤마를 때주고
      value = numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 받은 값에 3자리수마다 콤마를 추가
    }

    setPrice(value);
  };
  const LoginSchema = Yup.object().shape({
    username: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    username: '',
    password: '',
    remember: false,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (login) => {};

  return (
    <Page title="User">
      {/* {progress && <Loader />} */}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            도서 등록
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Item>
              <TextField id="outlined-basic" label="도서명" variant="outlined" fullWidth sx={{ mb: 4 }} />
              <TextField
                id="outlined-multiline-static"
                label="내용"
                fullWidth
                multiline
                rows={4}
                defaultValue="Default Value"
                sx={{ mb: 4 }}
              />
              {/* 파일업로드 */}
              <MyUploader />
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item>
              <TextField id="outlined-basic" label="상품 코드" variant="outlined" fullWidth sx={{ mb: 4 }} />
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Category"
                  onChange={selHandleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <Autocomplete
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
                renderInput={(params) => <TextField {...params} label="Tags" />}
              />
            </Item>
            <Item sx={{ mt: 2 }}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor="outlined-adornment-price">Price</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-price"
                  startAdornment={<InputAdornment position="start">￦</InputAdornment>}
                  label="Price"
                  value={price}
                  onChange={priceHandleChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-sale">Sale Price</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-sale"
                  startAdornment={<InputAdornment position="start">￦</InputAdornment>}
                  label="Sale Price"
                />
              </FormControl>
            </Item>
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              color="error"
              component={RouterLink}
              to="/dashboard/book"
              style={{ width: '46%', marginRight: '2%', marginLeft: '2%' }}
            >
              Cencel
            </Button>
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              color="success"
              component={RouterLink}
              to="/"
              style={{ width: '46%', color: '#fff', marginRight: '2%', marginLeft: '2%' }}
            >
              Create Product
            </Button>
          </Grid>
        </Grid>
        {/* <Card sx={{ minWidth: 275 }}>
          dkdkdkd
        </Card> */}
      </Container>
    </Page>
  );
}
