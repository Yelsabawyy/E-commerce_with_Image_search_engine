// side nav bar start
function openNav() {

  document.getElementById("mySidenav").style.width = "60%";
  document.getElementById("myBody").style.opacity = "0.9";

  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("myBody").style.opacity = "1";
  }

function openNavLocationChange() {
  document.getElementById("mySidenavLocationChange").style.width = "50%";
}

function closeNavLocationChange() {
  document.getElementById("mySidenavLocationChange").style.width = "0";
}  
  // $(':root').css('--main-color', '#000000');
  
  function myFunction(media_query) {
    var root = document.querySelector(':root');
    if (media_query.matches) { 
      root.style.setProperty('--whiteHeader2', '#003728');
      root.style.setProperty('--blueHeader2', 'white');
      root.style.setProperty('--yellowHeader2', '#FFB81C');
    } 
    else {
      root.style.setProperty('--whiteHeader2', 'white');
      root.style.setProperty('--blueHeader2', '#003728');
      root.style.setProperty('--yellowHeader2', '#FFB81C');
  
    }
  }
  
  var max_width_992px = window.matchMedia("(max-width: 991px)")
  myFunction(max_width_992px) // Call listener function at run time
  max_width_992px.addListener(myFunction)
  
// side nav bar end  