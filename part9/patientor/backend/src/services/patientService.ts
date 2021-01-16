import patientData from '../../data/patients';
import { Patient, PublicPatient, Entry } from '../types';
import { toNewEntry, toNewPatientEntry } from '../utils';

const getEntries = (): Patient[] => {
  return patientData;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  console.log('sending patient');
  return patientData.find((patient) => patient.id === id);
};

const addPatient = (entry: Omit<Patient, 'id' | 'entries'>): Patient => {
  const newPatient = {
    ...toNewPatientEntry(entry),
    id: `${Math.random() * 1000000000000}`,
    entries: [],
  };
  patientData.push(newPatient);

  return newPatient;
};

const addEntry = (id: string, body: Omit<Entry, 'id'>): Entry | undefined => {
  const patient: Patient | undefined = patientData.find(
    (patient) => patient.id === id
  );
  const newEntry = {
    ...toNewEntry(body),
    id: `${Math.random() * 1000000000000}`,
  } as Entry;
  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  addPatient,
  addEntry,
  getNonSensitiveEntries,
  getPatient,
};
