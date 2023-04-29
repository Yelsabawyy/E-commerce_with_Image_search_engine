function changeAction(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";

    // tabcontentChangeAddress = document.getElementsByClassName("tabcontentChangeAddress");
    // tabcontentUpdatePassword = document.getElementsByClassName("tabcontentUpdatePassword");
    // tabcontentMyDetails = document.getElementsByClassName("tabcontentMyDetails");

    // tabcontentChangeAddress.style.display = "none";
    // tabcontentUpdatePassword.style.display = "none";
    // tabcontentMyDetails.style.display = "none";


    // tabcontentChangeAddress.className = tabcontentChangeAddress.className.replace(" active", "");
    // tabcontentUpdatePassword.className = tabcontentUpdatePassword.className.replace(" active", "");
    // tabcontentMyDetails.className =tabcontentMyDetails.className.replace(" active", "");

    // document.getElementById(cityName).style.display = "block";
    // evt.currentTarget.className += " active";

  }