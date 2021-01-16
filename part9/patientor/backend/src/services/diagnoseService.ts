import diagnoseData from '../../data/diagnoses';
import { DiagnoseEntry } from '../types';

const getEntries = (): DiagnoseEntry[] => {
  return diagnoseData;
};

const addEntry = () => {
  return null;
};

export default { getEntries, addEntry };
