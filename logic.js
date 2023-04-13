//this code is part of the notification app proyect...

//notifications collections
/*
avatar: string
username: string
content: string 
date: string
unread: boolean
type: string(standard | link | message | picture)
meta?: object 
      link type?: string (post | group)
      link post?: string
      message?: string 
      picture?: string 
*/

const notificationCollection = [
      {
            avatar: 'images/avatar-mark-webber.webp', 
            name: 'Mark Webber', 
            content: 'reacted to your recent post', 
            date: '1m ago', 
            unread: true, 
            type: 'link', 
            meta: {
                  linkType: 'post', 
                  linkText: 'My first tournament today!'
            }
      }, 
      {
            avatar: 'images/avatar-angela-gray.webp', 
            name: 'Angela Grey', 
            content: 'followed you', 
            date: '5m ago', 
            unread: true, 
            type: 'standard'  
      }, 
      {
            avatar: 'images/avatar-jacob-thompson.webp', 
            name: 'Jacob Thompson', 
            content: 'has joined your group', 
            date: '5m ago', 
            unread: true, 
            type: 'link', 
            meta: {
                  linkType: 'group', 
                  linkText: 'Chess Club'
            }
      }, 
      {
            //Hay que resolver lo que dice el mensaje adjunto... 
            avatar: 'images/avatar-rizky-hasanuddin.webp', 
            name: 'Rizky Hasanuddin', 
            content: 'sent you a private message', 
            date: '5 days ago', 
            unread: false, 
            type: 'message', 
            meta:{
                  message: 
                  "Hello, thanks for setting up the Chess club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game."
            }
      }, 
      {
            avatar: 'images/avatar-kimberly-smith.webp', 
            name: 'Kimberly Smith', 
            content: 'commented on your picture', 
            date: '1 week ago', 
            unread: false, 
            type: 'picture', 
            meta: {
                  picture: 'images/image-chess.webp'
            }
      }, 
      {
            avatar: 'images/avatar-nathan-peterson.webp', 
            name: 'Nathan Peterson', 
            content: 'reacted to your recent post', 
            date: '2 weeks ago', 
            unread: false, 
            type: 'link', 
            meta: {
                  linkType: 'post', 
                  linkText: '5 end-game strategies to increase your win rate'
            }
      }, 
      {
            avatar: 'images/avatar-anna-kim.webp', 
            name: 'Anna Kim', 
            content: 'left the group', 
            date: '2 weeks ago', 
            unread: false, 
            type: 'link', 
            meta: {
                  linkType: 'group', 
                  linkText: 'Chess Club'
            }
      }
      
]


//GET DOM ELEMENTS...
const mainElement = document.querySelector('.notifications'); 
const markAllAsReadElement = document.querySelector('.header__link'); 
const unreadCountElement = document.querySelector('.unread-count'); 

//listen for click events... 

markAllAsReadElement.addEventListener('click', () => {
      markAllAsRead();
      resetUnreadCount(); 
      removeAllNotifications(); 
      showAllNotifications(notificationCollection); 
})

// mark all notifications as read...
function markAllAsRead(){

      /*const unreadNotifications = document.querySelectorAll('.notification--unread');
      unreadNotifications.forEach((notification) => 
            notification.classList.remove('notification--unread')
      );*/

      notificationCollection.forEach(
            (notification) => (notification.unread = false)
      );
}

function resetUnreadCount(){
      unreadCountElement.textContent = '0'; 
}

// remove all notifications... 
function removeAllNotifications(){
      const allNotificationElements = document.querySelectorAll('.notification'); 
      allNotificationElements.forEach((notification) => notification.remove()); 
}

function showAllNotifications(notifications){
      notifications.forEach(notification => {
            const notificationElement = composeNotification(notification);
            mainElement.appendChild(notificationElement); 
      })
}

//compose notification DOM element...
function composeNotification(notification){
      //Article...
      const notificationElement = document.createElement('article');
      notificationElement.classList.add('notification');

      if(notification.unread){
            notificationElement.classList.add('notification--unread'); 
      }

      //avatar... 
      const avatarElements = document.createElement('img'); 
      avatarElements.classList.add('avatar'); 
      avatarElements.alt = notification.name; 
      avatarElements.src = notification.avatar; 

      //H2 title... 
      const titleElement = document.createElement('h2'); 
      titleElement.classList.add('notification__title'); 
      let titleContent = `<strong>${notification.name}</strong> ${notification.content}`; 
      if(notification.type === 'link'){
            titleContent += ` <a href="#" class="link link--${notification.meta.linkType}">${notification.meta.linkText}</a>`
      }


      //control notification states...
      if(notification.unread){
            titleContent += `<span class="unread-bubble"></span>`; 
      }
      titleElement.innerHTML = titleContent; 

      //date... 
      const dateElement = document.createElement('p'); 
      dateElement.classList.add('date'); 
      dateElement.textContent = notification.date; 

      //compose DOM element 
      notificationElement.appendChild(avatarElements);
      notificationElement.appendChild(titleElement);
      notificationElement.appendChild(dateElement);
      
      if(notification.type === 'message'){
            notificationElement.classList.add('notification--message')
            const messageElement = document.createElement('p'); 
            messageElement.classList.add('notification__message'); 
            messageElement.textContent = notification.meta.message; 
            notificationElement.appendChild(messageElement); 
      }

      if(notification.type === 'picture'){
            notificationElement.classList.add('notification--picture')
            const pictureElement = document.createElement('img'); 
            pictureElement.classList.add('notification__image'); 
            pictureElement.src = notification.meta.picture; 
            notificationElement.appendChild(pictureElement); 
      }

      //return it
      return notificationElement; 
}

// GO 
showAllNotifications(notificationCollection); 
 
