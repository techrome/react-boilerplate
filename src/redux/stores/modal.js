const MODULE_PREFIX = 'modal/';

export const modalTypes = {
  SET_INFO: MODULE_PREFIX + 'SET_INFO',
  RESET: MODULE_PREFIX + 'RESET',
};

export const modalActions = {
  setInfo: (info) => ({
    type: modalTypes.SET_INFO,
    payload: { info },
  }),
  reset: () => ({
    type: modalTypes.RESET,
  }),
};

export const modalSelectors = {
  isOpen: (state) => state.modal.isOpen,
  type: (state) => state.modal.type,
  props: (state) => state.modal.props,
};

const initialState = {
  isOpen: false,
  type: '',
  props: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case modalTypes.SET_INFO: {
      return {
        ...state,
        ...payload.info,
      };
    }
    case modalTypes.RESET: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
};
