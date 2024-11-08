// DOM Elemente
const inputName = document.getElementById('inputName');
const inputCategory = document.getElementById('inputCategory');
const inputYear = document.getElementById('inputYear');
const buttonAdd = document.getElementById('btn-add');
const formTitle = document.getElementById('title-form');
const table = document.getElementById('table-list');

const inputSearch = document.getElementById('input-search');

const sortBtnId = document.getElementById('sortBtnId');
const sortBtnName = document.getElementById('sortBtnName');
const sortBtnCategory = document.getElementById('sortBtnCategory');
const sortBtnYear = document.getElementById('sortBtnYear');

// states 
let states = {
    btnState: 'add' || 'edit',
    sortState: 'id' || 'name' || 'category' || 'year',
    sortType: 'aufsteigend' || 'absteigend', 
}

let itemlist = [];
let selectedButonId = 0;

function addItem(name, category, year) {
        let item = {};
        item.name = name;
        item.category = category;
        item.year = year;
        item.editBtn = document.createElement('button');
        item.deleteBtn = document.createElement('button');
        itemlist.push(item);
        setIDs();
        item.editBtn.onclick = () => {
            selectedButonId = item.id;
            states.btnState = 'edit';
            formTitle.innerHTML = 'Edit item';
            buttonAdd.innerHTML = 'Edit item';    
        }
        item.editBtn.innerHTML = "Edit";
    
        item.deleteBtn.onclick = () => {
            removeItem(item.id);
        }
        item.deleteBtn.innerHTML = 'X';
    
        updateDom(itemlist);     
}

function removeItem(i) {
    itemlist = itemlist.filter(el => el.id !== i);
    setIDs();
    updateDom(itemlist);
}

function editItem(index, name, category, year) {
    for(let i = 0; i < itemlist.length; i++) {
        if (i === index) {

            name !== '' ? itemlist[i].name = name : itemlist[i].name;
            category !== '' ? itemlist[i].category = category : itemlist[i].category;
            year !== '' ? itemlist[i].year = year : itemlist[i].year;
        }
    }
    updateDom(itemlist);
}

function setIDs() {
    itemlist.forEach(el => el.id = itemlist.indexOf(el));
}

function updateDom(array) {
    table.innerHTML = `
        <tr>
            <th onclick="updateDom(sortItems('id'))" id="sortBtnId">S.no</th>
            <th onclick="updateDom(sortItems('name'))" id="sortBtnName">Name</th>
            <th onclick="updateDom(sortItems('category'))" id="sortBtnCategory">Category</th>
            <th onclick="updateDom(sortItems('year'))" id="sortBtnYear">Year</th>
            <th class="cell-btn">Edit Entry</th>
            <th class="cell-btn">Delete Entry</th>
        </tr>
    `;
    if (array.length > 0) {
        for (let a = 0; a < array.length; a++) {
            let tr = document.createElement('tr');
            table.appendChild(tr);
            tr.classList.add('item-row');
            tr.innerHTML += `
                <td>${array[a].id}</td>
                <td>${array[a].name}</td>
                <td>${array[a].category}</td>
                <td>${array[a].year}</td>
            `;
            let td1 = document.createElement('td');
            td1.classList.add('btnTd');
            td1.appendChild(array[a].editBtn);
            let td2 = document.createElement('td');
            td2.classList.add('btnTd');
            td2.appendChild(array[a].deleteBtn);

            tr.appendChild(td1);
            tr.appendChild(td2);
        } 
    }
    console.log(states.sortState);
}

function sortItems(index) {
    if (states.sortType === 'absteigend') {
        states.sortType = 'aufsteigend';
    } else if(states.sortType === 'aufsteigend') {
        states.sortType = 'absteigend';
    }
    
    let sortedList = itemlist.map(el => el[index]);
    sortedList = sortedList.sort();
    states.sortType === 'absteigend' ? sortedList.reverse() : sortedList;
    let sortedItemList = [];

    for(let a = 0; a < itemlist.length; a++) {
        for(let b = 0; b < itemlist.length; b++) {
            if(itemlist[b][index] === sortedList[a]) {
                sortedItemList.push(itemlist[b]); 
            }
        }        
    }

    states.sortState = index; 

    return sortedItemList;
}

function filterItems() {
    let filteredListName = [];
    let filteredList = [];
    filteredListName = itemlist.map(el => el.name);
    
    filteredListName = filteredListName.filter(el => el.toLowerCase().indexOf(inputSearch.value.toLowerCase()) > -1);
    console.log(filteredListName);

    for(let a = 0; a < itemlist.length; a++) {
        for(let b = 0; b < itemlist.length; b++) {
            if(itemlist[b]['name'] === filteredListName[a]) {
                filteredList.push(itemlist[b]); 
                console.log(filteredList);
            }
        }        
    }

    return filteredList;
}

buttonAdd.addEventListener('click', () => {
    if (states.btnState === 'add') {
        addItem(inputName.value, inputCategory.value, inputYear.value);
    } else {
        editItem(selectedButonId, inputName.value, inputCategory.value, inputYear.value);
        states.btnState = 'add';
        formTitle.innerHTML = 'Add item';
        buttonAdd.innerHTML = 'Add item';
    }
    clearForm();
});

inputSearch.oninput = () => {
    if(inputSearch.value !== '') {
        updateDom(filterItems());
    } else {
        if (states.sortState !== 'name' && states.sortState !== 'category' && states.sortState !== 'year') {
            updateDom(itemlist);
        } else if (states.sortState === 'name' || states.sortState === 'category' || states.sortState === 'year') {
            updateDom(sortItems(states.sortState));
        } 
    }
}

sortBtnId.onclick = updateDom(itemlist); 

sortBtnName.onclick = updateDom(sortItems("name")); 
sortBtnCategory.onclick = updateDom(sortItems("category"));
sortBtnYear.onclick = updateDom(sortItems("year"));

function clearForm() {
    inputName.value = '';
    inputCategory.value = '';
    inputYear.value = '';
}