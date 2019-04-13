
const form = document.getElementById('form');
const addInput = document.getElementById('add-input');
const ul = document.querySelector('.list-group');
const clearBtn = document.querySelector('#clear-btn');
const search = document.getElementById('search-input');
const span = document.getElementById('span');

document.addEventListener('DOMContentLoaded',loadReminds);
form.addEventListener('submit',addRemind);
ul.addEventListener('click',removeRemind);
clearBtn.addEventListener('click',clearReminds);
search.addEventListener('keyup',searchReminder);


function loadReminds() {
  let reminds;
  if(localStorage.getItem('reminds') === null){
   reminds = [];
  } else {
    reminds = JSON.parse(localStorage.getItem('reminds'));
  }

  reminds.forEach(function(remind){
   const li = document.createElement('li');
   li.className = 'list-group-item';
   li.appendChild(document.createTextNode(remind));

   const link = document.createElement('a');
   link.className = 'delete-item float-right';
   link.innerHTML = '<i class="fa fa-remove"></i>';
  
   li.appendChild(link);

   ul.appendChild(li);
  })
}

function addRemind(e) {

  if(addInput.value === ''){
    span.textContent = 'Please add your task';
  } else {
  
   const li = document.createElement('li');
   li.className = 'list-group-item';
   li.appendChild(document.createTextNode(addInput.value));

   const link = document.createElement('a');
   link.className = 'delete-item float-right';
   link.innerHTML = '<i class="fa fa-remove"></i>';
  
   li.appendChild(link);

   ul.appendChild(li);

   storeRemindsInLS(addInput.value);
  
   addInput.value = '';

   span.innerHTML = '';
  }
   e.preventDefault();
}

function storeRemindsInLS(remindItem) {
  let reminds;

  if(localStorage.getItem('reminds') === null) {
    reminds = [];
  } else {
    reminds = JSON.parse(localStorage.getItem('reminds'));
  }

  reminds.push(remindItem);

  localStorage.setItem('reminds',JSON.stringify(reminds));
}

function removeRemind(e) {

  if(e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();
  }

  removeRemindsFromLS(e.target.parentElement.parentElement);
}

function removeRemindsFromLS(remindItem) {

  let reminds;
  if(localStorage.getItem('reminds') === null) {
    reminds = [];
  } else {
    reminds = JSON.parse(localStorage.getItem('reminds'));
  }


  reminds.forEach(function(remind,index){
    if(remindItem.textContent === remind) {
      reminds.splice(index,1);
    }
  })

  localStorage.setItem('reminds',JSON.stringify(reminds));
}

function clearReminds() {
 
ul.innerHTML = '';

clearRemindsFromLS();

};

function clearRemindsFromLS() {
  localStorage.clear();
}

function searchReminder(e) {

  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.list-group-item').forEach(function(remind){
    const item = remind.firstChild.textContent;

    if(item.toLowerCase().indexOf(text) != -1){
      remind.style.display = 'block';
    } else {
      remind.style.display = 'none';
    }
  })

}



