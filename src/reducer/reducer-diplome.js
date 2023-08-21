import { createSlice } from "@reduxjs/toolkit";
import { diplomeData } from "./Data";

export const diplomeSlice = createSlice({
    name: "diplomes",
    initialState: {value: diplomeData},
    reducers: {
        addDiplome: (state, action) =>{
            state.value.push(action.payload);
        },

        deleteDiplome: (state, action) =>{
          state.value = state.value.filter((diplome) => diplome.id !== action.payload.id);  
        },
        updateDiplome: (state, action) => {
             state.value.map((diplome) => {
                if(diplome.id === action.payload.id){
                    diplome.np_prop = action.payload.np_prop;
                }
             })
        }
    }
});

export const { addDiplome, deleteDiplome, updateDiplome } = diplomeSlice.actions;
export default diplomeSlice.reducer;