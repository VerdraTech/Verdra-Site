import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { 
  Paper, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Chip,
  Divider
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import StorageIcon from '@mui/icons-material/Storage';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FunctionsIcon from '@mui/icons-material/Functions';
import TerminalIcon from '@mui/icons-material/Terminal';

// Enhanced color palette for dark mode
const colors = {
  light: {
    background: 'linear-gradient(145deg, #ffffff 0%, #f8fafb 100%)',
    itemBackground: 'rgba(245, 247, 250, 0.7)',
    itemHoverBackground: 'rgba(245, 247, 250, 1)',
    border: 'rgba(230, 235, 240, 0.8)',
    accordionHover: 'rgba(3, 153, 86, 0.04)',
    accordionExpanded: 'rgba(3, 153, 86, 0.06)',
    chipBackground: 'rgba(3, 153, 86, 0.1)',
    lineChipBackground: 'rgba(25, 118, 210, 0.1)',
    codeChipBackground: 'rgba(3, 153, 86, 0.1)',
  },
  dark: {
    // Pure grey background for better visibility in dark mode
    background: '#2A2F3E',
    resultsHeaderBackground: '#36394A',
    // More visible item backgrounds with higher contrast
    itemBackground: 'rgba(43, 49, 67, 0.9)',
    itemHoverBackground: 'rgba(49, 56, 77, 0.95)',
    border: 'rgba(58, 65, 83, 0.9)',
    // Enhanced hover states for better visibility with green tint
    accordionHover: 'rgba(6, 182, 112, 0.2)',
    accordionExpanded: 'rgba(6, 182, 112, 0.25)',
    chipBackground: 'rgba(6, 182, 112, 0.3)',
    lineChipBackground: 'rgba(37, 67, 109, 0.25)',
    codeChipBackground: 'rgba(6, 182, 112, 0.3)',
    // Greener highlights for better visibility
    greenText: '#06C270',
    lightGreenText: '#4ade80',
    expandedArea: '#282C3A',
  }
};

// Enhanced category colors for dark mode with improved visibility
const categoryColors = {
  light: {
    dbLoops: '#d32f2f',
    loggingLoops: '#ed6c02',
    unusedImports: '#0288d1',
    largeImports: '#ed6c02',
    unusedFunctions: '#0288d1'
  },
  dark: {
    // Brighter colors for better contrast in dark mode
    dbLoops: '#FF5252',
    loggingLoops: '#FFB74D',
    unusedImports: '#64B5F6',
    largeImports: '#FFB74D',
    unusedFunctions: '#64B5F6'
  }
};

// Enhanced Results Container with modern styling and improved dark mode
const ResultsContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  border: `1px solid ${colors.light.border}`,
  '&:hover': {
    boxShadow: '0 15px 50px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-2px)'
  },
  ...(theme.palette.mode === 'dark' && {
    background: colors.dark.background,
    border: `1px solid ${colors.dark.border}`,
    // Enhanced shadow for dark mode
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    '&:hover': {
      boxShadow: '0 15px 50px rgba(0, 0, 0, 0.4)',
      transform: 'translateY(-2px)'
    }
  }),
}));

// Enhanced Accordion for each category with improved dark mode
const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  '&:before': {
    display: 'none', // Remove the default divider
  },
  '& .MuiAccordionSummary-root': {
    minHeight: 56,
    padding: theme.spacing(0, 1),
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: colors.light.accordionHover,
    },
  },
  '& .MuiAccordionSummary-content': {
    margin: theme.spacing(1, 0),
  },
  '&.Mui-expanded': {
    margin: 0,
    '& .MuiAccordionSummary-root': {
      backgroundColor: colors.light.accordionExpanded,
    },
  },
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: colors.dark.background,
    margin: '0 0 8px 0',
    borderRadius: '8px',
    '& .MuiAccordionSummary-root': {
      borderBottom: '1px solid rgba(6, 194, 112, 0.2)',
      '&:hover': {
        backgroundColor: colors.dark.accordionHover,
      },
    },
    '&.Mui-expanded': {
      '& .MuiAccordionSummary-root': {
        backgroundColor: colors.dark.accordionExpanded,
      },
      '& .MuiAccordionDetails-root': {
        backgroundColor: colors.dark.expandedArea,
      },
    },
  }),
}));

// Enhanced Issue Chip with improved visibility in dark mode
const IssueCountChip = styled(Chip)(({ theme }) => ({
  backgroundColor: colors.light.chipBackground,
  color: '#039956',
  fontWeight: 600,
  height: 24,
  fontSize: '0.75rem',
  marginLeft: theme.spacing(2),
  ...(theme.palette.mode === 'dark' && {
    // Use a more vibrant background color that contrasts with dark mode
    backgroundColor: 'rgba(6, 194, 112, 0.35)',
    // Use a brighter text color for better visibility
    color: '#4AEDC4',
    // Enhanced visibility in dark mode with a stronger glow
    boxShadow: '0 0 10px rgba(6, 194, 112, 0.4)',
  }),
}));

// Enhanced Issue Item for better dark mode appearance
const IssueItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: theme.spacing(1.5, 1),
  marginBottom: theme.spacing(1),
  borderRadius: '8px',
  backgroundColor: colors.light.itemBackground,
  borderLeft: '3px solid',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: colors.light.itemHoverBackground,
    transform: 'translateX(4px)',
  },
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: colors.dark.itemBackground,
    // Add subtle glow to items in dark mode
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      backgroundColor: colors.dark.itemHoverBackground,
      transform: 'translateX(4px)',
      // Enhanced hover effect in dark mode
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    },
  }),
}));

// Warning icon container for better alignment
const WarningIconContainer = styled(Box)(({ theme, categoryColor }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: 'transparent',
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  }),
}));

// Enhanced Issue content with better visibility in dark mode
const IssueContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: theme.spacing(2),
}));

// Enhanced Issue filepath with improved readability in dark mode
const IssueFilepath = styled(Typography)(({ theme }) => ({
  fontFamily: '"Roboto Mono", monospace',
  fontSize: '0.85rem',
  fontWeight: 500,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.5),
  ...(theme.palette.mode === 'dark' && {
    color: 'rgba(255, 255, 255, 0.95)',
    // Text shadow for better readability in dark mode
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
  }),
}));

// Enhanced Issue details with better contrast in dark mode
const IssueDetails = styled(Typography)(({ theme }) => ({
  fontFamily: '"Roboto Mono", monospace',
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  ...(theme.palette.mode === 'dark' && {
    color: 'rgba(255, 255, 255, 0.75)',
  }),
}));

// Enhanced Category Header with improved contrast for dark mode
const CategoryHeader = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: 600,
  fontSize: '1.1rem',
  letterSpacing: '0.015em',
  // color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  ...(theme.palette.mode === 'dark' && {
    // Enhanced visibility in dark mode with green tint
    color: colors.dark.greenText,
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
  }),
}));

// Enhanced Detail Chip with improved visibility in dark mode
const DetailChip = styled(Box)(({ theme, variant }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '0.7rem',
  fontWeight: 600,
  backgroundColor: variant === 'line' 
    ? colors.light.lineChipBackground 
    : colors.light.codeChipBackground,
  color: variant === 'line' ? '#1976d2' : '#039956',
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: variant === 'line' 
      ? colors.dark.lineChipBackground 
      : colors.dark.codeChipBackground,
    color: variant === 'line' ? '#58a6ff' : '#06C270',
    // Enhanced visibility with subtle glow
    boxShadow: variant === 'line'
      ? '0 0 8px rgba(56, 139, 253, 0.25)'
      : '0 0 8px rgba(6, 194, 112, 0.25)',
  }),
}));

// Get the icon for each category
const getCategoryIcon = (category) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const colors = isDark ? categoryColors.dark : categoryColors.light;
  
  switch (category) {
    case 'dbLoops':
      return <StorageIcon sx={{ color: colors.dbLoops }} />;
    case 'loggingLoops':
      return <TextSnippetIcon sx={{ color: colors.loggingLoops }} />;
    case 'unusedImports':
      return <CodeIcon sx={{ color: colors.unusedImports }} />;
    case 'largeImports':
      return <BugReportIcon sx={{ color: colors.largeImports }} />;
    case 'unusedFunctions':
      return <FunctionsIcon sx={{ color: colors.unusedFunctions }} />;
    default:
      return <CodeIcon sx={{ color: colors.unusedImports }} />;
  }
};

// Get the border color for each issue type
const getIssueBorderColor = (category) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const colors = isDark ? categoryColors.dark : categoryColors.light;
  
  return colors[category] || (isDark ? '#06C270' : '#039956');
};

// Get the category display name
const getCategoryName = (category) => {
  switch (category) {
    case 'dbLoops':
      return 'DB Calls in Loops';
    case 'loggingLoops':
      return 'Logging in Loops';
    case 'unusedImports':
      return 'Unused Imports';
    case 'largeImports':
      return 'Large Imports';
    case 'unusedFunctions':
      return 'Unused Functions';
    default:
      return category;
  }
};

// Enhanced Analysis Results component with better dark mode support
export default function AnalysisResults({ results }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  // If no results, return null
  if (!results) return null;
  
  // Count total issues
  const totalIssues = Object.values(results).reduce((total, issues) => total + issues.length, 0);
  
  return (
    <ResultsContainer elevation={0}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3,
        p: 2,
        backgroundColor: isDark ? '#323845' : 'transparent', // Darker grey
        borderRadius: '8px 8px 0 0',
        boxShadow: isDark ? '0 2px 8px rgba(0, 0, 0, 0.3)' : 'none',
      }}>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            fontWeight: 700,
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            letterSpacing: '-0.01em',
            // Enhanced visibility in dark mode
            ...(isDark && {
              color: '#06C270', // Green text for better visibility
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
            }),
          }}
        >
          Analysis Results
        </Typography>
        
        <Chip
          label={`${totalIssues} ${totalIssues === 1 ? 'issue' : 'issues'} found`}
          variant="outlined"
          size="small"
          icon={<TerminalIcon style={{ fontSize: 16 }} />}
          sx={{ 
            fontWeight: 600,
            borderColor: isDark ? 'rgba(6, 194, 112, 0.6)' : 'rgba(3, 153, 86, 0.3)',
            color: isDark ? '#06C270' : '#039956',
            backgroundColor: isDark ? 'rgba(6, 194, 112, 0.15)' : 'transparent',
            // Enhanced appearance in dark mode
            ...(isDark && {
              boxShadow: '0 0 10px rgba(6, 194, 112, 0.2)',
            }),
          }}
        />
      </Box>
      
      <Divider sx={{ 
        mb: 3, 
        opacity: isDark ? 0.4 : 0.8,
        // Enhance divider visibility in dark mode
        ...(isDark && {
          borderColor: 'rgba(6, 194, 112, 0.3)',
        }),
      }} />
      
      {/* Display categories with issues */}
      {Object.entries(results).map(([category, issues]) => {
        if (!issues || issues.length === 0) return null;
        
        return (
          <StyledAccordion key={category} defaultExpanded={category === 'dbLoops'}>
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon 
                  sx={{ 
                    color: isDark ? '#06C270' : '#039956',
                    // Enhanced visibility in dark mode
                    ...(isDark && {
                      filter: 'drop-shadow(0 0 2px rgba(6, 194, 112, 0.3))',
                    }),
                  }} 
                />
              }
              aria-controls={`${category}-content`}
              id={`${category}-header`}
            >
              <CategoryHeader>
                {getCategoryIcon(category)}
                {getCategoryName(category)}
                <IssueCountChip 
                  label={issues.length} 
                  size="small"
                />
              </CategoryHeader>
            </AccordionSummary>
            
            <AccordionDetails sx={{ pt: 1, pb: 2 }}>
              {issues.map((issue, index) => (
                <IssueItem 
                  key={index}
                  sx={{ 
                    borderLeftColor: getIssueBorderColor(category),
                    // Enhanced border glow in dark mode
                    ...(isDark && {
                      borderLeft: `3px solid ${getIssueBorderColor(category)}`,
                      boxShadow: `0 0 8px ${getIssueBorderColor(category)}30`,
                    }),
                  }}
                >
                  <WarningIconContainer categoryColor={getIssueBorderColor(category)}>
                    <WarningIcon 
                      fontSize="small" 
                      sx={{ 
                        color: getIssueBorderColor(category),
                        opacity: isDark ? 1 : 0.8,
                        // Enhanced icon visibility in dark mode
                        ...(isDark && {
                          filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))',
                        }),
                      }} 
                    />
                  </WarningIconContainer>
                  
                  <IssueContent>
                    <IssueFilepath>
                      {issue.filepath}
                    </IssueFilepath>
                    
                    <IssueDetails>
                      <DetailChip variant="line">
                        line {issue.line}
                      </DetailChip>
                      
                      <DetailChip>
                        {issue.name}
                      </DetailChip>
                    </IssueDetails>
                  </IssueContent>
                </IssueItem>
              ))}
            </AccordionDetails>
          </StyledAccordion>
        );
      })}
      
      {/* Display "No issues" message if no issues found */}
      {totalIssues === 0 && (
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center', 
            py: 6,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: isDark ? '#4ade80' : '#2e7d32',
              fontWeight: 500,
              mb: 1,
              // Enhanced visibility in dark mode
              ...(isDark && {
                textShadow: '0 0 10px rgba(74, 222, 128, 0.3)',
              }),
            }}
          >
            No issues found in your codebase
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
            }}
          >
            Great job! Your code looks clean and optimized.
          </Typography>
        </Box>
      )}
    </ResultsContainer>
  );
}