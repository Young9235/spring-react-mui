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
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import RHFSwitch from 'src/components/hook-form/RHFSwitch';
import RHFSelect from 'src/components/hook-form/RHFSelect';

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
  const [inStockYn, setInStockYn] = useState(false);
  const [fileData, setFileData] = useState([]);
  const [dayData, setDayData] = useState([]);

  const selectBoxData = [
    { id: 'CD-0000', value: 'CHO', label: '소설/문학' },
    { id: 'CD-0001', value: 'STR', label: '잡지/시사/이슈' },
    { id: 'CD-0002', value: 'VAN', label: '어린이/아동' },
  ];

  // yup 벨리데이션 처리
  const schema = Yup.object().shape({
    bookNm: Yup.string().required('도서명은 필수 값입니다.'),
    productCode: Yup.string().required('상품코드는 필수 값입니다.'),
    inStockYn: Yup.boolean(),
    inStockCnt: Yup.number().when('inStockYn', {
      is: true,
      then: Yup.number().typeError('재고 수는 필수 값입니다.').min(1, '1 이상 입력해주세요.'),
    }),
    category: Yup.string().required('카테고리는 필수 값입니다.'),
  });

  // 파일 업로드시 값 셋팅
  // const arrData = [];
  const fileMemo = useMemo(() => {
    return [];
  }, []);

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
    if (status === 'done') {
      fileMemo.push(meta);
      // console.log(fileMemo);
    }
    if (status === 'removed') {
      const delData = meta.id; // 삭제 된 id
      // object 배열 요소에서 id값에 따른 인덱스 리턴
      const idx = fileMemo.findIndex((item) => {
        return item.id === delData;
      });
      fileMemo.splice(idx, 1);
      console.log(fileMemo);
    }
  };

  useEffect(() => {
    setFileData(fileMemo);
  }, [fileMemo]);

  const defaultValues = {
    bookNm: '',
    authNm: '',
    description: '',
    productCode: '',
    publicDate: dayjs().format('YYYY-MM-DD'),
    inStockYn: true,
    inStockCnt: 0,
    price: '',
    category: '',
    uploadFile: '',
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
    register,
    formState: { errors },
  } = methods;

  // 폼 전송
  const onSubmit = async (data) => {
    data.fileData = fileData;
    data.publicDate = dayData;
    console.log(data);
  };

  // 날짜 format 셋팅
  const date = watch('publicDate');
  useEffect(() => {
    const formatDate = dayjs(date).format('YYYY-MM-DD');
    console.log(formatDate);
    setDayData(formatDate);
  }, [date]);

  // 재고 유무 스위치
  const inStockSwitch = watch('inStockYn');
  useEffect(() => {
    // console.log('inStockYn', inStockSwitch);
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

  const priceVal = watch('price');
  useEffect(() => {
    let value = priceVal; // 입력값을 value 라고 선언
    const numCheck = /^[0-9,]/.test(value); // 입력값이 숫자와 콤마(,)인지 확인 (불린값이 나옴)
    if (numCheck) {
      // 숫자이면
      const numValue = value.replaceAll(',', ''); // 잠시 콤마를 때주고
      value = numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 받은 값에 3자리수마다 콤마를 추가
      setValue('price', value);
    } else {
      setValue('price', '');
    }
  }, [priceVal, setValue]);

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
                        // type="datetime-local"
                        renderInput={(params) => (
                          // dayjs(params).format('YYYY-MM-DD')
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
                  type="file"
                  multiple="multiple"
                  styles={{ dropzone: { minHeight: 200, maxHeight: 350 } }}
                />
                <input {...register('uploadFile')} type="file" multiple="multiple" />
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
                  <RHFSelect
                    name="category"
                    label="Category"
                    options={selectBoxData}
                    style={{ textAlign: 'left' }}
                    errors={errors.category?.message}
                  />
                </FormControl>
                <Controller
                  name="tags"
                  control={control}
                  defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
                  render={({ field: { ref, onChange, ...field } }) => (
                    <Autocomplete
                      // limitTags={2}
                      multiple
                      id="multiple-limit-tags"
                      options={top100Films}
                      onChange={(_, data) => onChange(data)}
                      getOptionLabel={(option) => option.title}
                      defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
                      renderInput={(params) => (
                        <TextField {...params} {...field} inputRef={ref} label="Tags" />
                      )}
                    />
                  )}
                />
                <FormGroup>
                  <RHFSwitch name="inStockYn" label={inStockLabel.label} sx={{ mb: 1, mt: 1 }} />
                  {inStockYn && (
                    <RHFTextField
                      label="재고 수"
                      type="number"
                      name="inStockCnt"
                      // outline fild
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                    />
                  )}
                </FormGroup>
              </Item>
              <Item sx={{ mt: 2 }}>
                <FormControl fullWidth>
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
