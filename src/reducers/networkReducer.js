import { UPDATE_NETWORK_STATUS } from '../action/types';

export function setNetworkAction(connected, connectionType) {
    return {
      type: UPDATE_NETWORK_STATUS,
      connected,
      connectionType,
    };
  }
  
  const initialState = {
    connected: true,
    connectionType: 'none',
  };
  
  export default NetworkReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_NETWORK_STATUS:
        return {
          ...state,
          connected: action.connected,
          connectionType: action.connectionType,
        };
      default:
        return state;
    }
  }