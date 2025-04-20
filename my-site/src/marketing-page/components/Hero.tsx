import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import visuallyHidden from '@mui/utils/visuallyHidden';
import { styled, useTheme } from '@mui/material/styles';
import { Paper } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Helmet } from 'react-helmet'; 

const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: '6px solid',
  outlineColor: 'hsla(220, 25%, 80%, 0.2)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundImage: `url(${import.meta.env.TEMPLATE_IMAGE_URL || 'https://mui.com'}/static/screenshots/material-ui/getting-started/templates/dashboard.jpg)`,
  backgroundSize: 'cover',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    backgroundImage: `url(${import.meta.env.TEMPLATE_IMAGE_URL || 'https://mui.com'}/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg)`,
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

// Styled Paper component for the GitHub URL input box
const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  width: '100%',
  maxWidth: '800px',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  background: 'linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)',
  border: '1px solid rgba(209, 213, 219, 0.3)',
  ...theme.applyStyles('dark', {
    background: 'linear-gradient(145deg, #1e293b 0%, #111827 100%)',
    border: '1px solid rgba(55, 65, 81, 0.5)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  }),
}));

// Styled form for the GitHub input
const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
}));

export default function Hero() {
  const theme = useTheme();
  const [githubUrl, setGithubUrl] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your API call here
    console.log('Submitting GitHub URL:', githubUrl);
  };

  return (
    <>
    
    <Helmet>
        <title>Verdra - Changing how we see code</title>
        <link rel="icon" href="logoSymbol.png" type="image/svg+xml" />
        {/* Fallback for browsers that don't support SVG favicons */}
        {/* <link rel="alternate icon" href="/logoSymbol.png" type="image/png" /> */}
      </Helmet>

    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
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
            Let's fix&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                color: 'primary.main',
                ...theme.applyStyles('dark', {
                  color: 'primary.light',
                  italicize: true,
                }),
              })}
            >
              Tech Debt
            </Typography>
          </Typography>
          {/* GitHub URL Input Box */}
          <StyledPaper elevation={3}>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              Analyze Your Repository
            </Typography>
            
            <Typography
              sx={{
                mb: 4,
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >
              Enter your GitHub repository URL to see how Verdra can optimize your codebase.
            </Typography>
            
            <StyledForm onSubmit={handleSubmit}>
              <TextField
                fullWidth
                id="github-url"
                variant="outlined"
                placeholder="https://github.com/username/repository"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <GitHubIcon color="action" sx={{ mr: 1 }} />
                  ),
                }}
                sx={{
                  flexGrow: 1,
                }}
              />
              
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  height: 56,
                  px: 4,
                  fontWeight: 600,
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                Analyze
              </Button>
            </StyledForm>
          </StyledPaper>
        </Stack>
      </Container>
    </Box>
    </>

  );
}