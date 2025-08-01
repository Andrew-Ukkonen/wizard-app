import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

export default function Hero() {
  return (
    <>
      <Stack
        spacing={2}
        useFlexGap
        sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
      >
        <Typography
          variant="h1"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            fontSize: 'clamp(3rem, 10vw, 3.5rem)',
          }}
        >
          <Typography
            component="span"
            variant="h1"
            sx={(theme) => ({
              fontSize: 'inherit',
              color: 'primary.main',
              ...theme.applyStyles('dark', {
                color: 'primary.light',
              }),
            })}
          >
            Wizard
          </Typography>
          &nbsp;Idler
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            width: { sm: '100%', md: '80%' },
          }}
        >
          Join over 1,000 players and create a spellbook from over 100 spells!
          Battle and level up against other players and enjoy the story with
          over 300 missions. After joining one of the many specializations, you can
          study and alter your spell line-up and earn rewards. The game is free to play,
          with optional in-game purchases.
        </Typography>
        <Divider />
      </Stack>
    </>
  );
}
