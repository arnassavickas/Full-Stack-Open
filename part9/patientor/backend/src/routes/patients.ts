/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, gender, occupation, ssn } = req.body;
  const newPatient = patientService.addPatient({
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn,
  });
  res.json(newPatient);
});

router.post('/:id/entries', (req, res) => {
  try {
    const updatedPatient = patientService.addEntry(req.params.id, req.body);
    res.json(updatedPatient);
  } catch (e) {
    console.log(e.message);
    res.status(401).json({ error: e.message });
  }
});

export default router;
