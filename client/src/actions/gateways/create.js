import { SubmissionError } from 'redux-form'; 
import { fetch } from '../../utils/dataAccess';

export function error(error) {
  console.log(error);
  return { type: 'GATEWAY_CREATE_ERROR', error };
}

export function loading(loading) {
  return { type: 'GATEWAY_CREATE_LOADING', loading };
}

export function success(created) {
  return { type: 'GATEWAY_CREATE_SUCCESS', created };
}

export function create(values) { 
  console.log("ESTOY EN EL CREATE", values);
  return dispatch => {
    dispatch(loading(true));

    return fetch('/api/gateways', { method: 'POST', body: JSON.stringify(values) })
      .then(response => {
        dispatch(loading(false));
        console.log(response);
        if(response.status === 201)
          return response.json();
        else
          throw new Error(response);
      })
      .then(retrieved => dispatch(success(retrieved)))
      .catch(e => {
        dispatch(loading(false));
        // if (e instanceof SubmissionError) {
        //   dispatch(error(e.message));
        //   throw e;
        // }

        dispatch(error(e.message));
      });
  };
}

export function reset() {
  return dispatch => {
    dispatch(loading(false));
    dispatch(error(null));
  };
}
