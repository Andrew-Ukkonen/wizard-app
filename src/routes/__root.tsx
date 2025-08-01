import { CssBaseline, Box, Container } from '@mui/material'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import AppAppBar from '../components/AppAppBar'
import Footer from '../components/Footer'
import { UserProvider } from '../contexts/UserContext'
import AppTheme from '../shared-theme/AppTheme'

export const Route = createRootRoute({
    component: () => (
        <>
            <UserProvider>
                <AppTheme>
                    <CssBaseline enableColorScheme />
                    <Box
                        id="hero"
                        sx={(theme) => ({
                            width: '100%',
                            height: '100%',
                            backgroundRepeat: 'no-repeat',

                            backgroundImage:
                                'radial-gradient(ellipse 200% 50% at 50% 0%, hsla(211, 97%, 27%, 1.00), transparent)',
                            ...theme.applyStyles('dark', {
                                backgroundImage:
                                    'radial-gradient(ellipse 200% 50% at 50% 0%, hsl(210, 100%, 16%), transparent)',
                            }),
                        })}
                    >
                        <Container
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                pt: { xs: 14, sm: 20 },
                                pb: { xs: 8, sm: 12 },
                            }}
                        >
                            <AppAppBar />
                            <Outlet />
                            <TanStackRouterDevtools />
                        </Container>
                        <div>
                            <Footer />
                        </div>
                    </Box>
                </AppTheme>
            </UserProvider>
        </>
    ),
})