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
            const minerContract = await store.getState().blockchain.minerContract;

            if (minerContract) {
                const isWhiteListed = await minerContract?.methods.isWhiteListed(address).call();

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
            const minerContract = await store.getState().blockchain.minerContract;

            if (minerContract) {
                const superPercentage = await minerContract?.methods.BASE_SUPER_PERCENTAGE().call();

                const maxPerMint = await minerContract?.methods.MAX_PER_MINT().call();

                const nftTax = await minerContract?.methods.NFT_TAX().call();

                const baseSupply = await minerContract?.methods.baseSupply().call();

                const presaleSupply = await minerContract?.methods.presaleSupply().call();

                const maxBaseSupply = await minerContract?.methods.MAX_BASE_SUPPLY().call();

                const maxPresaleSupply = await minerContract?.methods.MAX_PRESALE_SUPPLY().call();

                const totalSupply = await minerContract?.methods.totalSupply().call();

                const presaleOpen = await minerContract?.methods.presaleOpen().call();

                const baseSalesOpen = await minerContract?.methods.baseSalesOpen().call();

                const gameStarted = await minerContract?.methods.gameStarted().call();

                let price = 0;

                if (baseSalesOpen) {
                    price = await minerContract?.methods.BASE_MINT_PRICE().call();
                } else {
                    price = await minerContract?.methods.PRESALE_MINT_PRICE().call();
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
