import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { alpha, useTheme } from "@mui/material/styles";

interface SignupProps {
  // Optional props for customization
  title?: string;
  buttonText?: string;
}

export default function Signup({
  title = "Sign Up For Our Launch",
  buttonText = "Join Beta",
}: SignupProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Primary color for both light and dark modes
  const accentColor = isDarkMode ? "#4ED8BE" : "#0D9373";
  const headingColor = isDarkMode ? "#F9FAFB" : "#1A3C34";
  const lightAccent = isDarkMode
    ? "rgba(78, 216, 190, 0.15)"
    : "rgba(13, 147, 115, 0.15)";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Replace with your actual API endpoint for Google Sheets
      const response = await fetch("/api/beta-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, organization, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit. Please try again.");
      }

      setSuccess(true);
      setName("");
      setOrganization("");
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 12, md: 16 },
        background: isDarkMode
          ? "linear-gradient(to bottom, transparent 0%, rgba(200, 255, 242, 0.03) 30%, rgba(200, 255, 242, 0.08) 50%, rgba(200, 255, 242, 0.03) 70%, transparent 100%)"
          : "linear-gradient(to bottom, transparent 0%, rgba(13, 147, 115, 0.03) 30%, rgba(13, 147, 115, 0.08) 50%, rgba(13, 147, 115, 0.03) 70%, transparent 100%)",
        overflow: "hidden",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Enhanced background elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: isDarkMode ? 0.08 : 0.04,
          backgroundImage: `radial-gradient(circle at 25px 25px, ${
            isDarkMode ? "#fff" : "#000"
          } 2%, transparent 0%)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating circles decoration */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${
            isDarkMode ? "rgba(78, 216, 190, 0.1)" : "rgba(13, 147, 115, 0.1)"
          } 0%, ${
            isDarkMode ? "rgba(78, 216, 190, 0)" : "rgba(13, 147, 115, 0)"
          } 70%)`,
          animation: "float 15s infinite ease-in-out",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0) scale(1)" },
            "50%": { transform: "translateY(-20px) scale(1.05)" },
          },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          right: "8%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${
            isDarkMode ? "rgba(78, 216, 190, 0.08)" : "rgba(13, 147, 115, 0.08)"
          } 0%, ${
            isDarkMode ? "rgba(78, 216, 190, 0)" : "rgba(13, 147, 115, 0)"
          } 70%)`,
          animation: "float2 18s infinite ease-in-out",
          "@keyframes float2": {
            "0%, 100%": { transform: "translateY(0) scale(1)" },
            "50%": { transform: "translateY(20px) scale(1.05)" },
          },
        }}
      />

      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              fontWeight: 700,
              // lineHeight: 1.2,
              mb: 2,
            }}
          >
            {title}
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              maxWidth: 600,
              width: "100%",
              mx: "auto",
              borderRadius: 4,
              backgroundColor: isDarkMode
                ? "rgba(26, 32, 44, 0.9)"
                : "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              boxShadow: isDarkMode
                ? "0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)"
                : "0 10px 40px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)",
              transform: "translateY(0)",
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: isDarkMode
                  ? "0 16px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.07)"
                  : "0 16px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            {success ? (
              <Alert
                severity="success"
                icon={false}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  py: 3,
                  fontWeight: 500,
                  fontSize: "1.1rem",
                  backgroundColor: isDarkMode
                    ? alpha(accentColor, 0.15)
                    : alpha(accentColor, 0.1),
                  color: accentColor,
                  border: "1px solid",
                  borderColor: isDarkMode
                    ? alpha(accentColor, 0.3)
                    : alpha(accentColor, 0.2),
                }}
              >
                <Typography variant="h6" mb={1} fontWeight={600}>
                  Thank you for signing up!
                </Typography>
                <Typography>
                  We're excited to have you on board. We'll be in touch soon
                  with next steps.
                </Typography>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <Box sx={{ mb: 1 }}>
                    <Typography
                      component="label"
                      htmlFor="name"
                      sx={{
                        display: "block",
                        mb: 1.5,
                        ml: 1,
                        color: isDarkMode ? "#E2E8F0" : "#1E293B",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    >
                      Name{" "}
                      <Box component="span" sx={{ color: accentColor }}>
                        *
                      </Box>
                    </Typography>
                    <TextField
                      id="name"
                      fullWidth
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      InputProps={{
                        sx: {
                          py: 1.5,
                          fontSize: "1rem",
                          caretColor: accentColor,
                          backgroundColor: isDarkMode
                            ? alpha("#1E293B", 0.3)
                            : alpha("#f8fafc", 0.8),
                          "&:hover": {
                            backgroundColor: isDarkMode
                              ? alpha("#1E293B", 0.5)
                              : "#f8fafc",
                          },
                          "&.Mui-focused": {
                            backgroundColor: isDarkMode
                              ? alpha("#1E293B", 0.5)
                              : "#f8fafc",
                          },
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: accentColor,
                            borderWidth: 2,
                            boxShadow: `0 0 0 4px ${alpha(accentColor, 0.1)}`,
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: alpha(accentColor, 0.5),
                          },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: isDarkMode ? "#2D3748" : "#E0E5EB",
                          borderWidth: 1.5,
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 1 }}>
                    <Typography
                      component="label"
                      htmlFor="organization"
                      sx={{
                        display: "block",
                        mb: 1.5,
                        ml: 1,
                        color: isDarkMode ? "#E2E8F0" : "#1E293B",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    >
                      Organization
                    </Typography>
                    <TextField
                      id="organization"
                      fullWidth
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="University, Company, Student, etc"
                      InputProps={{
                        sx: {
                          py: 1.5,
                          fontSize: "1rem",
                          caretColor: accentColor,
                          backgroundColor: isDarkMode
                            ? alpha("#1E293B", 0.3)
                            : alpha("#f8fafc", 0.8),
                          "&:hover": {
                            backgroundColor: isDarkMode
                              ? alpha("#1E293B", 0.5)
                              : "#f8fafc",
                          },
                          "&.Mui-focused": {
                            backgroundColor: isDarkMode
                              ? alpha("#1E293B", 0.5)
                              : "#f8fafc",
                          },
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: accentColor,
                            borderWidth: 2,
                            boxShadow: `0 0 0 4px ${alpha(accentColor, 0.1)}`,
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: alpha(accentColor, 0.5),
                          },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: isDarkMode ? "#2D3748" : "#E0E5EB",
                          borderWidth: 1.5,
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      component="label"
                      htmlFor="email"
                      sx={{
                        display: "block",
                        mb: 1.5,
                        ml: 1,
                        color: isDarkMode ? "#E2E8F0" : "#1E293B",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    >
                      Email{" "}
                      <Box component="span" sx={{ color: accentColor }}>
                        *
                      </Box>
                    </Typography>
                    <TextField
                      id="email"
                      fullWidth
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={!!error}
                      helperText={error}
                      placeholder="your.email@example.com"
                      InputProps={{
                        sx: {
                          py: 1.5,
                          fontSize: "1rem",
                          caretColor: accentColor,
                          backgroundColor: isDarkMode
                            ? alpha("#1E293B", 0.3)
                            : alpha("#f8fafc", 0.8),
                          "&:hover": {
                            backgroundColor: isDarkMode
                              ? alpha("#1E293B", 0.5)
                              : "#f8fafc",
                          },
                          "&.Mui-focused": {
                            backgroundColor: isDarkMode
                              ? alpha("#1E293B", 0.5)
                              : "#f8fafc",
                          },
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: accentColor,
                            borderWidth: 2,
                            boxShadow: `0 0 0 4px ${alpha(accentColor, 0.1)}`,
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: alpha(accentColor, 0.5),
                          },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: isDarkMode ? "#2D3748" : "#E0E5EB",
                          borderWidth: 1.5,
                        },
                        "& .MuiFormHelperText-root": {
                          margin: "8px 0 0 10px",
                          fontSize: "0.85rem",
                          fontWeight: 500,
                          color: isDarkMode ? "#FC8181" : "#E53E3E",
                        },
                      }}
                    />
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      py: 2,
                      px: 6,
                      mt: 2,
                      fontWeight: 600,
                      fontSize: "1rem",
                      borderRadius: 2,
                      textTransform: "none",
                      background: isDarkMode
                        ? "linear-gradient(90deg, #56F5CD 0%, #4ED8BE 100%)"
                        : "linear-gradient(90deg, #0B7D61 0%, #0D9373 100%)",
                      color: "#111827",

                      boxShadow: isDarkMode
                        ? "0 4px 14px rgba(78, 216, 190, 0.3)"
                        : "0 4px 14px rgba(13, 147, 115, 0.2)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      "&:hover": {
                        background: isDarkMode
                          ? "linear-gradient(90deg, #42BDA5 0%, #4ED8BE 100%)"
                          : "linear-gradient(90deg, #0B7D61 0%, #0D9373 100%)",
                        boxShadow: isDarkMode
                          ? "0 6px 20px rgba(78, 216, 190, 0.4)"
                          : "0 6px 20px rgba(13, 147, 115, 0.3)",
                        transform: "translateY(-2px)",
                      },
                      "&:active": {
                        transform: "translateY(1px)",
                        boxShadow: isDarkMode
                          ? "0 2px 10px rgba(78, 216, 190, 0.3)"
                          : "0 2px 10px rgba(13, 147, 115, 0.2)",
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: "#ffffff" }} />
                    ) : (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {buttonText}
                        <Box
                          component="span"
                          sx={{
                            ml: 1,
                            display: "inline-block",
                            width: "20px",
                            height: "20px",
                            background: "rgba(255,255,255,0.2)",
                            borderRadius: "50%",
                            position: "relative",
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-35%, -50%)",
                              width: "8px",
                              height: "8px",
                              borderTop: "2px solid #fff",
                              borderRight: "2px solid #fff",
                              // transform: 'translate(-35%, -50%) rotate(45deg)',
                            },
                          }}
                        />
                      </Box>
                    )}
                  </Button>
                </Stack>
              </form>
            )}
          </Paper>

          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 4,
              maxWidth: "600px",
              mx: "auto",
              px: 2,
              zIndex: 2,
              position: "relative",
            }}
          >
            By joining our Beta, you'll be first to experience our platform and
            have direct influence on future features. We respect your privacy
            and will never share your information.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
