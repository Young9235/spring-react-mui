import { useEffect, useMemo, useState } from 'react';
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
  FormGroup,
  FormHelperText,
} from '@mui/material';
// components
import Page from 'src/components/Page';

import instance from 'src/utils/axios-instance';
import Loader from 'src/components/Loader';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Card from '@mui/material/Card';
import { top100Films } from 'src/common/constants';
import MyUploader from 'src/components/file-upload/MyUploader';
import Dropzone from 'react-dropzone-uploader';
import { FormProvider, RHFOutlineInputField, RHFTextField } from 'src/components/hook-form';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import RHFSwitch from 'src/components/hook-form/RHFSwitch';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function NewBook() {
  const [ststusError, setStstusError] = useState(false);
  const [progress, setProgress] = useState(false);
  const [age, setAge] = useState('');
  const [price, setPrice] = useState('');
  const [inStockYn, setInStockYn] = useState(false);

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

  // yup 벨리데이션 처리
  const schema = Yup.object().shape({
    bookNm: Yup.string().required('도서명은 필수 값입니다.'),
    productCode: Yup.string().required('상품코드는 필수 값입니다.'),
    inStockYn: Yup.boolean(),
    inStockCnt: Yup.number().when('inStockYn', {
      is: true,
      then: Yup.number().typeError('재고 수는 필수 값입니다.').min(1, '1 이상 입력해주세요.'),
    }),
  });

  const fileData = [];
  // 파일 업로드시 값 셋팅
  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
    if (status === 'done') {
      fileData.push(meta);
    }
  };

  const defaultValues = {
    bookNm: '',
    authNm: '',
    description: '내용을 입력해주세요',
    productCode: '',
    publicDate: dayjs().format('YYYY-MM-DD'),
    inStockYn: true,
    inStockCnt: 0,
    price: '',
    salePrice: '',
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };

  // 재고 유무 스위치
  const inStockSwitch = watch('inStockYn');
  useEffect(() => {
    console.log('inStockYn', inStockSwitch);
    if (inStockSwitch) {
      setInStockYn(true);
    } else {
      setInStockYn(false);
      setValue('inStockCnt', 0);
    }
  }, [inStockSwitch, setValue]);

  const inStockLabel = useMemo(() => {
    return {
      label: inStockYn ? '재고 있음' : '재고 없음',
    };
  }, [inStockYn]);

  return (
    <Page title="User">
      {/* {progress && <Loader />} */}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            도서 등록
          </Typography>
        </Stack>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Item>
                <RHFTextField name="bookNm" label="도서명 *" variant="outlined" fullWidth sx={{ mb: 2 }} />
                <RHFTextField
                  name="authNm"
                  label="작가명"
                  variant="outlined"
                  sx={{ mb: 2, width: '48%', mr: '2%' }}
                />
                {/* 달력 이벤트 공통으로 안뺌 */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="publicDate"
                    control={control}
                    render={({ field }) => (
                      <DesktopDatePicker
                        {...field}
                        label="출간 날짜"
                        inputFormat="YYYY-MM-DD"
                        mask={'____-__-__'}
                        type="datetime-local"
                        renderInput={(params) => (
                          <TextField {...params} sx={{ mb: 2, width: '48%', mr: '2%' }} />
                        )}
                      />
                    )}
                  />
                </LocalizationProvider>
                <RHFTextField name="description" fullWidth label="내용" multiline rows={4} sx={{ mb: 2 }} />
                {/* 파일업로드 */}
                <Dropzone
                  onChangeStatus={handleChangeStatus}
                  accept="image/*"
                  styles={{ dropzone: { minHeight: 200, maxHeight: 350 } }}
                />
              </Item>
            </Grid>
            <Grid item xs={12} md={4}>
              <Item>
                <RHFTextField
                  name="productCode"
                  label="상품 코드"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Category"
                    onChange={selHandleChange}
                    style={{ textAlign: 'left' }}
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
                <FormGroup>
                  <RHFSwitch name="inStockYn" label={inStockLabel.label} sx={{ mb: 1, mt: 1 }} />
                  {inStockYn && (
                    <RHFTextField
                      label="재고 수"
                      type="number"
                      name="inStockCnt"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                    />
                  )}
                </FormGroup>
              </Item>
              <Item sx={{ mt: 2 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <RHFTextField
                    label="Price"
                    name="price"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">￦</InputAdornment>,
                    }}
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
              {/* 프로젝트 생성 */}
              <Button
                sx={{ mt: 2 }}
                variant="contained"
                color="success"
                style={{ width: '46%', color: '#fff', marginRight: '2%', marginLeft: '2%' }}
                type="submit"
              >
                Create Product
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
        {/* <Card sx={{ minWidth: 275 }}>
          dkdkdkd
        </Card> */}
      </Container>
    </Page>
  );
}
