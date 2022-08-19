import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/Iconify';
import axios from 'axios';
import Loader from 'src/components/Loader';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [statusError, setStatusError] = useState(false); // 에러상태메시지
  const [progress, setProgress] = useState(false); // 프로그래스바

  const RegisterSchema = Yup.object().shape({
    nickname: Yup.string().required('User Name required'),
    username: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    nickname: '',
    username: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const confirmClose = () => {
    setOpen(false);
    navigate('/login');
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (login) => {
    // console.log(login);
    setStatusError(false);
    setProgress(true);
    axios
      .post('/api/signup', login)
      .then((response) => {
        // 성공 핸들링
        console.log('====== signup success =======');

        setProgress(false);
        if (response.status === 201) {
          setOpen(true);
        }
      })
      .catch((error) => {
        // 에러 핸들링
        if (error.response.status === 409) {
          setStatusError(true);
        } else {
          alert(error.message);
        }
        setProgress(false);
      });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {/* confirm 창 */}
      <Dialog
        open={open}
        onClose={confirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'회원가입 성공'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            회원가입이 정상적으로 완료 되었습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmClose} autoFocus>
            로그인
          </Button>
        </DialogActions>
      </Dialog>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="nickname" label="User Name" />
        </Stack>

        <RHFTextField name="username" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {statusError && (
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <Alert severity="error" style={{ fontSize: '0.8em', color: 'red' }}>
              가입이 완료된 이메일 입니다.
            </Alert>
          </Stack>
        )}
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
      {progress && <Loader />}
    </FormProvider>
  );
}
