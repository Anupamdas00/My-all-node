const socket = io();

const message = document.getElementById("message");
const btn = document.getElementById("button");
const locationBtn = document.querySelector("#locationBtn");
const messageText = document.querySelector('#target');
const sideBar = document.querySelector('#sideBar')

const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;

const userListTemplate = document.querySelector('#userListTemplate').innerHTML;


const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix : true })

socket.on("response", (text) => {
  console.log(`${text.text}`);
});

// ---on page load--------------

window.addEventListener('load', () => {
  message.focus();
  if(message.value.trim() == ''){
    btn.setAttribute('disabled', 'disabled')
  }

  message.addEventListener('input', () => {
    if(message.value.trim() == ''){
      btn.setAttribute('disabled', 'disabled')
    }else{
      btn.removeAttribute('disabled')
    }
  })
})


//room events------------
socket.emit('join', {username, room}, (error) => {
  if(error){
    alert(error)
    location.href = '/'
  }
})


// Message send events---------------
btn.addEventListener("click", (e) => {
  socket.emit("send", message.value, (serverMsg) => {
    console.log('Message Sent!', serverMsg);
  });
  message.value = "";
  if(message.value.trim() == ''){
    btn.setAttribute('disabled', 'disabled')
  }
});

socket.on("response", (value) => {
  console.log("This from user:", value);
  const html = Mustache.render(messageTemplate, { 
    username : value.username,
    message : value.text,
    createdAt : moment(value.createdAt).format('hh:mm a')
   });
  messageText.insertAdjacentHTML('beforeend', html)
});

locationBtn.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition((position) =>{   
        if(!position){
            console.log('Your browser unable to fetch your location!');
        }
        let location = `https://www.google.com/maps/@${position.coords.latitude},${position.coords.longitude}`;
        socket.emit('locationInfo', location);
    })  
});

socket.on('serverLocation', (position) => {
  const html = Mustache.render(locationTemplate, {
    username : position.username,
    position : position.url,
    createdAt : moment(position.createdAt).format('hh:mm a')
  })
  messageText.insertAdjacentHTML('beforeend', html)
 })


 socket.on('roomData', ({ room, users }) => {
  const html = Mustache.render(userListTemplate, {
    users,
    room
  })
  sideBar.innerHTML = html;
 })


