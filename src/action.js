//Enable add new key Enum
export const Action = Object.freeze({
    LoadMemories: 'LoadMemories',
    FinishAddingOrder:'FinishAddingOrder',
    EnterEditMode:'EnterEditMode',
    LeaveEditMode:'LeaveEditMode',
    FinishSavingOrder: 'FinishSavingOrder',
    FinishDeletingOrder: 'FinishDeletingOrder',
    StartWaiting: 'StartWaiting',
});

//Action Creaters 
export function startWaiting(){
    return {
        type:Action.StartWaiting,
    };
}

export function loadMemories(memories){
    return {
        type:Action.LoadMemories,
        payload: memories,
    };
}

export function finishAddingOrder(memory){
    return {
        type:Action.FinishAddingOrder,
        payload: memory,
    };
}

export function enterEditMode(memory){
    return {
        type:Action.EnterEditMode,
        payload: memory,
    };
}

export function leaveEditMode(memory){
    return {
        type:Action.LeaveEditMode,
        payload: memory,
    };
}

export function finishSavingOrder(memory){
    return {
        type:Action.FinishSavingOrder,
        payload: memory,
    };
}

export function finishDeletingOrder(memory){
    return {
        type:Action.FinishDeletingOrder,
        payload: memory,
    };
}

function checkForErrors(response){
    if(!response.ok){
        throw Error(`${response.status}: ${response.statusText}`);
    }
    return response;
}

const host = 'https://zhuj3128.duckdns.org:8442';

export function loadDay(month,day){
    // return function
    return dispatch => {
        //run background
        dispatch(startWaiting());
        fetch(`${host}/memories/${month}/${day}`)
        .then(checkForErrors)
        .then(response=>response.json())
        .then(data=>{
            if(data.ok){
                console.log(data.memories);
               dispatch(loadMemories(data.memories));
            }
        })
        .catch(e=>console.error(e));
    }
}

export function startAddingOrder(year,month,day){
    const memory = {year,month,day,message:''};
    const options = {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(memory),
    }
    return dispatch => {
        dispatch(startWaiting());
        fetch(`${host}/memories`,options)
        .then(checkForErrors)
        .then(response=>response.json())
        .then(data=>{
            if(data.ok){
               memory.id = data.id;
               dispatch(finishAddingOrder(memory));
            }
        })
        .catch(e=>console.error(e));
    }
}

export function startSavingOrder(memory){
    const options = {
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(memory),
    }
    return dispatch => {
        dispatch(startWaiting());
        fetch(`${host}/memories/${memory.id}`,options)
        .then(checkForErrors)
        .then(response=>response.json())
        .then(data=>{
            if(data.ok){
               dispatch(finishSavingOrder(memory));
            }
        })
        .catch(e=>console.error(e));
    };
}

export function startDeletingOrder(memory){
    const options = {
        method:'DELETE',
    };
    return dispatch => {
        dispatch(startWaiting());
        fetch(`${host}/memories/${memory.id}`, options)
        .then(checkForErrors)
        .then(response=>response.json())
        .then(data=>{
            if(data.ok){
               dispatch(finishDeletingOrder(memory));
            }
        })
        .catch(e=>console.error(e));
    };
}