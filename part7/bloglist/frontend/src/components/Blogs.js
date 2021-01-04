import React, { useState } from 'react';
import CreateNew from './CreateNew';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  accordion: {
    maxWidth: 400,
  },
}));

const Blogs = ({ blogs }) => {
  const [accordionVisible, setAccordionVisible] = useState(false);
  const classes = useStyles();

  const hideAccordion = () => {
    setAccordionVisible(!accordionVisible);
  };

  return (
    <div>
      <div className={classes.accordion}>
        <Accordion expanded={accordionVisible}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={hideAccordion}
          >
            <Typography>create new</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CreateNew blogs={blogs} hideAccordion={hideAccordion} />
          </AccordionDetails>
        </Accordion>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Typography variant="body1">
                    <Link href={`blogs/${blog.id}`}>{blog.title}</Link>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{blog.author}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blogs;
