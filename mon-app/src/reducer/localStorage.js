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

export const saveState = async (state) => {
    try{
        console.log(state);
        let datas = {user: await state.user, product: await state.product};
        const serializedState = JSON.stringify(datas);
        localStorage.setItem('state', serializedState)
        
    }catch(err){
        
    }
}