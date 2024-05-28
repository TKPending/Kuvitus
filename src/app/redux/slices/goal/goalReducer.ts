import { PayloadAction } from "@reduxjs/toolkit";

export const changeCurrencyReducer = (
    state: any,
    action: PayloadAction<string>
) => {
    state.currency = action.payload;
};

