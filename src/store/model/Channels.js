import moment from 'moment';
import newGuid from '../utils/guid';

export class Channels {

    constructor(firebase, domainId) {
        this.firebase = firebase;
        this.domainId = domainId;
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

            const sub = this.firebase.firestore()
                .collection('domains')
                .doc(this.domainId)
                .collection('channels')
                .doc(id)
                .onSnapshot({}, function (doc) {
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
                        }

                        resolve(channel);
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
    async add() {
        try {
            
            const newChannel = {
                id: newGuid(),
                createdBy: this.firebase.auth().currentUser.uid,
                createdDate: moment().toDate(),
                description: '',
                title: 'Sub',
                isFolder: false,
                messages: [{ id: 0, description: '', timestamp: moment.now() }],
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
    
            return Promise.resolve({ id: newChannelRef.id, ...newChannel });
        } catch (error) {
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
                delete channel['unsubscribe'];
        
                batch.set(channelsRef, channel);
                await batch.commit();
                
                resolve();

            } catch (error) {
                reject(error);
            }
        });
    }
}
