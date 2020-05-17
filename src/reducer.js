// Take in old state of data store collaborate with action and perform a new state of data 

import {Action} from "./action";
const initialState = {
    // download waitting flag
    isWaiting: false,
    memories : [],
};



function reducer(state = initialState, action){
    // return first initial state
    switch(action.type){
        case Action.LoadMemories:
            return{
                ...state,
                isWaiting: false,
                //action
                memories:action.payload,
            };
        case Action.FinishAddingOrder:
            return{
                 ...state,
                 isWaiting: false,
                 //action
                memories: [{...action.payload, isEditing:true},...state.memories],
            };
        case Action.EnterEditMode:
            return{
                ...state,
                memories: state.memories.map(memory=>{
                    if(memory.id === action.payload.id){
                        return {...memory,isEditing: true};
                  }else{
                        return memory;
                   }
                }),
            };
         case Action.LeaveEditMode:
            return{
                ...state,
                memories: state.memories.map(memory=>{
                    if(memory.id === action.payload.id){
                        return {...memory,isEditing: undefined};
                        //desapear
                    }else{
                        return memory;
                    }
                 }),
            };
        case Action.FinishSavingOrder:
            return{
                ...state,
                isWaiting: false,
                memories: state.memories.map(memory=>{
                    if(memory.id === action.payload.id){
                        return action.payload;
                        //desapear
                    }else{
                        return memory;
                    }
                }),
            };
        case Action.FinishDeletingOrder:
            return{
                ...state,
                isWaiting: false,
                memories: state.memories.filter(memory=> memory.id !== action.payload.id),
        };
        case Action.StartWaiting:
                return{
                ...state,
                isWaiting: true,
        };
        default:
            return state;
        }
}


//only thing exported 
export default reducer;