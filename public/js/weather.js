console.log('Client Side JS loaded')

messageTextOne = document.querySelector("#message-1")
messageTextTwo = document.querySelector("#message-2")




//console.log(e)
const weatherForm = document.querySelector('form')
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    console.log('button Clicked')

    address = document.getElementById('address').value

    console.log('Address: ',address)
 
    messageTextOne.textContent = 'Loading...'
    messageTextTwo.textContent = ''

    fetch('http://localhost:3000/weather/' + address, {
        method: 'GET'
    }).then((response) => {
        response.json().then((data) => {
            console.log('data.temprature: ',data.temprature)
            console.log('data.summary: ',data.summary)
            messageTextOne.textContent = data.temprature
            messageTextTwo.textContent = data.summary

        }).catch((e)=>{

            console.log('error: ',e)
            messageTextOne.textContent = e.error
        })



    }).catch((e) => {

        console.log('error: ',e)
        messageTextOne.textContent = 'Error while fetching the Weather information'
    })


})
