import { IconButton, InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import visuallyHidden from '@mui/utils/visuallyHidden';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useMutation } from '@tanstack/react-query';
import { LoginResponse } from '../types/data/LoginResponse';
import { NetworkResponse } from '../types/data/NetworkResponse';
import { useAuth } from '../contexts/AuthContext';
import { authEndpoints } from '../utils/endpoints';


type FormFields = {
    login: string;
    password: string;
}

export default function SignIn() {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormFields>();
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const mutation = useMutation({
        mutationFn: async (data: FormFields) =>
            fetch(authEndpoints().login(), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }).then(res => res.json())
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            console.log(import.meta.env.VITE_API_URL);
            const response: NetworkResponse<LoginResponse> = await mutation.mutateAsync(data);
            if (response.success && response.data) {
                login(response.data);
            } else {
                console.error(response.message as string);
            }
        } catch (error) {
            console.error(error);
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
                <InputLabel htmlFor="username" sx={visuallyHidden}>
                    Email / Username
                </InputLabel>
                <TextField
                    id="login"
                    hiddenLabel
                    size="small"
                    variant="outlined"
                    aria-label="Enter your email address or username"
                    placeholder="Email / Username"
                    fullWidth
                    slotProps={{
                        htmlInput: {
                            autoComplete: 'off',
                            'aria-label': 'Enter your email address or username',
                        },
                    }}
                    {...register('login', { required: "Email / Username is required" })}
                />
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
                    {...register("password", { required: "Password is required" })}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ minWidth: 'fit-content' }}
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
            </Stack>
        </form>
    );
}
