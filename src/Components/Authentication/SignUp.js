import React, { Component } from "react";
import {
    StatusBar,
    Alert,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    AsyncStorage,
    Dimensions,
    ScrollView
} from "react-native";
import { Content, Button, Container, Input, Form, Item, Label, Picker, Spinner, DatePicker, CheckBox, Body } from "native-base";
import { connect } from "react-redux";

import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import uuid from 'uuid/v4'; // Import UUID to generate UUID

const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
  const ImageRow = ({ image, windowWidth, popImage }) => (
    <View>
      <Image
        source={{ uri: image }}
        style={[styles.img, { width: windowWidth / 2 - 15 }]}
        onError={popImage}
      />
    </View>
  );

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagepath: '',
            imgSource: '',
            uploading: false,
            progress: 0,
            images: [],
            imagesafter: [],
            fcmTokentmp: "",
            i: 0,
            currentTime:0,
            ready: false,
            error: null,
            locationLoader:false,
            timeOut:15,
            address:"",
            company:"",
            name: "",
            phoneNo: "",
            gender: "male",
            Email: "",
            password: "",
            emailphonecolor: "red",
            validPassword: false,
            chosenDate: new Date(),
            Eid: "",
            occupation: "",
            occupationType: "Sit",
            mot: [
                {

                },
                {
                    value: false,
                    text: "E-Rickshaw"
                },
                {
                    value: false,
                    text: "Bike"
                },
                {
                    value: false,
                    text: "Auto"
                },
                {
                    value: false,
                    text: "Radio Taxi"
                },
                {
                    value: false,
                    text: "Bus"
                },
                {
                    value: false,
                    text: "Bicycle"
                }

            ],
            timeGoestravelling: "",
            AnnualIncome: "0-2.5",
            maritalStatus: "Single",
            bloodGroup: "A+",
            Weight: "",
            ActiveDisease: "",
            where: { lat: null, lng: null }

        };
        this.signup = this.signup.bind(this);
        this.setDate = this.setDate.bind(this);
    }


    componentWillMount () {
        this.getFCMToken();
        this.checkNotificationPermission();
      }
    
      componentDidMount () {
        this.createAndroidNotificationChannel();
    
        this.onTokenRefresh = firebase.messaging().onTokenRefresh(fcmToken => {
            console.log('NEW TOKEN: ', fcmToken);
        });
    
        this.messageListener = firebase.messaging().onMessage((message) => {
          console.log('Remote message:', message);
        })
    
        this.notificationListener = firebase.notifications().onNotification((notification) => {
            notification.setData(notification.data)
            .android.setPriority(firebase.notifications.Android.Priority.Max)
            .android.setChannelId('channelId');
    
            firebase.notifications().displayNotification(notification);
        });

        let images;
        AsyncStorage.getItem('images')
          .then(data => {
            images = JSON.parse(data) || [];
            this.setState({
              images: images
            });
          })
          .catch(error => {
            console.log(error);
          });
    
      }
    
      createAndroidNotificationChannel () {
        const channel = new firebase.notifications.Android.Channel(
          'channelId',
          'Default Notification',
          firebase.notifications.Android.Importance.High 
        ).setDescription('A natural description of the channel');
        firebase.notifications().android.createChannel(channel);
      }
    
      getFCMToken = () => {
        firebase.messaging().getToken()
        .then(fcmToken => {
          if (fcmToken) {
            console.log('DEVICE TOKEN:', fcmToken);
            this.state.fcmTokentmp = fcmToken;            
          } 
        }).catch(() => {
            console.error('DEVICE TOKEN ERROR:', fcmToken);
          });
      }
    
      checkNotificationPermission = () => {
        firebase.messaging().hasPermission().then(enabled => {
          if (!enabled) {
            this.promptForNotificationPermission ();
          }
        });
      }
    
      promptForNotificationPermission = () => {
        firebase.messaging().requestPermission().then(()=>{
          console.log('Permission granted.');
        }).catch(() => {
            console.log('Permission rejected.');
          });
      }


    static navigationOptions = {
        title: 'SignUp'
    };
    getlocation() {
        this.setState({locationLoader:true})

        var repeat= setInterval(()=>{
            let geoOptions = {
                enableHighAccuracy: true,
                timeOut: 20000,
                maximumAge: 60 * 60 * 24
            };
           
            navigator.geolocation.getCurrentPosition(this.geoSuccess,
                this.geoFailure,
                geoOptions);
                console.log("After Api call")
                this.setState({currentTime:this.state.currentTime+0.02})
                console.log(this.state.ready);
                if(this.state.ready || Math.floor(this.state.currentTime)==this.state.timeOut)
                {
                    console.log("Terminate")
                    console.log(this.state);
                    this.setState({locationLoader:false})
                    clearInterval(repeat);
                }
        },20)
    }
    geoSuccess = (position) => {
        console.log("HelloSuccess");
        this.setState({locationLoader:false})
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        
        this.setState({
            ready: true,
            where: { lat: position.coords.latitude, lng: position.coords.longitude }
        })
    }

    geoFailure = (err) => {
        console.log("HelloFailure");
        this.setState({ error: err.message });
    }

    randomString(length) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    
        if (! length) {
            length = Math.floor(Math.random() * chars.length);
        }
    
        var str = '';
        for (var i = 0; i < length; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
        
       
    async signup() {
        Alert.alert(this.state.Email);
        try {
            
            const onSignupDetails = await firebase.auth().createUserWithEmailAndPassword(this.state.Email, this.state.password)
            this.setState({
                response: "account created",
                user: onSignupDetails ? onSignupDetails.user : null
            });
            Alert.alert('here1');

            var fieldName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);

            messageRef = firebase.firestore().collection('users').doc();
            
            messageRef.collection('profile').add({
                name: this.state.name,
                Email: this.state.Email,
                password: this.state.password,
                occupation: this.state.occupation,
                company: this.state.company,
                chosenDate: this.state.chosenDate,
                occupationType: this.state.occupationType,
                gender: this.state.gender,
                company: this.state.company,
                address: this.state.address,
                mot: this.state.mot,                  
                Eid: this.state.Eid,
                onToken: this.state.fcmTokentmp,
            }).then((docRef) => {
                this.setState({
                    name: 'temp',
                    Email: 'email',
                });
                this.props.navigation.goBack();
            }).catch((error) => {
              console.error("Error adding document: ", error);
              this.setState({
                isLoading: false,
              });
            });

            Alert.alert('here2');
            this.uploadImage();
            Alert.alert('here3');
            messageRef.collection('medical').add({
                timeGoestravelling: this.state.timeGoestravelling,
                bloodGroup: this.state.bloodGroup,
                maritalStatus: this.state.maritalStatus,
                Weight: this.state.Weight,
                ActiveDisease: this.state.ActiveDisease,
                imagepath: this.state.imagepath,  
            }).then((docRef) => {
                this.setState({
                    name: 'temp',
                    Email: 'email',
                });
                this.props.navigation.goBack();
            }).catch((error) => {
              console.error("Error adding document: ", error);
              this.setState({
                isLoading: false,
              });
            });

            Alert.alert('here4');
            
            if (!onSignupDetails.user.emailVerified) {
                firebase.auth().currentUser.sendEmailVerification();
            }
        } catch (error) {
            this.setState({
                response: error.toString(),
                user: null
            })
        }
        console.log(this.state.user);
    }

    /*async login() {
        try {
            const onLoginDetails = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            this.props.updateUser(JSON.stringify(onLoginDetails.user));
            if (!onLoginDetails.user._user.emailVerified) {
                firebase.auth().currentUser.sendEmailVerification();
            }
            else if (onLoginDetails) {
                const token = await onLoginDetails.user.getIdToken();
                this.props.updateToken(token);
            }
        } catch (error) {
            this.setState({
                response: error.toString(),
                user: null
            })
        }
    }*/


    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }
    signUpButton() {
        if (!this.state.loding) {
            return (
                <Button block primary onPress={() => this.signup()}>
                    <Text>Sign Up</Text>
                </Button>
            )
        }
        else {
            return (
                <Spinner color='blue' />
            )
        }
    }


    validatePassword(password) {
        this.setState({
            password: password,
            validPassword: true
        })

        var specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        var UppercaseRegex = /[A-Z]+/;
        var lowercaseRegex = /[a-z]+/;
        var numberRegex = /[0-9]+/;
        if (specialCharacterRegex.test(password) && UppercaseRegex.test(password) && lowercaseRegex.test(password) && numberRegex.test(password) && password.length >= 8) {
            this.setState({
                password: password,
                validPassword: true
            })
        }
        else {
            this.setState({
                validPassword: false,
                password: ""
            })
        }

    }
    validateEmailOrPhone = (emailorphone) => {
        const regexphone = /\b[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]\b/;
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(emailorphone) == true) {
            this.setState({
                Email: emailorphone,
                emailphonecolor: "green"
            })
        }
        else {
            if (this.state.phoneNo == "") {
                this.setState({
                    Email: "",
                    emailphonecolor: "red"
                })
            }
        }

        if (regexphone.test(emailorphone) == true) {
            this.setState({
                phoneNo: emailorphone,
                emailphonecolor: "green"
            })
        }
        else {
            if (this.state.Email == "") {
                this.setState({
                    phoneNo: "",
                    emailphonecolor: "red"

                })
            }
        }
    }
    handleNext0() {
        if (this.state.name == "") {
            Alert.alert("Enter name")
        }
        else {
            if (this.state.Email != "" || this.state.phoneNo != "") {
                if (this.state.validPassword) {
                    this.setState({ i: this.state.i + 1 })
                }
                else {
                    Alert.alert("Enter a valid password")
                }

            }
            else {
                Alert.alert("Enter a valid email or phone number")
            }
        }
    }
    handleNext1() {
        if (this.state.company != "") {
            k = new Date()
            today = this.state.chosenDate

            if (today.toDateString() == k.toDateString()) {
                Alert.alert("Please Select a Date");
            }
            else {
                this.setState({i:this.state.i+1})
            }
        }
        else {
            Alert.alert("Enter Company")
        }
    }
    handleCheckbox(index) {
        var k = this.state.mot;
        k[index].value = !k[index].value;
        this.setState({ mot: k });
        console.log(this.state.mot);

    }

    /**
     * Select image method
     */
    pickImage = () => {
        ImagePicker.showImagePicker(options, response => {
        if (response.didCancel) {
            console.log('You cancelled image picker 😟');
        } else if (response.error) {
            alert('And error occured: ', response.error);
        } else {
            const source = { uri: response.uri };
            this.setState({
            imgSource: source,
            imageUri: response.uri
            });
        }
        });
    };
    /**
     * Upload image method
     */
    uploadImage = () => {
        const ext = this.state.imageUri.split('.').pop(); // Extract image extension
        const filename = `${uuid()}.${ext}`; // Generate unique name
        this.state.imagepath = 'portfolio/' + filename;
        this.setState({ uploading: true });
        firebase
        .storage()
        .ref(this.state.imagepath)
        .putFile(this.state.imageUri);
        // .on(
        //     firebase.storage.TaskEvent.STATE_CHANGED,
        //     snapshot => {
        //     let state = {};
        //     state = {
        //         ...state,
        //         progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
        //     };
        //     if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
        //         const allImages = this.state.images;
        //         allImages.push(snapshot.downloadURL);
        //         state = {
        //             ...state,
        //             uploading: false,
        //             imgSource: '',
        //             imageUri: '',
        //             progress: 0,
        //             images: allImages
        //         };
        //         AsyncStorage.setItem('images', JSON.stringify(allImages));
        //     }
        //     this.setState(state);
        //     },
        //         error => {
        //         unsubscribe();
        //         alert('Sorry, Try again.');
        //     }
        // );
    };
    /**
     * Download image method
     */
    getImage = () => {
        Alert.alert(this.state.imagepath); 
        firebase
          .storage()
          .ref(this.state.imagepath)
          .getDownloadURL()
          .then((url) => {
              this.setState({dwnImage:url});
          })
          .catch((error) => {
            Alert.alert('error')
          })   
        Alert.alert(this.state.dwnImage);
    }
    render() {
        const { uploading, imgSource, progress, images } = this.state;
        const windowWidth = Dimensions.get('window').width;
        const disabledStyle = uploading ? styles.disabledBtn : {};
        const actionBtnStyles = [styles.btn, disabledStyle];

        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome to Notification demo on React Native!</Text>
        </View>
        switch (this.state.i) {
            case 0: {
                return (
                    <Container>
                        <Content>
                            <StatusBar barStyle="light-content" />
                            <Form>
                                <Item>
                                    { <Input placeholder="Enter Name" placeholderTextColor="gray" onChangeText={(name)=>this.setState({name:name})}/>
                                    }
                                </Item>
                                <Item floatingLabel>
                                    <Label>Email or PhoneNumber</Label>
                                    <Input textContentType="emailAddress" keyboardType="email-address" style={{color:this.state.emailphonecolor}} onChangeText={(emailorphone) => this.validateEmailOrPhone(emailorphone)} />
                                </Item>
                                
                                <Item floatingLabel>
                                    <Label>Password</Label>
                                    <Input secureTextEntry={true} textContentType="password" onChangeText={(password) => this.validatePassword(password)} />
                                </Item>
                                {!this.state.validPassword && (<Label> {"Password must have an Uppercase character\n a lowercase character\na number\na special symbol and\nmust be atleast eight characters long."}</Label>)}
                                
                                <View>
                                    <ScrollView>
                                        <View style={styles.Imgpick}>
                                            <TouchableOpacity
                                            style={actionBtnStyles}
                                            onPress={this.pickImage}
                                            disabled={uploading}
                                            >
                                            <View>
                                                <Text style={styles.btnTxt}>Pick image</Text>
                                            </View>
                                            </TouchableOpacity>
                                            {/** Display selected image */}
                                            {imgSource !== '' && (
                                            <View>
                                                <Image source={imgSource} style={styles.image} />
                                                {uploading && (
                                                <View
                                                    style={[styles.progressBar, { width: `${progress}%` }]}
                                                />
                                                )}
                                                {/* <TouchableOpacity
                                                style={actionBtnStyles}
                                                onPress={this.uploadImage}
                                                disabled={uploading}
                                                >
                                                <View>
                                                    {uploading ? (
                                                    <Text style={styles.btnTxt}>Uploading ...</Text>
                                                    ) : (
                                                    <Text style={styles.btnTxt}>Upload image</Text>
                                                    )}
                                                </View>
                                                </TouchableOpacity> */}
                                            </View>
                                            )}

                                            {/* <View>
                                                <Text
                                                    style={{
                                                    fontWeight: '600',
                                                    paddingTop: 20,
                                                    alignSelf: 'center'
                                                    }}
                                                >
                                                    {images.length > 0
                                                    ? 'Your uploaded images' + images.length
                                                    : 'There is no image you uploaded'}
                                                </Text>
                                            </View> */}

                                            {/* <FlatList
                                            numColumns={2}
                                            style={{ marginTop: 20 }}
                                            data={images}
                                            renderItem={({ item: image, index }) => (
                                                <ImageRow
                                                windowWidth={windowWidth}
                                                image={image}
                                                popImage={() => this.removeImage(index)}
                                                />
                                            )}
                                            keyExtractor={index => index}
                                            /> */}
                                        </View>
                                    </ScrollView>
                                </View>
                                <Button block primary onPress={() => this.handleNext0()}>
                                    <Text>Next</Text>
                                </Button>
                            </Form>
                        </Content>
                    </Container>
                )
            }
            case 1:
                {
            return(
                <Container>
                <Content>
                    <StatusBar barStyle="light-content" />
                    <Form>
                        <Item>
                            <Input placeholder="Enter occupation" placeholderTextColor="gray" onChangeText={(occupation)=>this.setState({occupation:occupation})}/>
                            
                            </Item>
                            <Item>
                            <Input placeholder="Enter company" placeholderTextColor="gray" onChangeText={(company)=>this.setState({company:company})}/>
                            
                            </Item>
                            <DatePicker
                                defaultDate={new Date(2000,1,1)}
                                minimumDate={new Date(1920, 1, 1)}
                                maximumDate={new Date()}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Select date of birth"
                                textStyle={{ color: "green" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={this.setDate}
                                disabled={false}
                            />
                            <Item>
                                <Input placeholder="Enter Employee Id" placeholderTextColor="gray" onChangeText={(eid)=>this.setState({Eid:eid})}/>
                            </Item>
                            {/* <Button block primary onPress={() => this.handleNext1()}> <Text>Next</Text></Button>   */}
                            
                            <Button block primary onPress={() => this.handleNext1()}>
                                    <Text>Next</Text>
                                </Button>
                            </Form>
                            </Content>
                            </Container>

            )
            
                }
            case 2: 
                {
            return(
            <Container>
                    <Content>
                        <StatusBar barStyle="light-content" />
                        <Form>
                            <Item picker>
                            <Label>Select Gender</Label>
                        <Picker
                            note
                            mode="dropdown"
                            style={{ width: undefined }}
                            selectedValue={this.state.gender}
                            onValueChange={(value) => this.setState({ gender: value })}
                        >
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                        </Picker>
                            </Item>
                            <Item picker>
                            <Label>Select Occupation Type</Label>
                            <Picker
                                note
                                mode="dropdown"
                                style={{ width: undefined }}
                                selectedValue={this.state.occupationType}
                                onValueChange={(value) => this.setState({ occupationType: value })}
                            >
                                <Picker.Item label="Sit" value="Sit" />
                                <Picker.Item label="Travel" value="Travel" />
                                <Picker.Item label="Field" value="Field" />
                            </Picker>
                            </Item>
                            <Input placeholder="Enter Time to travel in hrs(per day)" placeholderTextColor="gray" keyboardType="numeric"></Input>
                            <Item picker>
                            <Label>Blood Group</Label>
                            <Picker
                                note
                                mode="dropdown"
                                style={{ width: undefined }}
                                selectedValue={this.state.bloodGroup}
                                onValueChange={(value) => this.setState({ bloodGroup:value })}
                            >
                                <Picker.Item label="A+" value="A+" />
                                <Picker.Item label="A-" value="A-" />
                                <Picker.Item label="B+" value="B+" />
                                <Picker.Item label="B-" value="B-" />
                                <Picker.Item label="AB+" value="AB+" />
                                <Picker.Item label="AB-" value="AB-" />
                                <Picker.Item label="O+" value="O+" />
                                <Picker.Item label="O-" value="O-" />
                            </Picker>
                            </Item>
                            <Button block primary onPress={() => this.setState({i:this.state.i+1})}>
                                    <Text>Next</Text>
                                </Button>
                            
            
                            </Form>
                            </Content>
                            </Container>
            )
                }
            case 3:
                {
                    
                    return(
                        <Container>
                            <Content>
                                <StatusBar barStyle="light-content" />
                                <Form>
                    
                        <Item picker>
                                    <Label>Annual Income(in lacs)</Label>
                                    <Picker
                                        note
                                        mode="dropdown"
                                        style={{ width: undefined }}
                                        selectedValue={this.state.AnnualIncome}
                                        onValueChange={(value) => this.setState({ AnnualIncome:value })}
                                    >
                                        <Picker.Item label="0-2.5L" value="0-2.5" />
                                        <Picker.Item label="2.5-4L" value="2.5-4" />
                                        <Picker.Item label="4L-6L" value="4-6" />
                                        <Picker.Item label="6-9.9L" value="6-9.9" />
                                        <Picker.Item label="Above 9.9L" value="Above 9.9" />
                                        </Picker>
                                    </Item>
                                    <Item picker>
                                    <Label>Marital Status</Label>
                                    <Picker
                                        note
                                        mode="dropdown"
                                        style={{ width: undefined }}
                                        selectedValue={this.state.maritalStatus}
                                        onValueChange={(value) => this.setState({ maritalStatus:value })}
                                    >
                                        <Picker.Item label="Single" value="Single" />
                                        <Picker.Item label="Married" value="Married" />
                                        <Picker.Item label="Divorced" value="Divorced" />
                                        <Picker.Item label="Widow" value="Widow" />
                                        <Picker.Item label="Widower" value="Widower" />
                                        </Picker>
                                    </Item>
                                    <Input placeholder="Enter Weight(in kgs)" keyboardType="numeric" placeholderTextColor="gray" onChangeText={(val)=>this.setState({Weight:val})} ></Input>               
                                    <Input placeholder="Active Diesases(if any)" keyboardType="default" placeholderTextColor="gray" onChangeText={(val)=>this.setState({ActiveDisease:val})} ></Input>               
                                    {/* <Button block primary onPress={() => this.setState({i:this.state.i+1})}> <Text>Next</Text></Button> */}
                                    <Button block primary onPress={() => this.setState({i:this.state.i+1})}>
                                    <Text>Next</Text>
                                </Button>
                                </Form>
                                </Content>
                                </Container>
        
                    )
                    
                }
            case 4: 
                {
                    
                    return(
                        <Container>
                            <Content>
                                <StatusBar barStyle="light-content" />
                                <Form>
                                    {
                                        this.state.mot.map((item,index)=>{
                                            if(index==0)
                                            {
                                            return(<Text key={index}>Enter modes of transport</Text>)
                                            }
                                            else
                                            {
                                                return(
                                                    <View key={index}>
                                                        <CheckBox  checked={item.value} onPress={()=>this.handleCheckbox(index)}/>
                                                        <Body>
                                                            <Text>{item.text}</Text>
                                                        </Body>
                                                    </View>                      
                                                )
                                            }
                                        })
                                    }
                                    <Text>{"\n"}</Text>
                                    <Button block primary onPress={() => this.getlocation()}>
                                        <Text>Get Location</Text>
                                    </Button>
                                    {this.state.ready &&(
                                        <Text>Location Set!</Text>
                                    )}
                                    {
                                        !this.state.ready &&(
                                        <Item floatingLabel>
                                                <Input textContentType="name" placeholder="Enter address manually"  placeholderTextColor="gray" onChangeText={(address) => this.setState({ address:address })}/> 
                                            </Item>   
                                        )
                                    }
                                    {
                                        this.state.locationLoader &&(
                                            <Spinner color='blue' />
                                        )
                                    }

                                    {
                                        !this.state.ready && Math.floor(this.state.currentTime)==this.state.timeOut &&(
                                                <Text>No GPS Signal Found</Text>
                                        )
                                    }
                                    <Text>{"\n\n"}</Text>
                                    {this.signUpButton()}
                
                                </Form>
                            </Content>
                        </Container>
                    )                    
                }
        }

    }
}


const mapStateToProps = (state) => {
    return {
        token: state.userReducer.token,
        user: state.userReducer.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateToken: (token) => dispatch({ type: 'UPDATE_TOKEN', payload: token }),
        updateUser: (user) => dispatch({ type: 'UPDATE_USER', payload: user }),
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    Imgpick: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        marginTop: 20,
        paddingLeft: 5,
        paddingRight: 5
      },
      btn: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        backgroundColor: 'rgb(3, 154, 229)',
        marginTop: 20,
        alignItems: 'center'
      },
      disabledBtn: {
        backgroundColor: 'rgba(3,155,229,0.5)'
      },
      btnTxt: {
        width: '40%',
        color: '#fff',
      },
      image: {
        marginTop: 20,
        minWidth: 200,
        height: 200,
        resizeMode: 'contain',
        backgroundColor: '#ccc',
      },
      img: {
        flex: 1,
        height: 100,
        margin: 5,
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#ccc'
      },
      progressBar: {
        backgroundColor: 'rgb(3, 154, 229)',
        height: 3,
        shadowColor: '#000',
      }
  });
  

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)