export const API_CALL_STATUS = {
  INIT: 'INIT',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
};

export const INIT_STATE = 'INIT_STATE'
export const initialState = {
  data: undefined,
  isPending: false,
  errors: undefined,
  status: API_CALL_STATUS.INIT
};

export const reducerBuilder = (successType, failedType, pendingType, initState) => (state = initialState, action = {}) => {
  switch (action.type) {
    case initState:
      return Object.assign({}, initialState);
    case pendingType:
      return Object.assign({}, state, {status: API_CALL_STATUS.PENDING, isPending: true});
    case successType:
      return Object.assign({}, state, {
        status: API_CALL_STATUS.SUCCESS,
        errors: null,
        data: action.payload,
        isPending: false
      });
    case failedType:
      return Object.assign({}, state, {
        status: API_CALL_STATUS.FAILED,
        errors: action.payload,/*(action.payload && action.payload.error) ? action.payload.error : */
        data: null,
        isPending: false
      });
    default:
      return state
  }
};
