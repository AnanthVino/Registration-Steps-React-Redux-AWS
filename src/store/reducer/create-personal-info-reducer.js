/**
 * 
 * Code implementation
 * @Author Ananth Gunasekarapandiyan
 * @Email ananth1626p@gmail.com
 * 
 */

 const setPersonalReducer = (state = { data: {} }, action) => {
    switch (action.type) {
        case "CREATEPERSONALDETAILS":
            state["data"]["personal"] = action.data;
            return state; 
        case "CREATEOFFICEDETAILS":
            state["data"]["office"] = action.data;
            return state; 
        case "CREATESIGNATUREURL":
            state["data"]["signature"] = action.data;
            return state;
        case "CREATEIMAGEURL":
            state["data"]["image"] = action.data;
            return state; 
        default:
            return state;
    }
};
  
export default setPersonalReducer;
