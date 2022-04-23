// log
import { Dispatch } from 'redux';
import { store } from '../store';

const fetchDataSucces = (payload: any) => {
    return {
        type: 'FETCH_DATA_SUCCESS',
        payload,
    };
};

const fetchDataFailed = (payload: any) => {
    return {
        type: 'FETCH_DATA_FAILED',
        payload: payload,
    };
};

const updateIsWhiteListed = (payload: any) => {
    return {
        type: 'UPDATE_IS_WHITELISTED',
        payload: payload,
    };
};

export const checkIsWhiteListed = (address: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const smartContract = await store.getState().blockchain.smartContract;

            if (smartContract) {
                const isWhiteListed = await smartContract?.methods.isWhiteListed(address).call();

                dispatch(updateIsWhiteListed({ isWhiteListed }));
            } else {
                dispatch(fetchDataFailed({ errorMsg: "Smart contract doesn't exist" }));
            }
        } catch (err) {
            console.log(err);
            dispatch(fetchDataFailed({ errorMsg: err }));
        }
    };
};

export const fetchData = () => {
    return async (dispatch: Dispatch) => {
        try {
            const smartContract = await store.getState().blockchain.smartContract;

            if (smartContract) {
                const superPercentage = await smartContract?.methods.BASE_SUPER_PERCENTAGE().call();

                const maxPerMint = await smartContract?.methods.MAX_PER_MINT().call();

                const nftTax = await smartContract?.methods.NFT_TAX().call();

                const baseSupply = await smartContract?.methods.baseSupply().call();

                const presaleSupply = await smartContract?.methods.presaleSupply().call();

                const maxBaseSupply = await smartContract?.methods.MAX_BASE_SUPPLY().call();

                const maxPresaleSupply = await smartContract?.methods.MAX_PRESALE_SUPPLY().call();

                const totalSupply = await smartContract?.methods.totalSupply().call();

                const presaleOpen = await smartContract?.methods.presaleOpen().call();

                const baseSalesOpen = await smartContract?.methods.baseSalesOpen().call();

                const gameStarted = await smartContract?.methods.gameStarted().call();

                let price = 0;

                if (baseSalesOpen) {
                    price = await smartContract?.methods.BASE_MINT_PRICE().call();
                } else {
                    price = await smartContract?.methods.PRESALE_MINT_PRICE().call();
                }

                dispatch(
                    fetchDataSucces({
                        superPercentage: parseFloat(superPercentage),
                        maxPerMint: parseInt(maxPerMint),
                        nftTax,
                        baseSupply: parseInt(baseSupply),
                        presaleSupply: parseInt(presaleSupply),
                        maxBaseSupply: parseInt(maxBaseSupply),
                        maxPresaleSupply: parseInt(maxPresaleSupply),
                        maxTotalSupply: parseInt(maxBaseSupply) + parseInt(maxPresaleSupply),
                        totalSupply,
                        presaleOpen,
                        baseSalesOpen,
                        gameStarted,
                        price,
                    })
                );
            } else {
                dispatch(fetchDataFailed({ errorMsg: "Smart contract doesn't exist" }));
            }
        } catch (err) {
            console.log(err);
            dispatch(fetchDataFailed({ errorMsg: err }));
        }
    };
};
