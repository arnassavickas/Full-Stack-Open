import React from 'react';
import { HospitalEntry } from '../types';
import { Header, Segment } from 'semantic-ui-react';


type EntryProps = {
  entry: HospitalEntry;
};

const Hospital = ({ entry }: EntryProps) => {
  return (
    <Segment>
      <Header as='h4'>
        {entry.date} <i className='bed icon' />
      </Header>
      <p>{entry.description}</p>
      {entry.discharge ? (
        <div>
          Discharged on {entry.discharge.date}
          <br></br>
          Criteria: {entry.discharge.criteria}
        </div>
      ) : null}
    </Segment>
  );
};

export default Hospital;
