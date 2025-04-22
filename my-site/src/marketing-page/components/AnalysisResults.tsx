import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
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
import GitHubIcon from '@mui/icons-material/GitHub';
import WarningIcon from '@mui/icons-material/Warning';
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import StorageIcon from '@mui/icons-material/Storage';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FunctionsIcon from '@mui/icons-material/Functions';
import TerminalIcon from '@mui/icons-material/Terminal';

// Results Container with modern styling
const ResultsContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafb 100%)',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(230, 235, 240, 0.8)',
  '&:hover': {
    boxShadow: '0 15px 50px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-2px)'
  },
  ...theme.applyStyles('dark', {
    background: 'linear-gradient(145deg, #1a2233 0%, #0d1321 100%)',
    border: '1px solid rgba(45, 55, 72, 0.8)',
  }),
}));

// Styled Category Header
const CategoryHeader = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: 600,
  fontSize: '1.1rem',
  letterSpacing: '0.015em',
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}));

// Styled Accordion for each category
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
      backgroundColor: 'rgba(3, 153, 86, 0.04)',
    },
  },
  '& .MuiAccordionSummary-content': {
    margin: theme.spacing(1, 0),
  },
  '&.Mui-expanded': {
    margin: 0,
    '& .MuiAccordionSummary-root': {
      backgroundColor: 'rgba(3, 153, 86, 0.06)',
    },
  },
}));

// Issue Chip for showing count
const IssueCountChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(3, 153, 86, 0.1)',
  color: '#039956',
  fontWeight: 600,
  height: 24,
  fontSize: '0.75rem',
  marginLeft: theme.spacing(2),
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(6, 194, 112, 0.15)',
  }),
}));

// Issue Item styled component
const IssueItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: theme.spacing(1.5, 1),
  marginBottom: theme.spacing(1),
  borderRadius: '8px',
  backgroundColor: 'rgba(245, 247, 250, 0.7)',
  borderLeft: '3px solid',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(245, 247, 250, 1)',
    transform: 'translateX(4px)',
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(26, 32, 44, 0.5)',
    '&:hover': {
      backgroundColor: 'rgba(26, 32, 44, 0.8)',
      transform: 'translateX(4px)',
    },
  }),
}));

// Issue content styled component
const IssueContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: theme.spacing(2),
}));

// Issue filepath styled component
const IssueFilepath = styled(Typography)(({ theme }) => ({
  fontFamily: '"Roboto Mono", monospace',
  fontSize: '0.85rem',
  fontWeight: 500,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.5),
}));

// Issue details styled component
const IssueDetails = styled(Typography)(({ theme }) => ({
  fontFamily: '"Roboto Mono", monospace',
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

// Detail Chip for line number and name
const DetailChip = styled(Box)(({ theme, variant }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '0.7rem',
  fontWeight: 600,
  backgroundColor: variant === 'line' 
    ? 'rgba(25, 118, 210, 0.1)' 
    : 'rgba(3, 153, 86, 0.1)',
  color: variant === 'line' ? '#1976d2' : '#039956',
  ...theme.applyStyles('dark', {
    backgroundColor: variant === 'line' 
      ? 'rgba(66, 165, 245, 0.15)' 
      : 'rgba(6, 194, 112, 0.15)',
  }),
}));

// Get the icon for each category
const getCategoryIcon = (category) => {
  switch (category) {
    case 'dbLoops':
      return <StorageIcon sx={{ color: "#d32f2f" }} />;
    case 'loggingLoops':
      return <TextSnippetIcon sx={{ color: "#ed6c02" }} />;
    case 'unusedImports':
      return <CodeIcon sx={{ color: "#0288d1" }} />;
    case 'largeImports':
      return <BugReportIcon sx={{ color: "#ed6c02" }} />;
    case 'unusedFunctions':
      return <FunctionsIcon sx={{ color: "#0288d1" }} />;
    default:
      return <CodeIcon sx={{ color: "#0288d1" }} />;
  }
};

// Get the border color for each issue type
const getIssueBorderColor = (category) => {
  switch (category) {
    case 'dbLoops':
      return '#d32f2f';
    case 'loggingLoops':
      return '#ed6c02';
    case 'unusedImports':
      return '#0288d1';
    case 'largeImports':
      return '#ed6c02';
    case 'unusedFunctions':
      return '#0288d1';
    default:
      return '#039956';
  }
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

// Analysis Results component
export default function AnalysisResults({ results }) {
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
        mb: 3
      }}>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            fontWeight: 700,
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            letterSpacing: '-0.01em',
          }}
        >
          Analysis Results
        </Typography>
        
        <Chip
          label={`${totalIssues} ${totalIssues === 1 ? 'issue' : 'issues'} found`}
          variant="outlined"
          color="primary"
          size="small"
          icon={<TerminalIcon style={{ fontSize: 16 }} />}
          sx={{ 
            fontWeight: 600,
            borderColor: 'rgba(3, 153, 86, 0.3)',
            color: '#039956',
          }}
        />
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      {/* Display categories with issues */}
      {Object.entries(results).map(([category, issues]) => {
        if (!issues || issues.length === 0) return null;
        
        return (
          <StyledAccordion key={category} defaultExpanded={category === 'dbLoops'}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#039956' }} />}
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
                  }}
                >
                  <WarningIcon 
                    fontSize="small" 
                    sx={{ 
                      color: getIssueBorderColor(category),
                      mt: 0.5,
                      opacity: 0.8
                    }} 
                  />
                  
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
              color: '#2e7d32',
              fontWeight: 500,
              mb: 1,
            }}
          >
            No issues found in your codebase
          </Typography>
          
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Great job! Your code looks clean and optimized.
          </Typography>
        </Box>
      )}
    </ResultsContainer>
  );
}