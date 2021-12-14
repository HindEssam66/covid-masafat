import {getDistance} from 'geolib';
import * as Location from "expo-location";
//import * as Permissions from "expo-permissions";
import HomeMaps from './HomeMaps';

export default class Locc extends Component
{
    state = {
        destinationLat: 31.96315,
        destinationLong: 35.930359,
        distance:null,
        startLat:32.0538,
        startLong:35.9114
    };
    async componentDidMount(){
        
        let location = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true,
        });

        const region = {
            latitude: lat,
            longitude: lgtd,

        }

        this.setState({
            startLat: region.latitude,
            startLong: region.longitude,
          });
        var dis = getDistance(
            {latitude: region.latitude, longitude: region.longitude},
            {latitude: this.state.destinationLat, longitude: this.state.destinationLong},
          );
          try {
              if (dis < 2)
            this.setState({
                distance: dis,
              });
            }
        catch (err) {
              
                Platform.OS=="android"? ToastAndroid.showWithGravity(err.message, Toast.LONG, Toast.TOP):
                Alert.alert(err.message);
                }
                console.log(dis);
    };



    render(){
        return(
            <Text>{this.state.distance} Ms</Text>
        );
    }
}