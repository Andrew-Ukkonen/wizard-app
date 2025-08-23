import { IconButton, InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import visuallyHidden from '@mui/utils/visuallyHidden';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AUTH_ENDPOINTS } from '../utils/endpoints';
import CircularProgress from '@mui/material/CircularProgress';

const schema = z.object({
    email: z.email(),
    username: z.string().min(4, { message: "Username must be at least 4 characters long" }).max(20, { message: "Username must not exceed 20 characters" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(20, { message: "Password must not exceed 20 characters" }),
    confirmPassword: z.string()
}).superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
        ctx.addIssue({
            path: ['confirmPassword'],
            code: 'custom',
            message: "Passwords do not match"
        });
    }
});

type FormFields = z.infer<typeof schema>;

export default function SignUp() {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>({ resolver: zodResolver(schema) });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const signUpRequest = async (data: FormFields) => {
        setIsLoading(true);
        try {
            const response = await fetch(AUTH_ENDPOINTS.REGISTER, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            setIsLoading(false);
            return result;
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    };

    const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
        try {
            const response = await signUpRequest(data);
            if (!response) {
                setError("root", { message: "Something went wrong. Please try again later." });
                return;
            }

            if (!response.success) {
                if (response.error) {
                    for (const error of response.error) {
                        let errorLocation = error.error !== 'exception' ? error.error : 'root';
                        setError(errorLocation, { message: error.message });
                    }
                    return;
                }

                setError('root', { message: "Registration failed" });
                return;
            }

            console.log('Registration successful:', response);
        } catch (error) {
            console.error(error as string);
            setError("root", { message: "Something went wrong. Please try again later." });
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Prevents focus change on button click
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
                direction={'column'}
                spacing={1}
                useFlexGap
                sx={{ pt: 2, width: { xs: '100%', sm: '350px' } }}
            >
                {isLoading && (
                    <Stack alignItems="center" sx={{ py: 2 }}>
                        <CircularProgress size={32} />
                    </Stack>
                )}
                <InputLabel htmlFor="email" sx={visuallyHidden}>
                    Email
                </InputLabel>
                <TextField
                    id="email"
                    hiddenLabel
                    size="small"
                    variant="outlined"
                    aria-label="Enter your email address"
                    placeholder="Email"
                    fullWidth
                    slotProps={{
                        htmlInput: {
                            autoComplete: 'off',
                            'aria-label': 'Enter your email address',
                        },
                    }}
                    {...register('email')}
                />
                {errors.email &&
                    <Typography
                        variant="subtitle2"
                        color="error">{errors.email.message}</Typography>
                }
                <InputLabel htmlFor="username" sx={visuallyHidden}>
                    Username
                </InputLabel>
                <TextField
                    id="username"
                    hiddenLabel
                    size="small"
                    variant="outlined"
                    aria-label="Enter your username"
                    placeholder="Username"
                    fullWidth
                    slotProps={{
                        htmlInput: {
                            autoComplete: 'off',
                            'aria-label': 'Enter your username',
                        },
                    }}
                    {...register('username')}
                />
                {errors.username &&
                    <Typography
                        variant="subtitle2"
                        color="error">{errors.username.message}</Typography>
                }
                <InputLabel htmlFor="password" sx={visuallyHidden}>
                    Password
                </InputLabel>
                <TextField
                    id="password"
                    hiddenLabel
                    size="small"
                    variant="outlined"
                    aria-label="Enter your password"
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    slotProps={{
                        htmlInput: {
                            autoComplete: 'off',
                            'aria-label': 'Enter your password',
                        },
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        sx={{ border: 'none !important', backgroundColor: 'transparent !important' }}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }
                    }}
                    {...register("password")}
                />
                {errors.password &&
                    <Typography
                        variant="subtitle2"
                        color="error">{errors.password.message}</Typography>
                }
                <InputLabel htmlFor="confirm-password" sx={visuallyHidden}>
                    Confirm Password
                </InputLabel>
                <TextField
                    id="confirm-password"
                    hiddenLabel
                    size="small"
                    variant="outlined"
                    aria-label="Confirm your password"
                    placeholder="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    slotProps={{
                        htmlInput: {
                            autoComplete: 'off',
                            'aria-label': 'Enter your password',
                        },
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        sx={{ border: 'none !important', backgroundColor: 'transparent !important' }}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }
                    }}
                    {...register("confirmPassword")}
                />
                {errors.confirmPassword &&
                    <Typography
                        variant="subtitle2"
                        color="error">{errors.confirmPassword.message}</Typography>
                }
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ minWidth: 'fit-content' }}
                    type="submit"
                    disabled={isSubmitting}
                >
                    Register
                </Button>
                {errors.root &&
                    <Typography
                        variant="subtitle2"
                        color="error">{errors.root.message}</Typography>
                }
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ textAlign: 'center' }}
                >
                    By clicking &quot;Register&quot; you agree to our&nbsp;
                    <Link href="#" color="primary">
                        Terms & Conditions
                    </Link>
                    .
                </Typography>
            </Stack>
        </form>
    );
}
