/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
Author:- Chintan Ray
******************************************/



/*** 
listtems :- an array object which contains all the students info.
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

***/
function appendPageLinks() {
   const numOfPages = Math.round((listItems.length / perPage) + 1);
   const container = document.querySelector('.page');
   const paginationDiv = document.createElement('div');
   paginationDiv.className = 'pagination';
   const ul = document.createElement('ul');

   for (let i = 1; i <= numOfPages; i += 1) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = i;
      li.appendChild(a);
      ul.appendChild(li);

      ul.addEventListener('click', (event) => {
         const links = document.querySelectorAll('a');
         const isClicked = event.target;
         showPage(listItems, isClicked.textContent);
         for (let i = 0; i <= links.length; i++) {
            links[i].classList.remove('active');
            if (isClicked) {
               isClicked.className = 'active';
            }
         }
         // if (isClicked) {
         //    .classList.add('active');
         // }
      });
   }
   paginationDiv.appendChild(ul);
   container.appendChild(paginationDiv);
};

appendPageLinks();