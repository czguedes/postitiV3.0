import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Notification {
    show: boolean;
    message: string;
    success: boolean;
}

const initialState: Notification = {
    show: false,
    message: '',
    success: false,
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(
            state,
            action: PayloadAction<Omit<Notification, 'show'>>,
        ) {
            return {
                show: true,
                ...action.payload,
            };
        },
        hideNotification(state) {
            return initialState;
        },
    },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
