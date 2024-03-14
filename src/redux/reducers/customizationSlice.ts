// action - state management
import * as actionTypes from './actions';

interface InitialState {
    isOpen: string[];
    defaultId: string;
    fontFamily: string;
    borderRadius: string;
    opened: boolean;
  }
  

export const initialState:InitialState = {
  isOpen: [], // for active default menu
  defaultId: 'default',
  fontFamily: `Arial, sans-serif`,
  borderRadius:'',
  opened: true
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationSlice = (state = initialState, action:any) => {
  let id;
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      id = action.id;
      return {
        ...state,
        isOpen: [id]
      };
    case actionTypes.SET_MENU:
      return {
        ...state,
        opened: action.opened
      };
    default:
      return state;
  }
};

export default customizationSlice;
