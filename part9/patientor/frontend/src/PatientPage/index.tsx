import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Header, Button } from 'semantic-ui-react';

import Hospital from '../components/Hospital';
import OccupationalHealthcare from '../components/OccupationalHealthcare';
import HealthCheck from '../components/HealthCheck';
import { Patient, Entry, assertNever } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, updatePatient, addEntry } from '../state';
import HealthCheckModal from '../HealthCheckModal';
import { HealthCheckEntryFormValues } from '../HealthCheckModal/HealthCheckForm';
import HospitalModal from '../HospitalModal';
import { HospitalEntryFormValues } from '../HospitalModal/HospitalForm';
import OccupationalHealthcareModal from '../OccupationalHealthcareModal';
import { OccupationalHealthcareEntryFormValues } from '../OccupationalHealthcareModal/OccupationalHealthcareForm';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<Patient | undefined>();

  const [
    modalOpenHealthCheck,
    setOpenHealthCheckModalOpen,
  ] = React.useState<boolean>(false);
  const [modalOpenHospital, setOpenHospitalModalOpen] = React.useState<boolean>(
    false
  );
  const [
    modalOpenOccupationalHealthcare,
    setOpenOccupationalHealthcareModalOpen,
  ] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openHealthCheckModal = (): void => setOpenHealthCheckModalOpen(true);
  const openHospitalModal = (): void => setOpenHospitalModalOpen(true);
  const openOccupationalHealthcareModal = (): void =>
    setOpenOccupationalHealthcareModalOpen(true);

  const closeModalHealthCheck = (): void => {
    setOpenHealthCheckModalOpen(false);
    setError(undefined);
  };
  const closeModalHospital = (): void => {
    setOpenHospitalModalOpen(false);
    setError(undefined);
  };
  const closeModalOccupationalHealthcare = (): void => {
    setOpenOccupationalHealthcareModalOpen(false);
    setError(undefined);
  };

  const submitHealthCheckEntry = async (values: HealthCheckEntryFormValues) => {
    const date = new Date(values.date);
    const newValues = {
      ...values,
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    };
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        newValues
      );
      dispatch(addEntry(id, newEntry));
      closeModalHealthCheck();
    } catch (e) {
      console.error(e.response.data.error);
      setError(e.response.data.error);
    }
  };
  const submitHospitalEntry = async (values: HospitalEntryFormValues) => {
    const date = new Date(values.date);
    const dischargeDate = new Date(values.discharge.date);
    const newValues = {
      ...values,
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      discharge: {
        criteria: values.discharge.criteria,
        date: `${dischargeDate.getFullYear()}-${
          dischargeDate.getMonth() + 1
        }-${dischargeDate.getDate()}`,
      },
    };
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        newValues
      );
      dispatch(addEntry(id, newEntry));
      closeModalHospital();
    } catch (e) {
      console.error(e.response.data.error);
      setError(e.response.data.error);
    }
  };
  const submitOccupationalHealthcareEntry = async (
    values: OccupationalHealthcareEntryFormValues
  ) => {
    const date = new Date(values.date);

    const newValues = {
      ...values,
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    };
    if (newValues.sickLeave && values.sickLeave) {
      const startDate = new Date(values.sickLeave.startDate);
      newValues.sickLeave.startDate = `${startDate.getFullYear()}-${
        startDate.getMonth() + 1
      }-${startDate.getDate()}`;

      const endDate = new Date(values.sickLeave.endDate);
      newValues.sickLeave.endDate = `${endDate.getFullYear()}-${
        endDate.getMonth() + 1
      }-${endDate.getDate()}`;
    }
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        newValues
      );
      dispatch(addEntry(id, newEntry));
      closeModalOccupationalHealthcare();
    } catch (e) {
      console.error(e.response.data.error);
      setError(e.response.data.error);
    }
  };

  React.useEffect(() => {
    if (patients[id]) {
      if ('ssn' in patients[id]) {
        setPatient(patients[id]);
      } else {
        const fetchPatientWithSsn = async () => {
          try {
            const { data: patientWithSsn } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`
            );
            setPatient(patientWithSsn);
            dispatch(updatePatient(patientWithSsn));
          } catch (e) {
            console.error(e);
          }
        };
        fetchPatientWithSsn();
      }
    }
  }, [patients, id, dispatch]);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <Container text>
        <Header as='h2'>
          {patient.name}
          <i
            className={`${
              patient.gender === 'male'
                ? 'man'
                : patient.gender === 'female'
                ? 'woman'
                : 'venus mars'
            } icon`}
          ></i>
        </Header>

        <Container>ssn: {patient.ssn}</Container>
        <Container>occupation: {patient.occupation}</Container>
        <Header as='h3'>entries</Header>
        <Button onClick={() => openHealthCheckModal()}>Health Check</Button>
        <Button onClick={() => openOccupationalHealthcareModal()}>
          Occupational Healthcare
        </Button>
        <Button onClick={() => openHospitalModal()}>Hospital</Button>
        {patient.entries.map((entry) => {
          return <EntryDetails key={entry.id} entry={entry} />;
        })}
      </Container>
      <HealthCheckModal
        modalOpen={modalOpenHealthCheck}
        onSubmit={submitHealthCheckEntry}
        error={error}
        onClose={closeModalHealthCheck}
      />
      <OccupationalHealthcareModal
        modalOpen={modalOpenOccupationalHealthcare}
        onSubmit={submitOccupationalHealthcareEntry}
        error={error}
        onClose={closeModalOccupationalHealthcare}
      />
      <HospitalModal
        modalOpen={modalOpenHospital}
        onSubmit={submitHospitalEntry}
        error={error}
        onClose={closeModalHospital}
      />
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  console.log('here');
  console.log(entry.type);
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    default:
      console.log(entry);
      return assertNever(entry);
  }
};

export default PatientPage;
