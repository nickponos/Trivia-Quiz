
import { UPDATE_VAL } from '../actions/typs';

const initialState = {
  selected_values: {
    "radio_vals": [
      { "value": "" },
      { "value": "" },
      { "value": "" },
      { "value": "" },
      { "value": "" },
      { "value": "" },
      { "value": "" },
      { "value": "" },
      { "value": "" },
      { "value": "" },
    ]
  },
};

const testReducer = (state = initialState, action) => {
  const {data} = action;
  switch (action.type) {
    case UPDATE_VAL:
      state.selected_values.radio_vals[data.index].value = data.value;
      return state;
    default:
      return state;
  }
};

export default testReducer;