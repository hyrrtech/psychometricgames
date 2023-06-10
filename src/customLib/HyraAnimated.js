import {Animated, Easing} from 'react-native';
import createInterpolator from '../utilities/createInterpolator';


function HyraAnimated(){
    this.animatedVal = null;
    this.callbacks = {};
    this.interpolator = null;
    this.Value = (val) => {
        this.animatedVal = new Animated.Value(val);
        return this.animatedVal;
    }
    this.interpolate = (obj) => {
        this.interpolator = createInterpolator(obj.inputRange, obj.outputRange);
        this.addEventListener = function(callback) { 
            const newId = animatedVal.addListener((value) => {
                callback(this.interpolator(value));
                this.callbacks[newId] = callback;
            })
        }
        this.removeEventListener = function(id){
            delete this.callbacks[id];
            this.animatedVal.removeListener(id);
        }
        this.animatedVal.interpolate(obj);
    }
}

export default HyraAnimated;