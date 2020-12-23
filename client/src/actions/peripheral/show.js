import {
    fetch
  } from '../../utils/dataAccess';
  
  export function error(error) {
    return { type: 'PERIPHERAL_SHOW_ERROR', error };
  }
  
  export function loading(loading) {
    return { type: 'PERIPHERAL_SHOW_LOADING', loading };
  }
  
  export function success(retrieved) {
    return { type: 'PERIPHERAL_SHOW_SUCCESS', retrieved };
  }
  
  export function show(page) {
    page = '/api/peripheral-devices/' + page;
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
  
      dispatch({ type: 'PERIPHERAL_SHOW_RESET' });
    };
  }
  
  