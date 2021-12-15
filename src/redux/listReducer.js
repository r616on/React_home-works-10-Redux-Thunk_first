import { v4 as uuidv4 } from "uuid";

const initialState = {
  services: [
    { id: 1, name: "Замена стекла", price: 21000 },
    { id: 2, name: "Замена дисплея", price: 25000 },
  ],
  loading: "idel",
  error: false,
};

//action={type:"",payload:""}
export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const item = action.payload;
      const newState = {
        ...state,
        items: [...state.items, { ...item, id: uuidv4() }],
      };
      return newState;

    case "EDIT_ITEM":
      const { idItem, itemEdit } = action.payload;
      return {
        ...state,
        items: [
          ...state.items.filter((item) => item.id !== idItem),
          { ...itemEdit, id: idItem },
        ],
      };
    case "FILTER_ITEM":
      const filter = action.payload;
      if (!filter) {
        return { ...state, filterFlag: false };
      } else {
        return {
          ...state,
          filterFlag: true,
          filtered: [
            ...state.items.filter((o) => {
              return o.operation.toLowerCase().startsWith(filter.toLowerCase());
            }),
          ],
        };
      }

    case "DELETE_ITEM":
      const id = action.payload;
      return { ...state, items: state.items.filter((item) => item.id !== id) };

    case "GET_ITEM":
      return {
        ...state,
        services: [...action.payload],
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
}
