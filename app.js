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





function add_item(){
  var items=document.getElementById("items")
  if(items.value=="")
  {
  Swal.fire("Please enter todo items. <br> Can not add empty list.")
  // items.diseabled=true
  }
  else{
  var key=firebase.database().ref("DATABASE").push().key;
  firebase.database().ref("DATABASE/"+ key ).set({
  uid: key,
  value: items.value  })
  }
  }



// =========================  Main.Html ====================

let sendMessage = () =>{
  
var textMsg =document.getElementById("text-msg")
var list =document.getElementById("list")
var li= document.createElement("li")
li.appendChild(document.createTextNode(textMsg.value))
list.appendChild(li)
textMsg.value=""
}


// LogIn Avatar
function login_Avatar(){
  sweetAlertSuccessMsg("You are LogIn")
}


function userName(){
var userName =document.getElementById("username")
var un= prompt("Enter Your Name")
userName.innerHTML=un
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


// // ============== FIREBASE STUDENT ADD ================
// var a=document.getElementById("a")
// var b=document.getElementById("b")
// var c=document.getElementById("c")
// var d=document.getElementById("d")

// function adding(){ 
  
//   if(a.value==""){
//     Swal.fire("PLease Enter ID To Add")
//   }
//   else  if(c.value==""){
//     Swal.fire("PLease Enter Name To Add")
//   }        
//   else if(d.value==""){
//     Swal.fire("PLease Enter Contact To Add")
//   }
//   else if(b.value==""){
//     Swal.fire("PLease Enter Email To Add")
//   }
//   else{ 
//   firebase.database().ref("Database/"+a.value).set({
//     Id: a.value,
//     Name: b.value,
//     Contact: c.value,
//     Email: d.value
// })
// sweetAlertSuccessMsg("Add Successful")
// // QR-Code Generation
// document.getElementById("qr0").innerHTML=""
// new QRCode(document.getElementById("qr0"), a.value); 

// a.value=""
// b.value=""
// c.value=""
// d.value=""
// }
// }


// function search(){
//   if(a.value==""){
//     Swal.fire("PLease Enter ID To Search")
//   }
//   else{
//   b.value=""
//   c.value=""
//   d.value=""    
//   firebase.database().ref("Database/"+a.value).on("value",function(data){
//     b.value= data.val().Name,
//     c.value= data.val().Contact,
//     d.value= data.val().Email
// })
// // if(b.value==true){
// document.getElementById("qr0").innerHTML=""
// sweetAlertSuccessMsg("Search Successful")
// // }
// }
// }


// function update(){
//   if(a.value==""){
//     Swal.fire("PLease Enter ID To Update Data")
//   }
//   else  if(c.value==""){
//     Swal.fire("PLease Enter Name To Update")
//   }        
//   else if(d.value==""){
//     Swal.fire("PLease Enter Contact To Update")
//   }
//   else if(b.value==""){
//     Swal.fire("PLease Enter Email To Update")
//   }
//   else{
// firebase.database().ref("Database/"+a.value).set({
//     Id: a.value,
//     Name: b.value,
//     Contact: c.value,
//     Email: d.value
// })
// sweetAlertSuccessMsg("Update Successful")
// // QR-Code Generation
// document.getElementById("qr0").innerHTML=""
// new QRCode(document.getElementById("qr0"), a.value); 
// a.value=""
// b.value=""
// c.value=""
// d.value=""
// }
// }


// function del(){
//   if(a.value==""){
//     Swal.fire("PLease Enter ID To Delete Data")
//   }
//   else{
//   firebase.database().ref("Database/"+a.value).remove() 
//   a.value=""
//   document.getElementById("qr0").innerHTML=""
//   sweetAlertSuccessMsg("Delete Successful")
// a.value=""
// b.value=""
// c.value=""
// d.value=""
//   }
// }

