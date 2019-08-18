/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
Author:- Chintan Ray
******************************************/



/*** 
listItems :- an array object which contains all the students info.
perPage:- the number of students that will be displayed on a page.
***/
const listItems = document.getElementsByClassName('student-item')
const perPage = 10;

/*** 
showPage function to divide the listItems array elements into block which will be displayed on which page.
startIndex = index of the first listItem element displayed on the page. eg. for 2nd page (2*10)-10 = 10 i.e 11th element.
endIndex = index of the last listItem element displayed on the page. eg. for 2nd page (2*10)-1 = 19 i.e 20th element.
***/
function showPage(list, page) {
   const startIndex = (page * perPage) - perPage;
   const endIndex = (page * perPage) - 1;
   for (let i = 0; i < list.length; i += 1) {
      if (i >= startIndex && i <= endIndex) {
         list[i].style.display = '';
      } else {
         list[i].style.display = 'none';
      }
   }
};

// calling showPage function on listItems and for 1st page, so the default on loading is the first 10 array elements.

showPage(listItems, 1);

/*** 
   `appendPageLinks function` to generate, append, and add 
    functionality to the pagination buttons.

    numOfPages:- number of pages required to divide listItems, so only 10 elements are seen on 1 page.
    container:- div with the class of page. 
    paginationDiv:- the div with class 'pagination'in which the pagination links will be appended (child of container div).
    ul:- child of paginationDiv and parent of the li.
    li:-child of ul and parent of a.

// ***/
function appendPageLinks(list) {
   const numOfPages = Math.round((list.length / perPage) + 1); //number of pages required
   const container = document.querySelector('.page'); //to get the div with class page
   const paginationDiv = document.createElement('div'); //create a div element will be child of container
   paginationDiv.className = 'pagination'; // assigning class pagination to paginationDiv
   const ul = document.createElement('ul'); //create a ul in which pagination links will go. child of paginationDiv

   for (let i = 1; i <= numOfPages; i += 1) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = i;
      a.href = '#' // looping to add the pagination elements.
      li.appendChild(a); //  an <a> element which is a child of <li> 
      ul.appendChild(li); //   and the grandchild of <ul>

      if (i === 1) {
         a.className = 'active';
      };

      li.addEventListener('click', (event) => {
         const links = document.querySelectorAll('a');
         const isClicked = event.target;
         showPage(listItems, isClicked.textContent);
         for (let i = 0; i < links.length; i++) { //an eventListener, which listens for clicks on the li element. 
            links[i].classList.remove('active'); //it loops removing the active class on the <a> elements stored in the const links
            if (isClicked) { // if the <a> element which isClicked i.e the event.target, the className of active is added to the element.
               isClicked.className = 'active';
            }
         }
      });
   }
   paginationDiv.appendChild(ul);
   container.appendChild(paginationDiv);
};

appendPageLinks(listItems); //invoking the appendPageLinks function on the listItems i.e the list of students.

function searchComponents() {
   // function  createComponent creates element. Arguments it takes are as follows:-
   // elementName = type of element to be created.
   // property = the property of the element to be set.
   // value = the value the element property is to be set equal to.
   function createComponent(elementName, property, value) {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
   }
   //pageHeader accesses the div with class = page-header. i.e the first div on the page.
   const pageHeader = document.querySelector('.page-header');
   // studentSearch creates the div in which the search bar will be located. child of pageHeader.
   const studentSearch = createComponent('div', 'className', 'student-search');
   // searchInput creates an input element. child of studentSearch.
   const searchInput = createComponent('input', 'placeholder', 'Search for students...');
   studentSearch.appendChild(searchInput);
   // searchButton creates an button element. child of studentSearch.
   const searchButton = createComponent('button', 'textContent', 'Search');
   studentSearch.appendChild(searchButton);

   pageHeader.appendChild(studentSearch);

}

searchComponents();

function searchFunctionality() {
   const container = document.querySelector('.page'); //to get the div with class page
   /* Variables to reference the `input`, search `button` elements and an HTMLCollection of `h31 which contains the names of the student */
   const search = document.querySelector('input');
   const button = document.querySelector('button');
   const studentName = document.querySelectorAll('h3');

   /*create the div  which prints the message 'no results found' when there are no matches on the list.*/
   let messageDiv = document.createElement('div');
   let p = document.createElement('p');
   p.textContent = "No results found."
   messageDiv.appendChild(p);

   // array for storing search results
   let searchResult = [];

   /* - performSearch searches for matching student names and displays corresponding listItems i.e Student details,
      while hiding the non matching listItems. 
      - Arguments it accepts is input- which will be a string, and names 
      which has to be an HTMLCollection.
      - looping is done to check for all the HTMLCollection items.
      - The conditional `if` check for two conditions:-
            1. to check if the "search" input has a value.
            2. studentNames contains the string that has been entered in the "search" input.
      - if both conditional statements are true, it displays ListItems that satisfies those conditions.
   */
   function performSearch(input, names) {
      // the count to store the number of elements not included in search result, i.e the hidden elements.
      let count = 0;
      for (let i = 0; i < names.length; i++) {
         if (input.value.length !== 0) {
            if (names[i].textContent.toLowerCase().includes(input.value.toLowerCase())) {
               listItems[i].style.display = 'block';
               // store each of the displayed student name in the 'searchResult' array
               searchResult.push(listItems[i]);
            } else {
               count++;
               listItems[i].style.display = 'none';
            }
         } else {
            //if nothing is typed in the search input, display all the list of students
            //and each of their li elements are stored in the 'searchResult' array
            listItems[i].style.display = 'block';
            searchResult.push(listItems[i]);
         }
      }


      //pagination links are removed first to avoid duplication when the list from the 'searchResult' is displayed.    
      container.removeChild(document.querySelector('.pagination'));
      //display the the list from the 'searchResult' array and paginate the list according
      showPage(searchResult, 1);
      //display the page links
      appendPageLinks(searchResult);
      //make the searchResult array empty again
      searchResult = [];

      //if the count is equal to the number of list, insert the message div with the message 'no results found' 
      //before the last element child of the container element and display the message
      if (count === listItems.length) {
         container.insertBefore(messageDiv, container.lastElementChild);
         messageDiv.style.display = '';
      } else {
         messageDiv.style.display = 'none';
      }
   };


   button.addEventListener('click', (event) => {
      event.preventDefault();
      // Invoked performSearch function here - Arguments: search, studentName
      performSearch(search, studentName);
   });

   search.addEventListener('keyup', () => {
      // Invoke your performSearch function here - Arguments: search, studentName
      performSearch(search, studentName);
   });
}

searchFunctionality();