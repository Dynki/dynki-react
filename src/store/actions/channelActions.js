import { Channels } from '../model/Channels'
import notifiy from '../../components/notifications/Notification'

// Get all channels within this user's domain/team.
export const loadMoreMessages = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {

        try {
            dispatch({ type: 'LOAD_MORE_MESSAGES' })

            const channelsHelper = new Channels(getFirebase(), getState().domain.domainId)
            await channelsHelper.getMessages(getState().channel.current.id, dispatch, getState)
    
        } catch (error) {
            notifiy({ type: 'error', message: 'Channel Failure', description: 'Failed to get the channel messages' })
            console.log('Error', error)
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false })
        }
    }
}


// Get all channels within this user's domain/team.
export const getChannels = (loadFirst) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {

        try {
            dispatch({ type: 'ATTEMPT_LOADING_CHANNELS' })

            const channelsHelper = new Channels(getFirebase(), getState().domain.domainId)
            const channels = await channelsHelper.list(dispatch)
    
            if (!channels || channels.length < 1) {
                dispatch({ type: 'NO_CHANNELS' })
            } else {
                if (loadFirst) {
                    dispatch(getChannel(channels[0].id))
                }
                dispatch({ type: 'REFRESH_CHANNELS', payload: channels })
            }
        } catch (error) {
            notifiy({ type: 'error', message: 'Channel Failure', description: 'Failed to get the channels' })
            console.log('Error', error)
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false })
        }
    }
}

// Get an individual channel by id.
export const getChannel = (id) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        
        try {
            dispatch({ type: 'ATTEMPT_LOADING_CHANNEL', payload: id })
    
            const currentChannel = getState().channel.current
    
            // This is required to stop firestore creating multiple subscriptions, which then spam the system.
            if (currentChannel && currentChannel.unsubscribe) {
                currentChannel.unsubscribe()

                if (typeof currentChannel.messageUnsubscribe === "function") { 
                    // safe to use the function
                    currentChannel.messageUnsubscribe()
                }
            }
    
            const channelHelper = new Channels(getFirebase(), getState().domain.domainId)
            const channel = await channelHelper.get(id, dispatch, getState)

            dispatch({ type: 'SET_CURRENT_CHANNEL', payload: channel })
        } catch (error) {
            notifiy({ type: 'error', message: 'Channel Failure', description: 'Failed to get the channel' })
            console.log('Error', error)
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false })
        }
    }
}

// Create a new blank channel with this user's domain/team.
export const newChannel = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {

        try {
            dispatch({ type: 'SET_PROGRESS', payload: true })

            const currentChannel = getState().channel.current

            // This is required to stop firestore creating multiple subscriptions, which then spam the system.
            if (currentChannel && currentChannel.unsubscribe) {
                currentChannel.unsubscribe()

                if (typeof currentChannel.messageUnsubscribe === "function") { 
                    // safe to use the function
                    currentChannel.messageUnsubscribe()
                }
            }
            
            const channelHelper = new Channels(getFirebase(), getState().domain.domainId)
            const newChannel = await channelHelper.add()
            dispatch({ type: 'SET_CURRENT_CHANNEL', payload: newChannel })
    
            dispatch(getChannels())
            dispatch(getChannel(newChannel.id))
            
        } catch (error) {
            console.log('Channel add error', error)
            notifiy({ type: 'error', message: 'Channel Failure', description: 'Failed to create the new channel' })
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false })
        }

        return Promise.resolve(newChannel)
    }
}

export const updateChannel = (channel) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        
        try {
            dispatch({ type: 'SET_CURRENT_CHANNEL', payload: channel })
            dispatch({ type: 'SET_PROGRESS', payload: true })
            dispatch({ type: 'ATTEMPT_UPDATE_CHANNEL', payload: channel })
    
            const channelHelper = new Channels(getFirebase(), getState().domain.domainId)
            await channelHelper.update(channel)
            dispatch({ type: 'SET_CURRENT_CHANNEL', payload: channel })
            dispatch(getChannels())
            dispatch({ type: 'SET_PROGRESS', payload: false })
            
        } catch (error) {
            notifiy({ type: 'error', message: 'Channel Failure', description: error.message })
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false })
        }
    }
}

export const addMessage = (channel, message) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        
        try {
            dispatch({ type: 'SET_PROGRESS', payload: true })
            dispatch({ type: 'ATTEMPT_ADD_MESSAGE', payload: { channel, message } })
    
            const channelHelper = new Channels(getFirebase(), getState().domain.domainId)
            await channelHelper.addMessage(channel, message)
            dispatch({ type: 'SET_PROGRESS', payload: false })
            
        } catch (error) {
            notifiy({ type: 'error', message: 'Channel Failure', description: error.message })
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false })
        }
    }
}

export const addReaction = (channel, reaction) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        
        try {
            dispatch({ type: 'SET_PROGRESS', payload: true })
            dispatch({ type: 'ATTEMPT_ADD_REACTION', payload: { channel, reaction } })
    
            const channelHelper = new Channels(getFirebase(), getState().domain.domainId)
            await channelHelper.addReaction(channel, reaction)
            dispatch({ type: 'SET_PROGRESS', payload: false })
            
        } catch (error) {
            notifiy({ type: 'error', message: 'Channel Failure', description: error.message })
        } finally {
            dispatch({ type: 'SET_PROGRESS', payload: false })
        }
    }
}
