import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import OccupationalHealthcareForm, {
  OccupationalHealthcareEntryFormValues,
} from './OccupationalHealthcareForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
        <OccupationalHealthcareForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
