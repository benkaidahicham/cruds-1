let title=document.getElementById('title');
let price=document.getElementById('price');
let texes=document.getElementById('texes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let total=document.getElementById('total');
let searchTitle=document.getElementById('searchTitle');
let searchCategory=document.getElementById('searchCategory');
let mood = 'creat';
let tmp ;
//get total
function getTotal(){
    if(price.value != ''){
       let result = (+price.value + +texes.value + +ads.value)  - +discount.value;
        total.innerHTML= result;
        total.style.background="green";
    }else{
        total.innerHTML= "";
        total.style.background="red";
    }
};

//creat data
let datapro;
if(localStorage.prodect != null){
    datapro = JSON.parse(localStorage.prodect)
}else{
    datapro =[];
};
function creatData(){
    let newPro = {
        title:title.value,
        price:price.value,
        texes:texes.value,
        ads:ads.value,
        discount:discount.value,
        count:count.value,
        category:category.value,
        total:total.innerHTML,
    }
    if(mood === "creat"){
            if(newPro.count > 1){
        for(let i =0; i<newPro.count;i++){
            datapro.push(newPro);
        }
    }else{
        datapro.push(newPro);
    }
}else{
    datapro[tmp]=newPro;
    mood = 'creat';
    submit.innerHTML='creat';
    count.style.display="block";
    
};
    
    localStorage.setItem('prodect', JSON.stringify(datapro));
    clearInputs();  
    showData();  
};

//clear inputs
function clearInputs(){
    title.value ='';
    price.value='';
    texes.value='';
    ads.value='';
    discount.value='';
    count.value='';
    category.value='';
    total.innerHTML='';
};

//read data 
function showData(){
  let table = "";
  for(let i=0;i<datapro.length;i++){
  table += `
    <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].texes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    
  `
  }
  document.getElementById('tbody').innerHTML = table;
  let clearData = document.getElementById('deleteAll');
  if(datapro.length>0){
      clearData.innerHTML=`<button onclick="clearall()">delete all (${datapro.length})</button>`;
  }else{
    clearData.innerHTML="";
  };
  
}



//delete data
function deleteData(i){
    datapro.splice(i,1);
    localStorage.prodect = JSON.stringify(datapro);
    showData();
};
function clearall(){
    localStorage.clear()
    datapro.splice(0)
    showData()
}

//update Data

function updateData(i){
    title.value =datapro[i].title;
    price.value=datapro[i].price;
    texes.value=datapro[i].texes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    getTotal();
    count.style.display="none";
    submit.innerHTML="update";
    category.value=datapro[i].category;
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}
//search in data
let searchMood ='titel';
function searchInData(id){
    let search = document.getElementById('search');
    if(id == "searchTitle"){
        searchMood = 'titel';
        search.placeholder="search by titel";
    }else{
        searchMood = 'catigory';
        search.placeholder = "search by catigory";
    }
    search.focus(); 
    
}
function searchInData(value){
    let table = "";
    if(searchMood == 'titel'){
       
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].title.includes(value)){
                table += `
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].texes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                
                `
        }
        }
    }else{
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].category.includes(value)){
                table += `
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].texes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                
                `
        }
            }

    }
    document.getElementById('tbody').innerHTML = table;
}