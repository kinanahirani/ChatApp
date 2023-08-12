// import {
//     Text,
//     View,
//     Alert,
//     Modal,
//     Image,
//     Linking,
//     FlatList,
//     Pressable,
//     TextInput,
//     StatusBar,
//     StyleSheet,
//     SafeAreaView,
//     TouchableOpacity,
//     ActivityIndicator,
//   } from 'react-native';
//   import axios from 'axios';
//   import Pdf from 'react-native-pdf';
//   import auth from '@react-native-firebase/auth';
//   import React, {useEffect, useState} from 'react';
//   import {useRoute} from '@react-navigation/native';
//   import VideoPlayer from 'react-native-video-player';
//   import storage from '@react-native-firebase/storage';
//   import Entypo from 'react-native-vector-icons/Entypo';
//   import Feather from 'react-native-vector-icons/Feather';
//   import messaging from '@react-native-firebase/messaging';
//   import firestore from '@react-native-firebase/firestore';
//   import ImagePicker from 'react-native-image-crop-picker';
//   import DocumentPicker from 'react-native-document-picker';
//   import AntDesign from 'react-native-vector-icons/AntDesign';
//   import CProfileHeader from '../components/CProfileHeader';
//   import {horizontalScale, moderateScale, verticalScale} from '../helper/size.helper';
  
//   const CustomChatScreen = () => {
//     const route = useRoute();
//     const {item} = route.params;
//     const [token, setToken] = useState('');
//     const [messages, setMessages] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [pdfModal, setPdfModal] = useState(false);
//     const [attachImg, setAttachImg] = useState(null);
//     const [selectedIds, setSelectedIds] = useState([]);
//     const [allMessages, setAllMessages] = useState([]);
//     const [openPdfUrl, setopenPdfUrl] = useState(null);
//     const [userDetails, setUserDetails] = useState(null);
//     const [fileResponse, setFileResponse] = useState(null);
//     const [openAttachment, setOpenAttachment] = useState(false);
//     const [longPressedMessageId, setLongPressedMessageId] = useState(null);
//     const [openAttachmentSelection, setOpenAttachmentSelection] = useState(false);
  
//     const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
  
//     useEffect(() => {
//       getToken();
//     }, []);
  
//     const getToken = async () => {
//       let token = await messaging().getToken();
//       setToken(token);
//     };
  
//     useEffect(() => {
//       const getUserDetails = async () => {
//         try {
//           if (route.params.id) {
//             const userSnapshot = await firestore()
//               .collection('users')
//               .doc(route.params.id)
//               .get();
  
//             if (userSnapshot.exists) {
//               setUserDetails(userSnapshot.data());
//             }
//           } else if (route.params.data.senderId) {
//             const userSnapshot1 = await firestore()
//               .collection('users')
//               .doc(route.params.data.senderId)
//               .get();
  
//             if (userSnapshot1.exists) {
//               setUserDetails({
//                 ...userSnapshot1.data(),
//                 firstName: route.params.data.firstName,
//                 lastName: route.params.data.lastName,
//               });
//             }
//           } else {
//             console.log('not getting the data');
//           }
//         } catch {
//           console.log('Error fetching user details:', error);
//         }
//       };
//       getUserDetails();
//     }, []);
  
//     let currentUid = auth()?.currentUser?.uid;
//     let uid =
//       item.userId > currentUid
//         ? item.userId + '-' + currentUid
//         : currentUid + '-' + item.userId;
  
//     useEffect(() => {
//       getMessages();
//     }, []);
  
//     const getMessages = () => {
//       const msgRef = firestore()
//         .collection('chats')
//         .doc(uid)
//         .collection('messages')
//         .orderBy('createdAt', 'desc');
  
//       msgRef.onSnapshot(querysnap => {
//         const allMsg = querysnap.docs.map(docsnap => {
//           return {
//             ...docsnap.data(),
//           };
//         });
//         setAllMessages(allMsg);
//       });
//     };
  
//     useEffect(() => {
//       updateStatus();
//     }, []);
  
//     const updateStatus = () => {
//       const querysnap = firestore()
//         .collection('chatUsers')
//         .doc('list')
//         .collection(currentUid)
//         .doc(item.userId);
  
//       querysnap
//         .get()
//         .then(documentSnapshot => {
//           if (documentSnapshot.exists) {
//             console.log('Document exists!');
//             firestore()
//               .collection('chatUsers')
//               .doc('list')
//               .collection(currentUid)
//               .doc(item.userId)
//               .update({
//                 status: 'seen',
//               });
//           } else {
//             console.log('Document does not exist!');
//           }
//         })
//         .catch(error => {
//           console.log('Error(updateStatus):', error);
//         });
//     };
  
    
//     const onSend = async ({value, type}) => {
//       const uniqId = Math.random().toString().substr(2, 10);
//       const createdAt = new Date();
//       const messagesRef = firestore()
//         .collection('chats')
//         .doc(uid)
//         .collection('messages');
  
//       const myMsgArray = {
//         sender: currentUid,
//         senderFirstName: userDetails.firstName,
//         senderLastName: userDetails.lastName,
//         receiverFirstName: item.firstName,
//         receiverLastName: item.lastName,
//         to: item.userId,
//         message: messages.trim(),
//         createdAt,
//         token: item.token,
//         id: uniqId,
//         ...(value !== null && {
//           attachment: value,
//           AttachmentType: type,
//         }),
//       };
  
//       setMessages('');
  
//       const serverTimestamp = firestore.FieldValue.serverTimestamp();
//       messagesRef.add({
//         ...myMsgArray,
//         createdAt: serverTimestamp,
//       });
  
//       sendNotifications(item?.token, uniqId);
  
//       const Cdata = {
//         firstName: item.firstName,
//         lastName: item.lastName,
//         imageURL: item?.profilePicture,
//         lastMessage: messages.trim(),
//         createdAt,
//         uid: item.userId,
//         status: 'sent',
//         token: item?.token,
//       };
  
//       const Rdata = {
//         firstName: userDetails.firstName,
//         imageURL: userDetails?.profilePicture.path,
//         lastMessage: messages.trim(),
//         createdAt,
//         status: 'sent',
//         uid: currentUid,
//         token,
//       };
  
//       const check1 = firestore()
//         .collection('chatUsers')
//         .doc('list')
//         .collection(currentUid)
//         .doc(item.userId);
  
//       check1.get().then(res => {
//         if (res.exists) {
//           check1.update(Cdata);
//           console.log('Check1 if');
//         } else {
//           check1.set(Cdata);
//           console.log('Check1 else');
//         }
//       });
  
//       const check2 = firestore()
//         .collection('chatUsers')
//         .doc('list')
//         .collection(item.userId)
//         .doc(currentUid);
  
//       check2.get().then(res => {
//         if (res.exists) {
//           check2.update(Rdata);
//           console.log('Check2 if');
//         } else {
//           check2.set(Rdata);
//           console.log('Check2 else');
//         }
//       });
//     };
  
//     const sendNotifications = async (token, id) => {
//       var NotiFicationData = JSON.stringify({
//         notification: {
//           body: messages.trim(),
//           title: userDetails.firstName,
//         },
//         data: {
//           action: 'mark_as_read',
//           messageId: id,
//         },
//         to: token,
//       });
  
//       axios
//         .post('https://fcm.googleapis.com/fcm/send', NotiFicationData, {
//           headers: {
//             Authorization:
//               'Bearer AAAAQtNff-8:APA91bHkBx4BHauuE9-ywCYS6rcozQ4NSfXK1yFrqubGv3ZRoeeVCWU3RWZHIFLLmsQnGYWhaCQJxk_b_f5CuHTsZINtPq1nL3vDijp2dxAB_FSLH450oe9xZyeXsQHJf19d-xkdSzJ7',
//             'Content-Type': 'application/json',
//           },
//         })
//         .then(function (res) {
//           console.log(JSON.stringify(res.data), 'Notification Data:');
//         })
//         .catch(function (err) {
//           console.log("Error(sendNotifications): ", err);
//         });
//     };
  
//     const renderMessages = ({item, index}) => {
//       const timestamp = item?.createdAt;
  
//       const date = new Date(
//         timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000,
//       );
  
//       const renderMessage = text => {
//         const parts = text.message.split(emailRegex);
  
//         const highlightedParts = parts.map((part, index) => {
//           if (emailRegex.test(part)) {
//             return (
//               <Text
//                 key={index}
//                 style={styles.highlightedText}
//                 onPress={() => Linking.openURL(`mailto:${part}`)}>
//                 {part}
//               </Text>
//             );
//           } else {
//             return (
//               <Text
//                 style={{
//                   color: text.sender == currentUid ? 'white' : 'black',
//                 }}
//                 key={index}>
//                 {part}
//               </Text>
//             );
//           }
//         });
//         return (
//           <View>
//             {item?.AttachmentType == 'Image' ? (
//               <Image
//                 source={{uri: item?.attachment}}
//                 style={{
//                   height: verticalScale(250),
//                   width: horizontalScale(200),
//                   resizeMode: 'stretch',
//                 }}
//               />
//             ) : item?.AttachmentType == 'Pdf' ? (
//               <TouchableOpacity
//                 onPress={() => {
//                   setopenPdfUrl(item?.attachment);
//                   setPdfModal(true);
//                 }}
//                 style={{flexDirection: 'row', alignItems: 'center'}}>
//                 <View style={{marginRight: 12}}>
//                   <Entypo
//                     name="text-document"
//                     size={moderateScale(32)}
//                     color={'white'}
//                   />
//                 </View>
//               </TouchableOpacity>
//             ) : item?.AttachmentType == 'video' ? (
//               <VideoPlayer
//                 video={{
//                   uri: item?.attachment,
//                 }}
//                 videoWidth={horizontalScale(200)}
//                 videoHeight={verticalScale(250)}
//                 // thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
//                 resizeMode="contain"
//               />
//             ) : null}
//             <Text style={[styles.containerss]}>{highlightedParts}</Text>
//           </View>
//         );
//       };
//       return (
//         <View>
//           <Pressable
//             style={{
//               marginVertical: 4,
//               backgroundColor: selectedIds.includes(item.id)
//                 ? 'rgba(87, 57, 237,0.4)'
//                 : null,
//             }}
//             onPress={() => {
//               if (item.sender == currentUid) {
//                 if (selectedIds.length > 0) {
//                   if (selectedIds.includes(item.id)) {
//                     null;
//                     setSelectedIds(selectedIds.filter(i => i !== item.id));
//                   } else {
//                     setSelectedIds(pre => [...pre, item.id]);
//                   }
//                 } else {
//                   null;
//                 }
//               }
//             }}
//             onLongPress={() => {
//               if (item.sender == currentUid) {
//                 if (selectedIds.includes(item.id)) {
//                   null;
//                   setSelectedIds(selectedIds.filter(i => i !== item.id));
//                 } else {
//                   setSelectedIds(pre => [...pre, item.id]);
//                 }
//               }
//               setLongPressedMessageId(item.id);
//             }}>
//             <Pressable
//               style={[
//                 styles.messageBox,
//                 {
//                   backgroundColor:
//                     item.sender == currentUid ? '#002DE3' : 'white',
//                   alignSelf:
//                     item.sender == currentUid ? 'flex-end' : 'flex-start',
//                 },
//               ]}
//               onPress={() => {
//                 if (item.sender == currentUid) {
//                   if (selectedIds.length > 0) {
//                     if (selectedIds.includes(item.id)) {
//                       null;
//                       setSelectedIds(selectedIds.filter(i => i !== item.id));
//                     } else {
//                       setSelectedIds(pre => [...pre, item.id]);
//                     }
//                   } else {
//                     null;
//                   }
//                 }
//               }}
//               onLongPress={() => {
//                 if (item.sender == currentUid) {
//                   if (selectedIds.includes(item.id)) {
//                     null;
//                     setSelectedIds(selectedIds.filter(i => i !== item.id));
//                   } else {
//                     setSelectedIds(pre => [...pre, item.id]);
//                   }
//                 }
//               }}
//               key={index}>
//               {renderMessage(item)}
//               <Text
//                 style={[
//                   styles.dateText,
//                   {
//                     color:
//                       item.sender == currentUid ? 'white' : 'black',
//                   },
//                 ]}>
//                 {moment(date).format('LT')}
//               </Text>
//             </Pressable>
//           </Pressable>
  
//           {longPressedMessageId === item.id && (
//             <View
//               style={{
//                 width: '80%',
//                 alignSelf: 'center',
//                 height: verticalScale(35),
//                 backgroundColor: Colors.red,
//                 borderRadius: moderateScale(12),
//               }}
//             />
//           )}
//         </View>
//       );
//     };
  
//     const onPlus = () => {
//       setOpenAttachment(true);
//     };
  
//     const onGalleryPress = () => {
//       try {
//         ImagePicker.openPicker({
//           cropping: true,
//         }).then(image => {
//           setAttachImg(image.path);
//           setOpenAttachmentSelection(true);
//           setOpenAttachment(false);
//         });
//       } catch (error) {
//         console.log(error, 'error');
//       }
//     };
  
//     const handleDocumentSelection = async () => {
//       try {
//         const response = await DocumentPicker.pick({
//           presentationStyle: 'fullScreen',
//         });
//         setOpenAttachmentSelection(true);
//         setOpenAttachment(false);
//         setFileResponse(response);
//       } catch (err) {
//         console.warn(err);
//       }
//     };
  
//     const onclosePress = () => {
//       setOpenAttachment(false);
//     };
  
//     const sendMsgWithAttachment = () => {
//       const reference = storage().ref(
//         `users/${userDetails.email}/messages/${Date.now()}`,
//       );
  
//       const task = reference.putFile(
//         attachImg ? attachImg : fileResponse[0]?.uri,
//       );
      
//       task.on(
//         'state_changed',
//         snapshot => {
//           if (snapshot.bytesTransferred == snapshot.totalBytes) {
//             setLoading(false);
//           } else {
//             setLoading(true);
//           }
//           console.log(
//             `${snapshot.bytesTransferred} transferred out of ${snapshot.totalBytes}`,
//           );
//         },
//         error => {
//           console.log(error);
//         },
//         async () => {
//           const downloadURL = await reference.getDownloadURL();
//           await fetch(downloadURL)
//             .then(response => {
//               const contentType = response.headers.get('content-type');
  
//               if (contentType === 'application/pdf') {
//                 onSend({value: downloadURL, type: 'Pdf'});
//                 setOpenAttachmentSelection(false);
//                 setFileResponse(null);
//               } else if (
//                 contentType === 'image/jpeg' ||
//                 contentType === 'image/png'
//               ) {
//                 onSend({value: downloadURL, type: 'Image'});
//                 setOpenAttachmentSelection(false);
//                 setAttachImg(null);
//               } else if (contentType == 'video/mp4') {
//                 onSend({value: downloadURL, type: 'video'});
//                 setOpenAttachmentSelection(false);
//                 setAttachImg(null);
//               } else {
//                 console.log('Something went wrong');
//               }
//             })
//             .catch(error => {
//               console.error(error);
//             });
//         },
//       );
//     };
//     return (
//       <SafeAreaView style={styles.container}>
//         <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
  
//         {/* Header */}
//         <CProfileHeader
//           name={item.name}
//           selected={selectedIds.length > 0 ? true : false}
//           onDelete={onDeletePress}
//         />
  
//         <FlatList
//           data={allMessages}
//           renderItem={renderMessages}
//           keyExtractor={(_, e) => e}
//           inverted
//         />
  
//         <View style={styles.bottomBar}>
//           <TouchableOpacity style={styles.bottomBarBtn} onPress={() => onPlus()}>
//             <AntDesign name="plus" size={moderateScale(20)} color={Colors.grey} />
//           </TouchableOpacity>
//           <TextInput
//             style={styles.input}
//             placeholder="Write your message......."
//             placeholderTextColor={'black'}
//             value={messages}
//             onChangeText={txt =>
//               setMessages(txt.replace(/^\s+|\s+$|\s+(?=\s)/g, ''))
//             }
//             multiline={true}
//           />
//           <TouchableOpacity
//             disable={messages.length == 0 ? true : false}
//             style={styles.bottomBarBtn}
//             onPress={() =>
//               messages.length == 0
//                 ? alert('Please write message')
//                 : onSend({value: null, type: 'text'})
//             }>
//             <Feather name="send" size={moderateScale(20)} color={'#002DE3'} />
//           </TouchableOpacity>
//         </View>
  
//         <Modal visible={openAttachment} transparent>
//           <View style={styles.attachmentMainContainer}>
//             <View style={styles.attachmentBox}>
//               <Text style={styles.modalHeading}>Select Any Attachment </Text>
  
//               <View style={styles.btnContainer}>
//                 <TouchableOpacity
//                   style={[styles.attachmentBtn, {backgroundColor: 'red'}]}
//                   onPress={onGalleryPress}>
//                   <Entypo
//                     name="image"
//                     size={moderateScale(32)}
//                     color={'white'}
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.attachmentBtn, {backgroundColor: 'green'}]}
//                   onPress={handleDocumentSelection}>
//                   <Entypo
//                     name="text-document"
//                     size={moderateScale(32)}
//                     color={'white'}
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.attachmentBtn, {backgroundColor: 'blue'}]}>
//                   <Entypo
//                     name="music"
//                     size={moderateScale(32)}
//                     color={'white'}
//                   />
//                 </TouchableOpacity>
//               </View>
  
//               <TouchableOpacity style={styles.closeBtn} onPress={onclosePress}>
//                 <AntDesign name="close" size={20} color={'black'} />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
  
//         <Modal visible={openAttachmentSelection}>
//           {loading ? (
//             <View
//               style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
//               <ActivityIndicator
//                 animating={loading}
//                 size={'large'}
//                 color={'blue'}
//               />
//             </View>
//           ) : (
//             <View style={styles.attachmentViewContainer}>
//               <View style={styles.viewAttach}>
//                 {attachImg ? (
//                   <Image
//                     source={{uri: attachImg}}
//                     style={styles.attachViewImage}
//                   />
//                 ) : fileResponse ? (
//                   <>
//                     <Text style={styles.attachFileName}>
//                       {fileResponse[0]?.name}
//                     </Text>
//                     <Text style={styles.attachFileType}>
//                       {fileResponse[0]?.type}
//                     </Text>
//                   </>
//                 ) : null}
//               </View>
//               <View style={styles.attachViewInputcontainer}>
//                 <TextInput
//                   style={styles.attachViewInput}
//                   placeholder="Enter Your Message......"
//                   placeholderTextColor={'black'}
//                   onChangeText={txt => setMessages(txt)}
//                 />
//                 <TouchableOpacity onPress={sendMsgWithAttachment}>
//                   <Feather
//                     name="send"
//                     size={moderateScale(20)}
//                     color={'#002DE3'}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//         </Modal>
  
//         <Modal visible={pdfModal}>
//           <View style={{flex: 1}}>
//             <View style={{height: '10%'}}>
//               <TouchableOpacity
//                 style={{
//                   backgroundColor: 'red',
//                   alignSelf: 'flex-end',
//                   padding: 9,
//                   marginRight: 12,
//                   marginTop: 10,
//                 }}
//                 onPress={() => {
//                   setopenPdfUrl(null);
//                   setPdfModal(false);
//                 }}>
//                 <Text>Close</Text>
//               </TouchableOpacity>
//             </View>
//             <Pdf
//               trustAllCerts={false}
//               source={{uri: openPdfUrl}}
//               onLoadComplete={(numberOfPages, filePath) => {
//                 console.log(`Number of pages: ${numberOfPages}`);
//               }}
//               onLoadProgress={res => {
//                 console.log(res * 100, 'progress gap');
//               }}
//               onPageChanged={(page, numberOfPages) => {
//                 console.log(`Current page: ${page}`);
//               }}
//               onError={error => {
//                 console.log(error, 'er');
//               }}
//               onPressLink={uri => {
//                 console.log(`Link pressed: ${uri}`);
//               }}
//               style={{height: '90%', width: '100%'}}
//             />
//           </View>
//         </Modal>
//       </SafeAreaView>
//     );
  
//   };
  
//   export default CustomChatScreen;
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#F7F7FC',
//       justifyContent: 'space-between',
//     },
  
//     bottomBar: {
//       height: 'auto',
//       backgroundColor: 'white',
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       padding: 9,
//     },
//     bottomBarBtn: {
//       width: '10%',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     input: {
//       width: '75%',
//       backgroundColor: '#F7F7FC',
//       minHeight: verticalScale(40),
//       padding: moderateScale(8),
//       color: 'black',
//     },
//     messageBox: {
//       padding: 9,
//       maxWidth: '80%',
//       minWidth: '20%',
//       marginHorizontal: horizontalScale(12),
//       marginVertical: verticalScale(4),
//       borderBottomLeftRadius: moderateScale(9),
//       borderTopEndRadius: moderateScale(9),
//       elevation: 6,
//     },
//     dateText: {
//       fontSize: moderateScale(10),
//       marginTop: verticalScale(8),
//       textAlign: 'right',
//     },
//     containerss: {
//       flexWrap: 'wrap',
//       flexDirection: 'row',
//     },
//     highlightedText: {
//       color: 'red',
//     },
//     attachmentMainContainer: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     attachmentBox: {
//       width: '90%',
//       height: moderateScale(180),
//       backgroundColor: 'white',
//       elevation: 6,
//     },
//     closeBtn: {
//       position: 'absolute',
//       right: -8,
//       top: -8,
//       backgroundColor: 'white',
//       borderRadius: 12,
//       padding: 4,
//       elevation: 6,
//     },
//     modalHeading: {
//       color: 'black',
//       textAlign: 'center',
//       marginVertical: verticalScale(24),
//       fontSize: moderateScale(14),
//     },
//     btnContainer: {
//       flexDirection: 'row',
//       justifyContent: 'space-evenly',
//       alignItems: 'center',
//     },
//     attachmentBtn: {
//       height: 80,
//       width: 80,
//       borderRadius: 40,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     attachmentViewContainer: {
//       flex: 1,
//       backgroundColor: Colors.grey,
//     },
//     viewAttach: {
//       height: '90%',
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     attachViewImage: {
//       height: '100%',
//       width: '100%',
//       resizeMode: 'contain',
//     },
//     attachFileName: {
//       color: 'white',
//       fontSize: moderateScale(18),
//     },
//     attachFileType: {
//       color: 'white',
//       fontSize: moderateScale(14),
//     },
//     attachViewInputcontainer: {
//       height: '10%',
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-evenly',
//     },
//     attachViewInput: {
//       borderWidth: 1,
//       width: '80%',
//       height: verticalScale(50),
//       fontSize: moderateScale(14),
//       color: 'black',
//       padding: 9,
//       borderRadius: 12,
//     },
//   });