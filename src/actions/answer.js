import { 
  UPDATE_VAL
  } from './typs';

export const updateVal = (data) => {
  return {
    type: UPDATE_VAL,
    data: data
  }
}

