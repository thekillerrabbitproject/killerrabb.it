import React, {createContext, useContext, useReducer} from 'react'

export const getCardImage = (imageUrl) => {
  return [{
    name: "twitter:image",
    content: imageUrl,
  }];
}

export const initialState = {
  menu: false,
};

export const StateContext = createContext();

export const reducer = (state, action) => {
  switch (action.type) {
    case 'toggle-menu': 
      return {
        ...state,
        menu: !state.menu,
      };
    case 'open-menu':
      return { menu: true };
    case 'close-menu':
    default:
      return state;
  }
};

export const StateProvider = ({reducer, initialState, children}) =>(
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
