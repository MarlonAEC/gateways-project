import { fetch } from '../../utils/dataAccess';

export function error(error) {
  return { type: 'GATEWAY_DELETE_ERROR', error };
}

export function loading(loading) {
  return { type: 'GATEWAY_DELETE_LOADING', loading };
}

export function success(deleted) {
  return { type: 'GATEWAY_DELETE_SUCCESS', deleted };
}

export function del(item) {
    var IRI = '/api/gateways/' + item;
  return dispatch => {
    dispatch(loading(true));

    return fetch(IRI, { method: 'DELETE' })
      .then(() => {
        dispatch(loading(false));
        dispatch(success(item));
      })
      .catch(e => {
        dispatch(loading(false));
        dispatch(error(e.message));
      });
  };
}
