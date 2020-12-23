import {
    fetch
  } from '../../utils/dataAccess';
  
  export function error(error) {
    return { type: 'PERIPHERAL_LIST_ERROR', error };
  }
  
  export function loading(loading) {
    return { type: 'PERIPHERAL_LIST_LOADING', loading };
  }
  
  export function success(retrieved) {
    return { type: 'PERIPHERAL_LIST_SUCCESS', retrieved };
  }
  
  export function list(page = '/api/peripheral-devices') {
    return dispatch => {
      dispatch(loading(true));
      dispatch(error(''));
  
      fetch(page)
        .then(response =>
          response
            .json()
            .then(retrieved => (retrieved))
        )
        .then(( retrieved) => {

          dispatch(loading(false));
          dispatch(success(retrieved));
        })
        .catch(e => {
          dispatch(loading(false));
          dispatch(error(e.message));
        });
    };
  }
  
  export function reset(eventSource) {
    return dispatch => {
  
      dispatch({ type: 'PERIPHERAL_LIST_RESET' });
    };
  }
  
  