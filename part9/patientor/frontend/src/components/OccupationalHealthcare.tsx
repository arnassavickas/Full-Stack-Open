import React from 'react';
import { Entry } from '../types';
import { Header, Segment } from 'semantic-ui-react';

type EntryProps = {
  entry: Entry;
};

const OccupationalHealthcare = ({ entry }: EntryProps) => {
  return (
    <Segment>
      <Header as='h4'>
        {entry.date} <i className='doctor icon' />
      </Header>
      <p>{entry.description}</p>
      {entry.type !== 'OccupationalHealthcare' ? null : entry.sickLeave ? (
        <div>
          Sick leave: from {entry.sickLeave.startDate} to{' '}
          {entry.sickLeave.endDate}
        </div>
      ) : null}
    </Segment>
  );
};

export default OccupationalHealthcare;
