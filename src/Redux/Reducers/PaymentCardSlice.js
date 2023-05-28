import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Axios from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_DATA} from '../../constants/Constants';

// const initialState = {
//   cardId: 0,
//   userId: 0,
//   cardHolderName: '',
//   cardNumber: '',
//   cardExpDate: '',
//   isLoading: null,
//   success: null,
//   error: null,
// };
const initialState = {
  cards: [],
  isLoading: null,
  success: null,
  error: null,
};

export const getPaymentCard = createAsyncThunk(
  'paymentCard/getPaymentCard',
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      // let data = await AsyncStorage.getItem(USER_DATA);
      // data = JSON.parse(data);
      // const u_id = data?.user_id;
      // console.log(data)
      const response = await Axios({
        method: 'get',
        url: `/patient/payment_cards.php?user_id=108`,
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const paymentCardSlice = createSlice({
  name: 'paymentCard',
  initialState,
  extraReducers: builder => {
    builder.addCase(getPaymentCard.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPaymentCard.fulfilled, (state, action) => {
      //! another way by Destructuring Array
      /* const [payload] = action.payload;
      // console.log(payload);
      // state.isLoading = false;
      // state.success = true;
      // state.cardId = payload.card_id;
      // state.userId = payload.user_id;
      // state.cardHolderName = payload.card_holder;
      // state.cardNumber = payload.card_number;
      // state.cardExpDate = payload.card_exp_date;
      */
      // TODO send array to global state
      state.cards = action.payload;
      state.isLoading = false;
      state.success = true;
    }),
      builder.addCase(getPaymentCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default paymentCardSlice.reducer;
