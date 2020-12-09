import React, { Component } from 'react'
import { BackHandler, Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

class DetailUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            detailUser: this.props.navigation.getParam('data', ''),
            email: '',
            firtsName: '',
            lastName: '',
            avatar: '',
            dataFound: false,
            dataNotFound: false
        }
    }

    backPressed = () => {
		this.props.navigation.goBack();
		return true;
    };

    componentDidMount() {
        this.detailUser()
		BackHandler.addEventListener('hardwareBackPress', this.backPressed);
	}
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    detailUser() {
        if(this.state.detailUser != null) {
            this.setState({
                dataFound: true,
                dataNotFound: false,
                email: this.state.detailUser.email,
                firtsName: this.state.detailUser.first_name,
                lastName: this.state.detailUser.last_name,
                avatar: this.state.detailUser.avatar
            })
        } else {
            this.setState({
                dataFound: false,
                dataNotFound: true
            })
        }
    }

    render() {
        return(
            <View style={{ flex: 1, paddingHorizontal: 25 }}>
                <Image source={{ uri: this.state.avatar}} style={{ height: 300, marginTop: 20 }} resizeMode="contain" />

                <Text style={styles.title} >
                    {this.state.firtsName.toUpperCase() + " " + this.state.lastName.toUpperCase()}
                </Text>

                <TouchableOpacity onPress={() => Linking.openURL('https://mail.google.com/')}>
                    <Text style={styles.email}>
                        {this.state.email}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default DetailUser;

const styles = StyleSheet.create({
    title: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#545454',
        textAlign: 'center'
    },
    email: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'blue',
        textAlign: 'center'
    }
})