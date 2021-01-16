import React from 'react';
import { HealthCheckEntry } from '../types';
import { Header, Segment } from 'semantic-ui-react';
import Heart from './Heart';

type EntryProps = {
  entry: HealthCheckEntry;
};

const HealthCheck = ({ entry }: EntryProps) => {
  return (
    <Segment>
      <Header as='h4'>
        {entry.date} <i className='zoom icon' />
      </Header>
      <p>{entry.description}</p>
      {entry.healthCheckRating !== undefined ? (
        <Heart healthCheckRating={entry.healthCheckRating} />
      ) : null}
    </Segment>
  );
};

export default HealthCheck;
