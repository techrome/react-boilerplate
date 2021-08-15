import uniqueId from 'lodash/uniqueId';

const MODULE_PREFIX = 'alerts/';

export const alertsTypes = {
  ADD_ALERT: MODULE_PREFIX + 'ADD_ALERT',
  CLOSE_ALERT: MODULE_PREFIX + 'CLOSE_ALERT',
  REMOVE_ALERT: MODULE_PREFIX + 'REMOVE_ALERT',
};

export const alertsActions = {
  addAlert: (info) => ({
    type: alertsTypes.ADD_ALERT,
    payload: { ...info, key: info.options?.key || uniqueId('alert-') },
  }),
  closeAlert: (key) => ({
    type: alertsTypes.CLOSE_ALERT,
    payload: {
      dismissAll: !key, // dismiss all if no there's no key
      key,
    },
  }),
  removeAlert: (key) => ({
    type: alertsTypes.REMOVE_ALERT,
    payload: { key },
  }),
};

export const alertSelectors = {
  alerts: (state) => state.alerts.alerts,
};

const initialState = {
  alerts: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case alertsTypes.ADD_ALERT:
      return {
        ...state,
        alerts: [
          ...state.alerts,
          {
            key: payload.key,
            ...payload,
          },
        ],
      };

    case alertsTypes.CLOSE_ALERT:
      return {
        ...state,
        alerts: state.alerts.map((alert) =>
          payload.dismissAll || alert.key === payload.key
            ? { ...alert, dismissed: true }
            : { ...alert },
        ),
      };

    case alertsTypes.REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.key !== payload.key),
      };

    default: {
      return state;
    }
  }
};
