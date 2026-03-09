let length = document.getElementById("issue-length");
const cardData = document.getElementById("card-data")
const openCard = document.getElementById("card-data-1");
const closedCard = document.getElementById("card-data-2");
const btnAll = document.getElementById("all-btn");
const searchBox = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");

const createBtn = (arr)=>{
  const html = arr.map(element =>{
    
    
    return `
    
        <button class="btn rounded-2xl text-[12px] font-medium text-[#9CA3AF] ${element === 'bug' ? 'text-[#EF4444] bg-[#FECACA]  ' : element === 'help wanted'? 'text-[#D97706] bg-[#FFF8DB]':element === "enhancement"? 'bg-[#BBF7D0] text-green-400 ':''} ">${element.toUpperCase()}</button>
`
  }).join("");
  // console.log(arr);
  
  return html
  
}

;


let issue =[];

const loadinSCreen =(status)=>{
  if (status === true) {
    
    cardData.classList.add("hidden")
    openCard.classList.add("hidden")
    closedCard.classList.add("hidden")  
}else{
  cardData.classList.remove("hidden")
  
  document.getElementById("spinner").classList.add("hidden")
}
}

const allData = async ()=>{
  loadinSCreen(true)
  const url =" https://phi-lab-server.vercel.app/api/v1/lab/issues"
  const respons = await fetch(url);
  const data = await respons.json();
 
  issue =data.data;
    
  displayAllData(data.data) 
  renderOpenData(issue)
  

}


const displayAllData = (id)=>{
  openCard.classList.add("hidden")
  closedCard.classList.add("hidden")
  const html = id.map(element => {
    // console.log(element);
    return`<div id="card-${element.id}" onclick="loadModal(${element.id})" class=" card bg-base-100 border-t-4  ${element.status ==="open"? "border-[green]": "border-[#A855F7]" }  shadow-[0_5px_10px_rgba(0,0,0,0.2)]  space-y-2.5 max-w-96 h-96">
    <div class="card-body lg:space-y-2.5 ">
    <div class="flex justify-between">
    <img ${element.status ==="open"?'src="./assets/Open-Status.png" alt=""':'src="./assets/Closed- Status .png" alt=""'} >
    <div>
    
    <p class= "${element.priority === 'high' ? 'text-red-500' : element.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}">${element.priority.toUpperCase()}</p>
    </div>
    </div >
    <h2 class="font-semibold capitalize lg:text-lg">${element.title}</h2>
    <p class="text-[#64748B] line-clamp-2">${element.description}</p>
    <div class="flex flex-wrap text-[12px] gap-1">
   ${createBtn(element.labels)}
    </div>
    </div>
    <hr class="text-[#E4E4E7]">
    <div class="mx-auto space-y-2.5 text-[#64748B]">
    <p>
    ${element.author}
    </p>
    <p>${element.createdAt}</p>
    </div>
    
    </div>`
    
    
  }).join("");
  cardData.innerHTML =html
  
  loadinSCreen(false);
  length.innerText = cardData.children.length;
}



let currentFilter = "all";
const toggole =(id)=>{
  const btn = document.getElementById(id);
  console.log(btn);
  
  console.log(typeof id);

  for (const element of btnAll.children) {
    
   
    element.classList.remove("btn-primary")
    element.classList.add("remove")  
    console.log(element);
  }     
  btn.classList.add("btn-primary")
  btn.classList.remove("remove")
 
     
  if (id === "btn-all") {
    cardData.classList.remove("hidden")
    openCard.classList.add("hidden")
    closedCard.classList.add("hidden")
      currentFilter = "all";
     console.log(currentFilter);    
     

    // console.log( cardData.children.length);
    length.innerText = cardData.children.length;
    // loadinSCreen()
    
    
  }else if(id === "btn-open"){
    // console.log("open button clicked");
    cardData.classList.add("hidden");
    openCard.classList.remove("hidden")
    closedCard.classList.add("hidden")
    length.innerText = openCard.children.length;
     currentFilter = "open"; ;

     
     
  }else if(id === "btn-closed"){
    // console.log("closed button clicked");
    cardData.classList.add("hidden")
    openCard.classList.add("hidden")
    closedCard.classList.remove("hidden")
    length.innerText = closedCard.children.length;
      currentFilter = "closed";

  }

}

const renderOpenData =(id)=>{

  closedCard.innerHTML ="";
  openCard.innerHTML ="";
  id.forEach(element =>{
    if(element.status === "open"){
    const html = `<div id="card-${element.id}" onclick="loadModal(${element.id})" class=" card bg-base-100 border-t-4  ${element.status ==="open"? "border-[green]": "border-[#A855F7]" }  shadow-[0_5px_10px_rgba(0,0,0,0.2)]  space-y-2.5 max-w-96 h-96">
    <div class="card-body lg:space-y-2.5 ">
    <div class="flex justify-between">
    <img ${element.status ==="open"?'src="./assets/Open-Status.png" alt=""':'src="./assets/Closed- Status .png" alt=""'} >
    <div>
    
    <p class= "${element.priority === 'high' ? 'text-red-500' : element.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}">${element.priority.toUpperCase()}</p>
    </div>
    </div >
    <h2 class="font-semibold capitalize lg:text-lg">${element.title}</h2>
    <p class="text-[#64748B] line-clamp-2">${element.description}</p>
    <div class="flex flex-wrap text-[12px] gap-1">
   ${createBtn(element.labels)}
    </div>
    </div>
    <hr class="text-[#E4E4E7]">
    <div class="mx-auto space-y-2.5 text-[#64748B]">
    <p>
    ${element.author}
    </p>
    <p>${element.createdAt}</p>
    </div>
    
    </div>`
            openCard.innerHTML +=html
            
   }else if(element.status === "closed"){
    const html = `<div id="card-${element.id}" onclick="loadModal(${element.id})" class=" card bg-base-100 border-t-4  ${element.status ==="open"? "border-[green]": "border-[#A855F7]" }  shadow-[0_5px_10px_rgba(0,0,0,0.2)]  space-y-2.5 max-w-96 h-96">
    <div class="card-body lg:space-y-2.5 ">
    <div class="flex justify-between">
    <img ${element.status ==="open"?'src="./assets/Open-Status.png" alt=""':'src="./assets/Closed- Status .png" alt=""'} >
    <div>
    
    <p class= "${element.priority === 'high' ? 'text-red-500' : element.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}">${element.priority.toUpperCase()}</p>
    </div>
    </div >
    <h2 class="font-semibold capitalize lg:text-lg">${element.title}</h2>
    <p class="text-[#64748B] line-clamp-2">${element.description}</p>
    <div class="flex flex-wrap text-[12px] gap-1">
   ${createBtn(element.labels)}
    </div>
    </div>
    <hr class="text-[#E4E4E7]">
    <div class="mx-auto space-y-2.5 text-[#64748B]">
    <p>
    ${element.author}
    </p>
    <p>${element.createdAt}</p>
    </div>
    
    </div>`

            closedCard.innerHTML +=html

   }
  
})
  
}

const loadModal = async (id)=>{
  const url =`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.data);
  displayModalData(data.data)
}

const displayModalData = (data)=>{
  const word = document.getElementById("word");
  console.log(data);
  
  word.innerHTML =`<h3 class="text-lg font-bold">${data.title}</h3>
  
  
    <div class="flex text-[14px]  text-[#64748B]">
 
     <p><span class="font-extrabold m-2 ${data.status === 'open' ? 'text-green-500' : 'text-red-500'}">${data.status}</span>•Created by ${data.author} at ${data.createdAt}</p>
    </div>
    <div>
    
    ${createBtn(data.labels)}
    </div>
    <div class="py-4">
    <p class="text-[14px] text-[#64748B]">${data.description}</p>
    </div>

    <div class="flex justify-between bg-[#64748B10] p-4 rounded-2xl">
      <div>
      <h3 class="font-semibold text-[16px] text-[#64748B]">Assignee:</h3>
      <p class="text-[14px] text-black font-bold">${data.assignee ? data.assignee.toUpperCase() : 'Tanzim Ahmed'}</p>
      </div>
      <div>
      <h3 class="font-semibold text-[16px] text-[#64748B]">Priority:</h3>
      <p class="text-[14px] text-black font-bold ${data.priority === 'high' ? 'text-red-500' : data.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}">${data.priority.toUpperCase()}</p>
      </div>
    </div>

    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-primary">Close</button>
      </form>
    </div>`

  document.getElementById("my_modal_5").showModal()
}
