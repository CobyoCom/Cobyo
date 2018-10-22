import { types as meActionTypes } from "./meActions";

export const moduleName = "me";

export default function me(state = null, { type, payload }) {
  switch (type) {
    case meActionTypes.fetchMeSuccess:
    case meActionTypes.editMeSuccess: {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
}
