
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
                <button onclick = "getPhoneSlug('${data.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mobileDetails"> details</button>

                
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

///btn slug function

const  getPhoneSlug = async (id) =>{
    console.log(id)

    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    // const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    // const res = await fetch(url);
    // const data = await res.json();
    // displayPhones(data.data, dataLimit);
    console.log(url)
    const res = await fetch(url);
    const data = await res.json();
   

    showDataSlugModel(data.data)
}

const showDataSlugModel = (data) =>{

     const modelContainer = document.getElementById('model-iphone');
     modelContainer.innerHTML = `
     <div class="modal fade" id="mobileDetails" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mobileDetailsLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="mobileDetailsLabel">Brande Name : ${data.brand}</h1> <br>
                <h3>storeage : ${data.brand}</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                
            </div>
            </div>
        </div>
    </div>
     
     
     `;
    console.log(data)
}

loadApi('iphone', 10)