import { useState } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/Iconify';
import Loader from 'src/components/Loader';
import axios from 'axios';
import AuthenticationService from 'src/components/AuthenticationService';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [ststusError, setStstusError] = useState(false);
  const [progress, setProgress] = useState(false);

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

  const onSubmit = async (login) => {
    // console.log(login);
    setStstusError(false);
    setProgress(true);
    axios
      .post('/api/authenticate', login)
      .then((response) => {
        // 성공 핸들링
        console.log('====== login success =======');
        console.log(response);
        AuthenticationService.registerSuccessfulLoginForJwt(
          response.data.accessToken,
          response.data.refreshToken,
        );
        // navigate('/dashboard/app', { replace: true });
        setProgress(false);
      })
      .catch((error) => {
        // 에러 핸들링
        console.log(error);
        if (error.code === 'ERR_NETWORK') {
          alert(error.message);
        } else {
          setStstusError(true);
        }
        setProgress(false);
      });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="username" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      {ststusError && (
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Alert severity="error" style={{ fontSize: '0.8em', color: 'red' }}>
            해당 계정정보가 존재하지 않습니다. 입력 정보를 확인해주세요.
          </Alert>
        </Stack>
      )}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
      {progress && <Loader />}
    </FormProvider>
  );
}
