import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQ() {
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded((prev) =>
        isExpanded
          ? [...prev, panel]
          : prev.filter((item) => item !== panel)
      );
    };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: 'text.primary',
          width: '100%',
          textAlign: 'center',
        }}
      >
        FAQ
      </Typography>

      <Box sx={{ width: '100%' }}>
        {/* Developer Panel */}
        <Accordion
          expanded={expanded.includes('panel1')}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span" variant="subtitle2">
              Who are the developers?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" gutterBottom>
              Northwestern CS Grads
              <br /><br />
              <Link
                href="https://www.linkedin.com/in/isaacsun1/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Isaac Sun
              </Link>
              <br />
              <Link
                href="https://www.linkedin.com/in/mkli/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mark Li
              </Link>
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Technology Panel */}
        <Accordion
          expanded={expanded.includes('panel2')}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" variant="subtitle2">
              What's the technology behind Verdra?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" gutterBottom>
              Verdra’s MVP uses lightweight static analysis built in Python to scan serverless
              functions for common performance issues like database calls inside loops, large or
              unused imports, and over-provisioned memory. By analyzing the abstract syntax tree
              (AST) and control flow without running the code, Verdra helps developers catch
              inefficiencies early in the development process.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}
