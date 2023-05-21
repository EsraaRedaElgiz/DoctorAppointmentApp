import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from '../../utils/axios';
import {getPaymentCard} from "../Reducers/PaymentCardSlice"

const initialState = {
  cardHolder: '',
  cardNumber: 0,
  cardExpDate: '',
  isLoading: null,
  error: null,
  success: null,
};

export const AddCardAction = createAsyncThunk(
  'addCard/AddCardAction',
  async (cartData, thunkAPI) => {
    const {rejectWithValue,dispatch} = thunkAPI;
    try {
      console.log('in CreateAsyncThunk ' + JSON.stringify(cartData));
      const response = await Axios({
        method: 'POST',
        url: '/patient/insert_cards.php',
        data: cartData,
      });
      dispatch(getPaymentCard())
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log('Axios ' + error);
      return rejectWithValue(error.message);
    }
  },
);

const AddCardSlice = createSlice({
  name: 'addCard',
  initialState,
  extraReducers: builder => {
    builder.addCase(AddCardAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(AddCardAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(AddCardAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default AddCardSlice.reducer;
