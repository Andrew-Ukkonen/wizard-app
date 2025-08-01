import { Divider, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

type UserAuthenticationProps = {
    defaultTab?: 'signIn' | 'signUp';
};

export default function UserAuthentication({ defaultTab = 'signIn' }: UserAuthenticationProps) {
    const [signIn, setSignIn] = useState(defaultTab === 'signIn');

    const toggleForm = () => {
        setSignIn(!signIn);
    };

    return (
        <Stack
            direction={'column'}
            spacing={2}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: '350px' } }}
        >
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={defaultTab}
                    name="radio-buttons-group"
                    row
                    onChange={toggleForm}
                    sx={{ justifyContent: 'center', mb: 2 }}
                >
                    <FormControlLabel value="signIn" control={<Radio />} label="Sign In" />
                    <FormControlLabel value="signUp" control={<Radio />} label="Sign Up" />
                </RadioGroup>
            </FormControl>
            {signIn ? <SignIn /> : <SignUp />}

            <Divider>OR</Divider>
            <Button
                variant="contained"
                color="secondary"
                size="small"
                sx={{ minWidth: 'fit-content' }}
                disabled
            >
                Try the Demo
            </Button>
        </Stack>
    );
}
