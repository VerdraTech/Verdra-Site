import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import { Paper, CircularProgress } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Helmet } from "react-helmet";
import AnalysisResults from "./AnalysisResults"; // Import the new premium results component

// Styled Paper component for the GitHub URL input box
const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  width: "100%",
  maxWidth: "800px",
  borderRadius: "16px",
  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.08)",
  background: "linear-gradient(145deg, #ffffff 0%, #f7f9fc 100%)",
  border: "1px solid rgba(209, 213, 219, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 16px 48px rgba(0, 0, 0, 0.1)",
  },
  ...theme.applyStyles("dark", {
    background: "linear-gradient(145deg, #1e293b 0%, #111827 100%)",
    border: "1px solid rgba(55, 65, 81, 0.5)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25)",
  }),
}));

// Styled form for the GitHub input
const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
}));

// Styled GitHub input
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    transition: "all 0.2s ease",
    fontSize: "0.95rem",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    "&.Mui-focused": {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#039956",
        borderWidth: "2px",
      },
    },
    "& .MuiInputAdornment-root": {
      marginRight: theme.spacing(1),
    },
  },
  ...theme.applyStyles("dark", {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(17, 25, 40, 0.8)",
      "&:hover": {
        backgroundColor: "rgba(26, 32, 44, 0.9)",
      },
      "&.Mui-focused": {
        backgroundColor: "rgba(26, 32, 44, 0.9)",
      },
    },
  }),
}));

// Styled submit button
const SubmitButton = styled(Button)(({ theme }) => ({
  height: 56,
  padding: theme.spacing(0, 4),
  borderRadius: "10px",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "1rem",
  boxShadow: "0 4px 14px rgba(3, 153, 86, 0.25)",
  backgroundColor: "#039956",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#027740",
    boxShadow: "0 6px 20px rgba(3, 153, 86, 0.35)",
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(1px)",
    boxShadow: "0 2px 10px rgba(3, 153, 86, 0.25)",
  },
}));

// Main heading with gradient effect
const GradientTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "gradientAngle",
})<TypographyProps>(({ theme }) => ({
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: 800,
  letterSpacing: "-0.02em",
  backgroundImage: "linear-gradient(90deg, #039956, #06C270)",
  backgroundClip: "text",
  textFillColor: "transparent",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginBottom: theme.spacing(1),
  filter: "drop-shadow(0 2px 4px rgba(3, 153, 86, 0.15))",
}));

// New component for displaying savings message with animation
const SavingsBanner = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(209, 213, 219, 0.3)",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
  textAlign: "center",
  transform: "translateY(0)",
  animation: "fadeInUp 0.8s ease-out",
  "@keyframes fadeInUp": {
    "0%": {
      opacity: 0,
      transform: "translateY(20px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  ...theme.applyStyles("dark", {
    background: "rgba(26, 32, 44, 0.8)",
    border: "1px solid rgba(55, 65, 81, 0.5)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
  }),
}));

export default function Hero() {
  const theme = useTheme();
  const [githubUrl, setGithubUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<{
    dbLoops: any[];
    loggingLoops: any[];
    unusedImports: any[];
    largeImports: any[];
    unusedFunctions: any[];
  } | null>(null);
  const [error, setError] = React.useState(null);
  const [savings, setSavings] = React.useState<number | null>(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Extract the repository path from the GitHub URL
      const repoPath = githubUrl.replace("https://github.com/", "").trim();

      if (!repoPath) {
        throw new Error("Please enter a valid GitHub repository URL");
      }

      console.log("Making API call for repo:", repoPath);

      // Call the API
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/scan?repo_url=https://github.com/${repoPath}`,
        { method: "GET", headers: { Accept: "application/json" } }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data);

      if (data.error) {
        throw new Error(`Analysis error: ${data.error}`);
      }

      // Extract the savings value from the response (if available)
      if (data.savings !== undefined) {
        setSavings(data.savings);
      }

      // Now we directly use the JSON response structure
      setResults({
        dbLoops: data.db_calls_in_loops || [],
        loggingLoops: data.logging_in_loops || [],
        unusedImports: data.unused_imports || [],
        largeImports: data.large_imports || [],
        unusedFunctions: data.unused_functions || [],
      });
    } catch (err: any) {
      console.error("Error during analysis:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Verdra - Changing how we see code</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Roboto+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <Box
        id="hero"
        sx={(theme) => ({
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `
          radial-gradient(ellipse 80% 60% at 50% -10%, rgba(78, 216, 190, 0.25), transparent),
          linear-gradient(to bottom, #ffffff 0%, #f8fafa 100%)
        `,
          ...theme.applyStyles("dark", {
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(6, 194, 112, 0.1), transparent)",
          }),
        })}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 14, sm: 18 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Stack
            spacing={2}
            useFlexGap
            sx={{
              alignItems: "center",
              width: { xs: "100%", sm: "80%", md: "70%" },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                // alignItems: 'center',
                justifyContent: "center",
                fontSize: "clamp(3rem, 8vw, 3.5rem)",
                textAlign: "center",
                width: "100%",
                fontFamily:
                  '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 700,
                // lineHeight: 1.2,
                mb: 2,
              }}
            >
              Let's fix&nbsp;
              <GradientTypography
                component="span"
                variant="h1"
                sx={{
                  fontSize: "inherit",
                }}
              >
                Tech Debt
              </GradientTypography>
            </Typography>

            {/* GitHub URL Input Box */}
            <StyledPaper elevation={0}>
              <Typography
                variant="h5"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  color: "text.primary",
                  fontFamily:
                    '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                  letterSpacing: "-0.01em",
                }}
              >
                Analyze Your Repository
              </Typography>

              <Typography
                sx={{
                  mb: 4,
                  textAlign: "center",
                  color: "text.secondary",
                  maxWidth: "600px",
                  lineHeight: 1.6,
                }}
              >
                Enter your GitHub repository URL to see how Verdra can identify
                and optimize technical debt in your codebase.
              </Typography>

              <StyledForm onSubmit={handleSubmit}>
                <StyledTextField
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
                  error={!!error}
                  helperText={error}
                />

                <SubmitButton
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Analyze"
                  )}
                </SubmitButton>
              </StyledForm>

              {/* Results Display using our premium component */}
              <AnalysisResults results={results} />

              {/* New Savings Banner - shown only after results */}
              {savings !== null && (
              <SavingsBanner>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                    fontWeight: 600,
                    color: "text.primary",
                    display: "inline",
                    lineHeight: 1.5,
                  }}
                >
                  With Verdra, you can save{" "}
                  <GradientTypography
                    component="span"
                    variant="inherit"
                    sx={{
                      fontWeight: 800,
                      display: "inline",
                    }}
                  >
                    ${savings.toFixed(2)}
                  </GradientTypography>{" "}
                  per month
                </Typography>
              </SavingsBanner>
            )}
            </StyledPaper>
          </Stack>
        </Container>
      </Box>
    </>
  );
}