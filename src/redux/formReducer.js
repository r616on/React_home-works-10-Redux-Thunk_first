const initialState = { name: "", price: "", content: "" };

//action={type:"",payload:""}
export default function formReducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_FORM_VALUES":
      const { fild, value } = action.payload;
      return { ...state, [fild]: value };
    case "CHANGE_FORM_INIT":
      return initialState;
    case "CHANGE_FORM_IN_ITEM":
      return action.payload;
    default:
      return state;
  }
}
