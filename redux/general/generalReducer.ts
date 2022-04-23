const initialState = {
    isLoading: true,
};

const generalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload.isLoading,
            };
        default:
            return state;
    }
};

export default generalReducer;
