import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const getCardImage = imageUrl => {
  return [
    {
      name: 'twitter:image',
      content: `https://killerrabb.it${imageUrl}`,
    },
  ];
};

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

export const StateProvider = ({ reducer: r, initialState: is, children }) => (
  <StateContext.Provider value={useReducer(r, is)}>
    {children}
  </StateContext.Provider>
);

StateProvider.propTypes = {
  reducer: PropTypes.func,
  initialState: PropTypes.shape({
    menu: PropTypes.bool,
  }),
  children: PropTypes.node,
};

export const useStateValue = () => useContext(StateContext);

export const defaultPropTypes = {
  data: PropTypes.shape({
    api: PropTypes.shape({
      albums: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
          cover_photo_base_url: PropTypes.string,
          order: PropTypes.number,
          cover_photo: PropTypes.shape({
            ext: PropTypes.string,
            absolutePath: PropTypes.string,
            childImageSharp: PropTypes.shape({
              fluid: PropTypes.object,
            }),
          }),
        })
      ),
    }),
  }),
  pageContext: PropTypes.shape({
    prefix: PropTypes.string,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};
