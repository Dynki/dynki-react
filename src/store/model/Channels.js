import moment from 'moment';
import newGuid from '../utils/guid';
import { ContentState, convertToRaw, EditorState } from 'draft-js';


export class Channels {

    constructor(firebase, domainId) {
        this.firebase = firebase;
        this.domainId = domainId;
    }

    /**
     * Get all messages for an individual channel.
     * 
     * Parameter: channelId {string} - The id (guid) of the channel to get messages for.
     * 
     * Returns: An array of messages
     */
    getMessages(channelId, dispatch, getState, lastDocument) {
        return new Promise((resolve, reject) => {

            const channel = getState().channel.current
            const currentMessages = getState().channel.currentMessages
            const msgCount = currentMessages ? currentMessages.length : 0

            if (!channel || channel.messageCount >= msgCount) {

                this.firebase.firestore()
                .collection('domains')
                .doc(this.domainId)
                .collection('channels')
                .doc(channelId)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .limit(1)
                .onSnapshot({}, documentSnapshots => {
    
                    if (!documentSnapshots?.doc || documentSnapshots.docs.length < 1) {
                        const sub = this.firebase.firestore()
                            .collection('domains')
                            .doc(this.domainId)
                            .collection('channels')
                            .doc(channelId)
                            .collection('messages')
                            .orderBy('timestamp', 'desc')
                            .onSnapshot({}, function (querySnapshot) {
                                const returnData = [];
                                querySnapshot.forEach(function(doc) {
                                    // doc.data() is never undefined for query doc snapshots
                                    returnData.push({ id: doc.id, ...doc.data() });
                                });
        
                                if (dispatch && getState) {
                                    dispatch({ type: 'SET_CURRENT_CHANNEL_MESSAGES', payload: returnData });
                                }
                
                                resolve(sub);
                            }, (err) => reject(err));

                    } else {

                        const last = documentSnapshots.docs[documentSnapshots.docs.length-1];
                        const pageSize = getState().channel.pageSize;
        
                        const sub = this.firebase.firestore()
                            .collection('domains')
                            .doc(this.domainId)
                            .collection('channels')
                            .doc(channelId)
                            .collection('messages')
                            .orderBy('timestamp', 'desc')
                            .startAt(last)
                            .limit(pageSize)
                            .onSnapshot({}, function (querySnapshot) {
                                const returnData = [];
                                querySnapshot.forEach(function(doc) {
                                    // doc.data() is never undefined for query doc snapshots
                                    returnData.push({ id: doc.id, ...doc.data() });
                                });
        
                                if (dispatch && getState) {
                                    dispatch({ type: 'SET_CURRENT_CHANNEL_MESSAGES', payload: returnData });
                                }
                
                                resolve(sub);
                            }, (err) => reject(err));
                    }
                })
            } else {
                resolve();
            }

        });
    }

    /**
     * Get a individual channel.
     * 
     * Parameter: id {string} - The id (guid) of the channel to get.
     * 
     * Returns: A channel class instance
     */
    get(id, dispatch, getState) {
        return new Promise(async (resolve, reject) => {

            dispatch({ type: 'SET_CURRENT_CHANNEL_MESSAGES', payload: undefined });

            const sub = this.firebase.firestore()
                .collection('domains')
                .doc(this.domainId)
                .collection('channels')
                .doc(id)
                .onSnapshot({}, async (doc) => {
                    const channel = doc.data();
    
                    // Add the subscription to the current channel so we can kill it later.
                    if (channel) {
                        channel.unsubscribe = sub;

                        if (dispatch && getState) {
                            const currentchannel = getState().channel.current;

                            // This is required to stop firestore creating multiple subscriptions, which then spam the system.
                            if (currentchannel && currentchannel.id === channel.id) {
                                dispatch({ type: 'SET_CURRENT_CHANNEL', payload: channel });
                            }

                            channel.messageUnsubscribe = await this.getMessages(channel.id, dispatch, getState);
                        }

                        resolve(channel);
                    } else {
                        reject()
                    }
                }, (err) => reject(err));
        });
    }


    /**
     * Get all channels for this domain.
     * 
     * Returns: A firebase snapshot instance containing the channels
     */
    list(dispatch) {

        console.log('Get channels for domain id', this.domainId)            

        return new Promise((resolve, reject) => {
            this.firebase.firestore()
            .collection('domains')
            .doc(this.domainId)
            .collection('channelsInDomain')
            .doc('appChannels')
            .onSnapshot({}, function (doc) {
                const data = doc.data();

                if (data) {
                    const channels = !data.channels || data.channels.length < 1 ? [] : data.channels;

                    if (dispatch) {
                        dispatch({ type: 'REFRESH_CHANNELS', payload: channels });
                    }

                    resolve(channels);
                } else {
                    resolve([])
                }
            }, (err) => reject(err));
        });
    }

    /**
     * Adds a new channel.
     * 
     */
    async add(id) {
        try {
            const name = this.firebase.auth().currentUser.displayName ? this.firebase.auth().currentUser.displayName :
            this.firebase.auth().currentUser.email;

            const content = EditorState.createWithContent(ContentState.createFromText(name + ' Joined the channel'));
            const newMessage = convertToRaw(content.getCurrentContent());

            const newChannel = {
                id: id || newGuid(),
                createdBy: this.firebase.auth().currentUser.uid,
                createdDate: moment().toDate(),
                description: '',
                isFolder: false,
                messageCount: 0,
                title: 'Sub',
            }

            // Firebase requires the data to be parsed this way!!.
            const data = JSON.parse(JSON.stringify(newChannel));
    
            // Create the new channel document, and then get it, to get it's ID.
            const newChannelRef = await this.firebase.firestore()
                .collection('domains').doc(this.domainId).collection('channels').doc(newChannel.id);
    
            // Update the channels in this domain with data from above.
            const appChannelsRef = this.firebase.firestore()
                .collection('domains').doc(this.domainId).collection('channelsInDomain').doc('appChannels');
    
            await this.firebase.firestore().runTransaction(async transaction => {
                const appChannelsDoc = await transaction.get(appChannelsRef);
    
                let existingChannels = appChannelsDoc.data() && appChannelsDoc.data().channels ? appChannelsDoc.data().channels : [];
                existingChannels.push({ id: newChannelRef.id, title: 'Sub' });
    
                // Update app channels document which drives the menu
                transaction.set(appChannelsRef, { channels: existingChannels });

                // Add the new channel document
                transaction.set(newChannelRef, data);
            });
    
            await this.addMessage(newChannel, newMessage);
    
            return Promise.resolve({ id: newChannelRef.id, ...newChannel });
        } catch (error) {
            console.log('ERROR', error);
            return Promise.reject(error);            
        }
    }

    async updateChannelTitle(channelId, updatedTitle) {
        try {
            // Get from firestore the list of channels in this domain. 
            let existingChannels = await this.list();
            existingChannels = existingChannels.map(b => {
                if (b.id === channelId) {
                    b.title = updatedTitle
                }
                return b;
            })
    
            // Update the channels in this domain with data from above.
            await this.firebase.firestore()
                .collection('domains')
                .doc(this.domainId)
                .collection('channelsInDomain')
                .doc('appChannels')
                .set({
                    channels: existingChannels
                });
    
            return Promise.resolve();
            
        } catch (error) {
            return Promise.reject(error);            
        }
    }

    update(channel) {
        return new Promise(async (resolve, reject) => {

            try {
                const channels = await this.list();
                const channelIdx = channels.findIndex(b => b.id === channel.id);
    
                const batch = this.firebase.firestore().batch();
        
                const appChannelsRef =  this.firebase.firestore()
                                        .collection('domains').doc(this.domainId)
                                        .collection('channelsInDomain').doc('appChannels');
    
                const channelsRef = this.firebase.firestore()
                                    .collection('domains')
                                    .doc(this.domainId)
                                    .collection('channels')
                                    .doc(channel.id);
    
                if (channels[channelIdx].title !== channel.title) {
                    channels[channelIdx].title = channel.title;
                    batch.set(appChannelsRef, { channels });
                }
                delete channel['unsubscribe']
                delete channel['messageUnsubscribe']
        
                batch.set(channelsRef, channel);
                await batch.commit();
                
                resolve();

            } catch (error) {
                reject(error);
                console.log('Error:', error)
            }
        });
    }

    addMessage(channel, message) {
        return new Promise(async (resolve, reject) => {

            try {
                const name = this.firebase.auth().currentUser.displayName ? this.firebase.auth().currentUser.displayName :
                                this.firebase.auth().currentUser.email;
        
                const msgContent = {
                    id: newGuid(),
                    timestamp: moment.now(),
                    content: message,
                    reactions: [],
                    likes: {},
                    user: { id: this.firebase.auth().currentUser.uid, name }
                }

                // Create the new message document.
                const newMessageRef = await this.firebase.firestore()
                    .collection('domains')
                    .doc(this.domainId)
                    .collection('channels')
                    .doc(channel.id)
                    .collection('messages')
                    .doc(msgContent.id);

                delete channel['unsubscribe'];

                channel.messageCount = channel.messageCount + 1;

                const channelRef = this.firebase.firestore()
                                    .collection('domains')
                                    .doc(this.domainId)
                                    .collection('channels')
                                    .doc(channel.id);

                                    
                await this.firebase.firestore().runTransaction(async transaction => {
                    const channelDoc = await transaction.get(channelRef);
        
                    let data = channelDoc.data();
                    data.messageCount = data.messageCount + 1;
        
                    // Update the message count on the channel.
                    transaction.set(channelRef, data);
    
                    // Add the new message document.
                    transaction.set(newMessageRef, msgContent);
                });
                
                resolve();

            } catch (error) {
                reject(error);
            }
        });
    }

    addReaction(channel, message, reaction) {
        return new Promise(async (resolve, reject) => {

            try {
                const name = this.firebase.auth().currentUser.displayName ? this.firebase.auth().currentUser.displayName :
                                this.firebase.auth().currentUser.email;

                const batch = this.firebase.firestore().batch();
        
                const messageRef = this.firebase.firestore()
                                    .collection('domains')
                                    .doc(this.domainId)
                                    .collection('channels')
                                    .doc(channel.id)
                                    .collection('messages')
                                    .doc(message.id);
    
                const reactionContent = {
                    id: newGuid(),
                    timestamp: moment.now(),
                    reaction,
                    user: { id: this.firebase.auth().currentUser.uid, name }
                }
                message.reactions = Array.isArray(message.reactions) ? message.reactions : [];
                message.reactions.push(reactionContent);                    
                delete message['unsubscribe'];
        
                batch.set(messageRef, message);
                await batch.commit();
                
                resolve();

            } catch (error) {
                reject(error);
            }
        });
    }

    likeMessage(channel, message) {
        return new Promise(async (resolve, reject) => {

            try {
                const name = this.firebase.auth().currentUser.displayName ? this.firebase.auth().currentUser.displayName :
                                this.firebase.auth().currentUser.email;

                const batch = this.firebase.firestore().batch();
        
                const messageRef = this.firebase.firestore()
                                    .collection('domains')
                                    .doc(this.domainId)
                                    .collection('channels')
                                    .doc(channel.id)
                                    .collection('messages')
                                    .doc(message.id);
                
                message.likes = {...message.likes, ...{ [this.firebase.auth().currentUser.uid]: name }}
    
                delete message['unsubscribe'];
        
                batch.set(messageRef, message);
                await batch.commit();
                
                resolve();

            } catch (error) {
                reject(error);
            }
        });
    }
}
