export const loadState = () => {
    try {
        
        const serializedState = localStorage.getItem('state');
        if(serializedState === null){
            return undefined
        }
        return JSON.parse(serializedState);
    }catch (err){
        return undefined;
    }
}

// Save the store and add in my state for get next time 
// with localstorage in my loadstate
export const saveState = async (state) => {
    try{
        let datas = {user: await state.user, product: await state.product};
        const serializedState = JSON.stringify(datas);
        localStorage.setItem('state', serializedState)
        
    }catch(err){
        
    }
}