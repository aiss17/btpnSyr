import React, { Component } from 'react'
import { 
    Alert,
    BackHandler, FlatList, Image, StyleSheet, Text, TouchableOpacity, View 
} from 'react-native';
import axios from 'axios'

class ListUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listUser: [],
            isFetching: false,
            page: 1
        }
    }

    logicalTest() {
        let dalamSumur = 20;
        let siangNaik = 5;
        let malamTurun = 4;
        let manjat = 0;
        let banyakHari = 0;

        for(var i = 1; i <= dalamSumur; i++) {
            if(manjat < dalamSumur && manjat != dalamSumur) {
                manjat = manjat + siangNaik;

                if(manjat < dalamSumur && manjat != dalamSumur) {
                    manjat = manjat - malamTurun;
                }
                banyakHari = banyakHari + 1;
            }
        }
        console.log("Siput telah manjat sepanjang => " + manjat);
        console.log("Dan dia menempuh selama => " + banyakHari + " hari")
    }

    backPressed = () => {
		Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            }, ], {
                cancelable: false
            }
        )
		return true;
    };

    componentDidMount() {
        this.getListUser()
        this.logicalTest()
		BackHandler.addEventListener('hardwareBackPress', this.backPressed);
	}
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    getListUser() {
        axios.get(`https://reqres.in/api/users?page=1`)
            .then(function(response){
                console.log(JSON.stringify(response.data.data))
                if(response.data.data != null) {
                    this.setState({
                        page: 1,
                        listUser: response.data.data,
                        isFetching: false
                    })
                }
            }.bind(this)
        )
    }

    _onScroll() {
        axios.get(`https://reqres.in/api/users?page=` + this.state.page)
            .then(function(response){
                console.log(JSON.stringify(response.data.data))
                if(response.data.data.length != null || response.data.data.length != []) {
                    const newResponse = [...this.state.listUser, ...response.data.data]
                    this.setState({
                        listUser: newResponse,
                        isFetching: false
                    })
                } else {
                    console.log("masuk")
                    this.setState({
                        page: this.state.page - 1
                    })
                }
            }.bind(this)
        )
    }

    onRefresh() {
        this.setState({isFetching: true,},() => {this.getListUser();});
    }

    isCloseToBottom({layoutMeasurement, contentOffset, contentSize}){
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    }

    ifCloseToTop({layoutMeasurement, contentOffset, contentSize}){
        return contentOffset.y == 0;
    }

    isCloseToBottoms = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    };

    render() {
        return(
            <View style={{ flex: 1 }}>
                <FlatList
                    onScroll={({nativeEvent}) => {
                        if (this.isCloseToBottom(nativeEvent)) {
                            this.setState({
                                page: this.state.page + 1
                            }, () => this._onScroll())
                        } else if(this.ifCloseToTop(nativeEvent)) {

                        }
                    }}
                    showsVerticalScrollIndicator={false}
                    style= {{ marginTop: 10 }}
                    data= {this.state.listUser}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isFetching}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                activeOpacity= {.7}
                                onPress={() => this.props.navigation.navigate('DetailUser', {
                                    data: item
                                })}
                            >
                                <View style={{ flexDirection: 'row', marginVertical: 5, height: 100 }}>
                                    <View style={{ justifyContent: 'center', flex: 1.6 }}>
                                        <Image source={{uri: item.avatar}} style={{ width: 100, height: 50 }} resizeMode="contain" />
                                    </View>

                                    <View style={{ flexDirection: 'column', flex: 3, justifyContent:'center' }}>
                                        <Text style={styles.namaEvent}>
                                            {item.first_name + ' ' + item.last_name}
                                        </Text>

                                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                            {/* <Icon name={"location-pin"} size={20} style={{ color: '#38bffc' }} /> */}

                                            <Text>
                                                {item.email}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{ flex: 1.4, justifyContent: 'center', alignItems: 'center' }}>
                            <           Text style={{ fontSize: 30, color: 'red' }}>{"-->"}</Text>
                                    </View>
                                    
                                </View>
                                <View style={{ height: 1, backgroundColor: '#baccbf', marginBottom: 5, marginTop: 10 }} />
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        )
    }
}

export default ListUser;

const styles = StyleSheet.create({
    touchableOpacityStyle: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: 'red',
        borderWidth:1,
        borderColor:'#38bffc',
        backgroundColor:'#fff',
        borderRadius:50,
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 30,
        height: 30,
        //backgroundColor:'black'
    },
    namaEvent: {
        fontWeight: 'bold',
        marginBottom: 2
    }
})