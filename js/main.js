

var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteURL');
var table = document.getElementById('table-group-divider');
var form = document.getElementById('form');
let items = [];
if(localStorage.getItem("data")!=null){
    items = JSON.parse(localStorage.getItem("data"));
    display();
}

function add() {
    var nameValue = siteName.value.trim(); 
    var urlValue = siteUrl.value.trim();
    if (!nameValue.match(/^[a-zA-Z]+$/)) {
        alert('Please enter a valid name with letters only');
        return;
    }
    if (urlValue === '') {
        alert('Please fill in the URL field');
        return;
    }
    if (!urlValue.startsWith('http://') && !urlValue.startsWith('https://')) {
        alert('Please enter a valid URL starting with "http://" or "https://"');
        return;
    }

    var obj = {
        name: nameValue,
        url: urlValue,
        timestamp: new Date().toLocaleString()
    };

    items.push(obj);
    localStorage.setItem("data", JSON.stringify(items));
    clearForm();
    display();
}


function openLink(url) {
    window.open(url, '_blank');
}

function display() {
    var box = '';
    for (var i = 1; i < items.length; i++) {
        box += `
            <tr>
                <th scope="row" class="ps-3">${i}</th>
                <td>${items[i].name}</td>
                <td><button class="btn btn-warning" onclick="openLink('${items[i].url}')"><i class='bx bx-show-alt pe-2'></i>Visit</button></td>
                <td class=""><button onclick="deleteObj(${i})" class="btn btn-danger"><i class='bx bx-trash-alt pe-2'></i>Delete</button></td>
            </tr>
        `;
    }
    table.innerHTML = box;
}
function deleteObj(index){
    items.splice(index,1);
    localStorage.setItem("data",JSON.stringify(items))
    display();
}

function clearForm(){
    siteName.value='';
    siteUrl.value='';
}

formHandle.addEventListener('click',function(e){
    e.preventDefault();
})
