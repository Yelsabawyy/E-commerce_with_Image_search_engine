function chooseImageType(pageName,element,notpageName) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("greenColor");
      tablinks[i].classList.remove("bold");
    }
    element.classList.add("greenColor");
    element.classList.add("bold");
    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";
    document.getElementById(notpageName).style.display = "none";
}
 

var chooseSubCategories =function chooseSubCategories(){
  var selectBox = document.getElementById("categoryAddProduct");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  var SubCategories = document.getElementById("SubCategories");
  while (SubCategories.lastElementChild) {
    SubCategories.removeChild(SubCategories.lastElementChild);
  }
  if (selectedValue =='Meat & Fish') {
    document.getElementById("SubCategories").insertAdjacentHTML(
      'afterbegin',
      `<option disabled selected value="SubCategory" >Sub Category</option><br>
      <option  value="Fish">Fish</option><br>
      <option  value="Chicken">Chicken</option><br>
      <option  value="Meat">Meat</option><br>
      <option  value="pork">pork</option><br>`      
    )
  }
  else if (selectedValue =='Bevereges') {
    document.getElementById("SubCategories").insertAdjacentHTML(
      'afterbegin',
      `<option disabled selected value="SubCategory" >Sub Category</option><br>
      <option  value="soda">soda</option><br>
      <option  value="juice">juice</option><br>
      <option  value="coffee/tea">coffee/tea</option><br>`      
    )
  }
  else if (selectedValue =='Dairy') {
    document.getElementById("SubCategories").insertAdjacentHTML(
      'afterbegin',
      `<option disabled selected value="SubCategory" >Sub Category</option><br>
      <option  value="cheeses">cheeses</option><br>
      <option  value="eggs">eggs</option><br>
      <option  value="milk">milk</option><br>
      <option  value="butter">butter</option><br>
      <option  value="yogurt">yogurt</option><br>`      
    )
  }
  else if (selectedValue =='Fruit & Vegitables') {
    document.getElementById("SubCategories").insertAdjacentHTML(
      'afterbegin',
      `<option disabled selected value="SubCategory" >Sub Category</option><br>
      <option  value="Fruit">Fruit</option><br>
      <option  value="Vegitables">Vegitables</option><br>`      
    )
  }
  else if (selectedValue =='Bread & bread spreads') {
    document.getElementById("SubCategories").insertAdjacentHTML(
      'afterbegin',
      `<option disabled selected value="SubCategory" >Sub Category</option><br>
      <option  value="sandwich">sandwich </option><br>
      <option  value="rolls">rolls</option><br>
      <option  value="bagels">bagels</option><br>
      <option  value="cake">cake</option><br>
      <option  value="tortillas">tortillas</option><br>`      
    )
  }
  else if (selectedValue =='Dried Goods') {
    document.getElementById("SubCategories").insertAdjacentHTML(
      'afterbegin',
      `<option disabled selected value="SubCategory" >Sub Category</option><br>
      <option  value="vegitables">vegitables</option><br>
      <option  value="fruits">fruits</option><br>`      
    )
  }
  else if (selectedValue =='Snacks') {
    document.getElementById("SubCategories").insertAdjacentHTML(
      'afterbegin',
      `<option disabled selected value="SubCategory" >Sub Category</option><br>
      <option  value="Chocolate">Chocolate</option><br>
      <option  value="Waffer">Waffer</option><br>
      <option  value="ice cream">ice cream</option><br>`      
    )
  }
  else if (selectedValue =='Care & Products') {
    document.getElementById("SubCategories").insertAdjacentHTML(
      'afterbegin',
      `<option disabled selected value="SubCategory" >Sub Category</option><br>
      <option  value="shampoo">shampoo</option><br>
      <option  value="soap">soap</option><br>
      <option  value="hand soap">hand soap</option><br>
      <option  value="shaving cream">shaving cream</option><br>`      
    )
  }
  else if (selectedValue =='Cleaning Products') {
    document.getElementById("SubCategories").insertAdjacentHTML(
      'afterbegin',
      `<option disabled selected value="SubCategory" >Sub Category</option><br>
      <option  value="laundry detergent">laundry detergent</option><br>
      <option  value="dishwashing">dishwashing </option><br>`      
    )
  }
  else if (selectedValue =='others') {
    document.getElementById("SubCategories").insertAdjacentHTML(
      'afterbegin',
      `<option disabled selected value="SubCategory" >No SubCategory</option><br>`      
    )
  }



}



// Get the element with id="defaultOpen" and click on it


// function remove(element) {
//   var elementId=element.id;
//   var parentid=document.getElementById(elementId).parentElement;
//   parentid.remove();
// }
// function add(element) {
  
//   var elementId=element.id;
//   var parentid=document.getElementById(elementId).parentElement.parentElement;
//   console.log(parentid);
  
//   var tag = document.createElement('div');
//   tag.classList.add("margin-bottom-10px")
//   tag.innerHTML="<select class='storeInputInsideDiv' required> <option disabled selected value='volvo' >Store Location</option><option value='Alexandria'>Alexandria</option><option value='Cairo'>Cairo</option></select><button id='addStoreLocation' onclick='add(this)'  class='formButton padding-10px margin-5px'>+</button>";
//   parentid.appendChild(tag);
  
//   document.getElementById(elementId).removeAttribute("onclick"); 
//   document.getElementById(elementId).style="background-color:rgb(219, 1, 1)";
//   document.getElementById(elementId).innerText="x";
//   document.getElementById(elementId).onclick=remove("this"); 
// }
  