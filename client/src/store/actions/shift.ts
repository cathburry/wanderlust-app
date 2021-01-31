import axios from 'axios';
import {
  NEW_SHIFT_ENTRY,
  SHIFT_LIST,
  UPDATE_SHIFT_ENTRY,
  DELETE_SHIFT_ENTRY,
  SHIFT_LIST_BY_ID,
} from '../../constants/actions';

interface ShiftFields {
  name: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  id: string;
  userId: string;
}

/* Create a shift */
export function newShiftEntry(fields: ShiftFields) {
  const request = axios.post('/create', fields);
  return {
    type: NEW_SHIFT_ENTRY,
    payload: request,
  };
}

/* Retrieve all shifts */
export function shiftList() {
  const request = axios.get('/read');
  return {
    type: SHIFT_LIST,
    payload: request,
  };
}

/* Retrieve a shift */
export function shiftListById(id: string) {
  const request = axios.get('/readbyid/', { params: { id } });
  return {
    type: SHIFT_LIST_BY_ID,
    payload: request,
  };
}

/* Update a shift */
export function updateShiftEntry(fields: ShiftFields) {
  const request = axios.put('/update', fields);
  return {
    type: UPDATE_SHIFT_ENTRY,
    payload: request,
  };
}

/* Delete a shift */
export function deleteShiftEntry(entryid: string) {
  const request = axios.delete('/delete', { params: { entryid } });
  return {
    type: DELETE_SHIFT_ENTRY,
    payload: request,
  };
}
