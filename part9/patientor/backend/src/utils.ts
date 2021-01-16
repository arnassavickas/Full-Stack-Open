/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  Patient,
  Gender,
  Entry,
  HealthCheckRating,
  HealthCheckEntry,
  Discharge,
  SickLeave,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const toNewPatientEntry = (object: any): Omit<Patient, 'id'> => {
  const newEntry: Omit<Patient, 'id'> = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    entries: [],
  };
  return newEntry;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};
const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};
const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const toHospitalEntry = (object: any): Omit<HospitalEntry, 'id'> => {
  const newEntry: Omit<HospitalEntry, 'id'> = {
    date: parseDate(object.date),
    description: parseDescription(object.description),
    specialist: parseSpecialist(object.specialist),
    type: parseHospitalType(object.type),
    discharge: parseDischarge(object.discharge),
  };
  if (object.diagnosisCodes) {
    newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }
  return newEntry;
};

const toOccupationalHealthcareEntry = (
  object: any
): Omit<OccupationalHealthcareEntry, 'id'> => {
  const newEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
    date: parseDate(object.date),
    description: parseDescription(object.description),
    specialist: parseSpecialist(object.specialist),
    type: parseOccupationalHealthcareType(object.type),
    employerName: parseSpecialist(object.employerName),
  };
  if (object.diagnosisCodes) {
    newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }
  if (object.sickLeave) {
    newEntry.sickLeave = parseSickLeave(object.sickLeave);
  }
  return newEntry;
};

const toHealthCheckEntry = (object: any): Omit<HealthCheckEntry, 'id'> => {
  const newEntry: Omit<HealthCheckEntry, 'id'> = {
    date: parseDate(object.date),
    description: parseDescription(object.description),
    specialist: parseSpecialist(object.specialist),
    type: parseHealthCheckType(object.type),
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
  };
  if (object.diagnosisCodes) {
    newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }
  return newEntry;
};

const parseHospitalType = (type: any): 'Hospital' => {
  switch (type) {
    case 'Hospital':
      return 'Hospital';
    default:
      throw new Error(`Incorrect or missing type: ${type}`);
  }
};

const parseOccupationalHealthcareType = (
  type: any
): 'OccupationalHealthcare' => {
  switch (type) {
    case 'OccupationalHealthcare':
      return 'OccupationalHealthcare';
    default:
      throw new Error(`Incorrect or missing type: ${type}`);
  }
};
const parseHealthCheckType = (type: any): 'HealthCheck' => {
  switch (type) {
    case 'HealthCheck':
      return 'HealthCheck';
    default:
      throw new Error(`Incorrect or missing type: ${type}`);
  }
};

export const toNewEntry = (object: any): Omit<Entry, 'id'> => {
  switch (object.type) {
    case 'Hospital':
      return toHospitalEntry(object);
    case 'OccupationalHealthcare':
      return toOccupationalHealthcareEntry(object);
    case 'HealthCheck':
      return toHealthCheckEntry(object);
    default:
      throw new Error(`Incorrect or missing type: ${object.type}`);
  }
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }
  return description;
};
const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }
  return specialist;
};

const parseDischarge = (discharge: any): Discharge => {
  return {
    date: parseDate(discharge.date),
    criteria: parseDescription(discharge.criteria),
  };
};
const parseSickLeave = (sickLeave: any): SickLeave => {
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
};

const parseDiagnosisCodes = (diagnosisCodes: any): string[] => {
  if (!Array.isArray(diagnosisCodes)) {
    throw new Error(`Incorrect or missing code array: ${diagnosisCodes}`);
  }
  diagnosisCodes.forEach((item) => {
    if (!item || !isString(item)) {
      throw new Error(`Incorrect or missing code: ${item}`);
    }
  });
  return diagnosisCodes.map((code) => parseDescription(code));
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (rating === undefined) {
    throw new Error(`Incorrect or missing !rating: ${rating}`);
  }
  if (!isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing isHealthCheckRating: ${rating}`);
  }
  return rating;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(Number(param));
};
