// ======== SignUp ========
let signUp = () => {
  var email= document.getElementById("email-auth")
  var password= document.getElementById("pass-auth")
if(email.value==""){
  Swal.fire("Please Enter Email")
}
else if(password.value=="")
{
  Swal.fire("Please Enter Password")
}

firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
.then((result)=>{
location.replace('login.html');
email.value=""
password.value=""
})
.catch(function(error) {
  // Handle Errors here.
  var errorMessage = error.message;
  console.log(error.message)
  Swal.fire(error.message)
});
}

// ========= LogIn ========
let logIn = () => {
  var email= document.getElementById("email-log")
  var password= document.getElementById("pass-log")

firebase.auth().signInWithEmailAndPassword(email.value, password.value)
.then((result)=>{
location.replace('main.html');
console.log(result)
email.value=""
password.value=""
})
.catch(function(error) {
  // Handle Errors here.
  var errorMessage = error.message;
  console.log(error.message)
});
}


// ========= SignOut ========
let signOut = () =>{
firebase.auth().signOut()
.then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
}




// ======== Facebook LogIn ========
let facebookLogIn = () =>{
var provider = new firebase.auth.FacebookAuthProvider();

firebase.auth().signInWithPopup(provider)
.then(function(result) {
  var token = result.credential.accessToken;
  var user = result.user;
  console.log(result.user)
location.replace('main.html');

})
.catch(function(error) {
  var errorMessage = error.message;
  console.log(error.message)
});
}

// ========= Facebook SignOut ========
let facebookSignOut = () =>{
  firebase.auth().signOut()
.then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
}











// =========================  Main.Html ====================
// LogIn Avatar
function login_Avatar(){
  sweetAlertSuccessMsg("You are LogIn")
}


// function userName(un){
// var userName =document.getElementById("username")
// var un= prompt("Enter Your Name", "Daniyal Zakir")
// userName.innerHTML=un
// }

function comingSoon(){
Swal.fire({
title: 'Coming Soon',
imageUrl: 'Images/comingsoon.gif',
imageWidth: 320,
imageHeight: 210,
imageAlt: 'Will Be Available Soon.',})
}

function log_Out(){
  location.replace("index.html")
}




//========================== FIREBASE =====================
var li=document.getElementById("list")

// FIREBASE GET DATA
firebase.database().ref("DATABASE").on("child_added",function(data){
  var uid= data.val().uid
  var message=data.val().messageText
  var date= data.val().date
  var time= data.val().time 
    
  // MESSAGE
  var create_li=document.createElement("li")
  var li_Text=document.createTextNode(message)
  create_li.appendChild(li_Text)
   
 
  // Edit  Button
  // var edit_btn= document.createElement("img")
  // edit_btn.src='Images/edit.png'
  // edit_btn.alt="EDIT"
  // edit_btn.setAttribute("id",uid)
  // edit_btn.setAttribute("onclick","edit_li(this)")
  // create_li.appendChild(edit_btn)
    


  // Delete  Button
  var del_btn= document.createElement("img")
  del_btn.src='Images/sdot.svg'
  del_btn.alt="DELETE"
  del_btn.className="delclass"
  del_btn.setAttribute("id",uid)
  del_btn.setAttribute("onclick","delete_li(this)")
  create_li.appendChild(del_btn)
    
  // Time
  var timeSpan=document.createElement("span")
  var timeS=document.createTextNode(time)
  timeSpan.className="timeSpan"
  timeSpan.appendChild(timeS)
  create_li.appendChild(timeSpan)
  
// Date
  var dateSpan=document.createElement("span")
  var dateS=document.createTextNode(date)
  dateSpan.className="dateSpan"
  dateSpan.appendChild(dateS)
  create_li.appendChild(dateSpan)

//  Double Tick
  var doubletick= document.createElement("img")
  doubletick.src='Images/doubletick.svg'
  doubletick.className="doubletick"
  create_li.appendChild(doubletick)

  // Avatar Mini
  var am= document.createElement("img")
  am.src='Images/avatar2.png'
  am.className="am"
  create_li.appendChild(am)


  li.appendChild(create_li)

})


//  FIREBASE DATA INSERTION
function send_Message(){
  // Date
  var today = new Date();
  var msgDate = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
// Time
  var toda = new Date();
  var msgTime = toda.getHours() + ":" + toda.getMinutes();


  var textMsg =document.getElementById("text-msg")
  if(textMsg.value=="")
  {
  Swal.fire("Please Write Something")
  }
  else{
  var key=firebase.database().ref("DATABASE").push().key;
  firebase.database().ref("DATABASE/"+ key ).set({
  uid: key,
  messageText: textMsg.value,  
  date: msgDate,
  time: msgTime   
})
}
textMsg.value=""
}

  
  
  // FIREBASE DELETING A SINGLE LI
  function delete_li(key){
  firebase.database().ref("DATABASE/"+ key.id).remove()
  key.parentNode.remove()
  sweetAlertSuccessMsg("Deleted Successfully")
  }
  
  
  
  // FIREBASE EDIT VALUE
  // function edit_li(key){   
  // edit_Val= prompt("Enter Edit Value",  key.parentNode.firstChild.nodeValue )
  // firebase.database().ref("DATABASE/"+ key.id).set({
  //   uid: key.id,
  //   value: edit_Val,
  //   date: msgDate,
  //   time: msgIime  })
  // key.parentNode.firstChild.nodeValue= edit_Val
  // sweetAlertSuccessMsg("Edit Successfully") 
  // }
  
  
  
  // DELETING ALL MESSAGES FROM FIREBASE With Sweet Alert Library
  function del_all_item(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Delete All Messages!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
         li.innerHTML="";
        //  FIREBASE REMOVE ALL DATA
        firebase.database().ref("DATABASE").remove()
  
          Swal.fire(
            'Deleted!',
            'All Messages Are Deleted.',
            'success'
          )
        }
      })
  }
  
  














// /*================ Sweet Alert Library ==============*/
// Sweet Alert Library Message
function sweetAlertSuccessMsg(msg){
    const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon: 'success',
    title: msg
  })  
}

// Sweet Alert Library Timer
function sweetAlertTimer(timer){
let timerInterval
Swal.fire({
  title: timer,
  html: ' Wait a moment... ',
  timer: 3000,
  timerProgressBar: true,
  onBeforeOpen: () => {
    Swal.showLoading()
    timerInterval = setInterval(() => {
      const content = Swal.getContent()
      if (content) {
        const b = content.querySelector('b')
        if (b) {
            b.textContent = Swal.getTimerLeft()
        }
      }
    }, 100)
  },
  onClose: () => {

    clearInterval(timerInterval)
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})
}




function sweetAlertName(){
  swal("Write something here:", {
    content: "input",
  })
  .then((value) => {
    swal(`You typed: ${value}`);
  });

}
