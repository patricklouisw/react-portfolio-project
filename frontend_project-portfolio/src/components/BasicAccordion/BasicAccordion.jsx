import * as React from 'react';
import { motion } from "framer-motion";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const BasicAccordion = ({summary, works}) => {
  return (
    <Accordion style={{width: '100%'}} >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{backgroundColor: '#EDF2F8'}}
      >
        <Typography>{summary}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        {works.map((work, index) => (
          <div key={index}>
            <h4 className="bold-text">{work.name}</h4>
            <p className="p-text" style={{fontWeight:'500'}}>{work.company}</p>
            <hr style={{width: '100%'}} />
            <p className="p-text">{work.desc}</p>
            <br/>
          </div> 
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

export default BasicAccordion;

