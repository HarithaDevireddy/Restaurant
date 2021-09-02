import { DISHES } from '../components/shared/Dishes'
import { COMMENTS } from '../components/shared/Comments';
import { PROMOTIONS } from '../components/shared/Promotions';
import { LEADERS } from '../components/shared/Leaders';

export const initialState={
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS

}
export const Reducer =(state=initialState,action)=>{
    return state;
}