import $api from '../http/index';

export const fetchConversavions = async (id)=>{
    const {data} = await $api.get('/chat/conversations/'+id)
    // console.log(data)
    return data
}

export const addConversation = async (members)=>{
    const {data} = await $api.post('/chat/conversation/', members)
    console.log(data)
    return data
}

export const fetchMessages = async (id)=>{
    const {data} = await $api.get('chat/messages/'+id)
    // console.log(data)
    return data
}

export const sendMessage = async (message)=>{
    const {data} = await $api.post('/chat/message', message)
    // console.log(data)
    return data
}

export const sendDirectMessage = async (message)=>{
    console.log({message})
    const {data} = await $api.post('/chat/direct-message', message)
    // console.log(data)
    return data
}



