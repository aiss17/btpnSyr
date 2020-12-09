import React, { Component } from 'react'
import { BackHandler, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    backPressed = () => {
		this.props.navigation.goBack();
		return true;
    };

    componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.backPressed);
	}
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    render() {
        return(
            <View>
                <Text>
                    haha
                </Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailUser')}>
                    haha
                </TouchableOpacity>
            </View>
        )
    }
}

export default Home;