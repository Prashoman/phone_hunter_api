
const loadApi = (value, dataLimit) => {
    const  url = `https://openapi.programming-hero.com/api/phones?search=${value}`;
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => allApiSet(data.data, dataLimit))
}

const allApiSet = (data, dataLimit) =>{
    const containerCard = document.getElementById("card-container");
    containerCard.innerText = '';
    const elartData = document.getElementById("alart-element");

    const showBtnElement = document.getElementById('show-ele');
    

    if(dataLimit && data.length > 10){
        data = data.slice(0,12);
        showBtnElement.classList.remove('d-none');
    }else{
        
        showBtnElement.classList.add('d-none');
    }

    ///alart massege
    if(data.length === 0){
        showBtnElement.classList.add('d-none');
        elartData.classList.remove("d-none");
    }else{
        elartData.classList.add("d-none");
    }
    console.log(data.length)
    data.forEach(data => {
        console.log(data)
        const div = document.createElement("div");
        div.classList.add('col');
        div.innerHTML = `
        
            <div class="card">
            <img  src="${data.image}" class="card-img-top img-fluid w-50 h-30 ms-5 mt-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.phone_name}</h5>
                <h4> ${data.brand} </h4>
                <button class="btn btn-info"> details</button>
            </div>
            </div>
        
        
        `;
        containerCard.appendChild(div);
    });
    isLoaderElement(false);
}

document.getElementById('search-btn').addEventListener("click", function (){
    const searchValue = document.getElementById("search-feild").value;


    if(searchValue == ''){
        alert('please enter the string value')
    }else{
        isLoaderElement(true);
    
    loadApi(searchValue ,10)
    }
    

});



document.getElementById("show-btn").addEventListener('click', function() {

    const searchValue = document.getElementById("search-feild").value;

    isLoaderElement(true);

    if( searchValue == ''){
        loadApi('iphone')
    }else{
        loadApi(searchValue)
    }
    


});


///loding components function
const isLoaderElement = (loding) => {
    const spineerElemet = document.getElementById('spineer-ele');
    if(loding){
        spineerElemet.classList.remove("d-none");
    }else{
        spineerElemet.classList.add("d-none");
    }

    
}

loadApi('iphone', 10)