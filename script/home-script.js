let length = document.getElementById("issue-length");
const cardData = document.getElementById("card-data")
const openCard = document.getElementById("card-data-1");
const closedCard = document.getElementById("card-data-2");
const btnAll = document.getElementById("all-btn");

const createBtn = (arr)=>{
  const html = arr.map(element =>{
    
    
    return `
    <div>
        <button class="btn rounded-2xl text-[12px] font-medium text-[#9CA3AF] ${element === 'bug' ? 'text-[#EF4444] bg-[#FECACA]  ' : element === 'help wanted'? 'text-[#D97706] bg-[#FFF8DB]':element === "enhancement"? 'bg-[#BBF7D0] text-green-400 ':''} ">${element.toUpperCase()}</button>
    </div>`
  }).join("");
  // console.log(arr);
  
  return html
  
}

;


let open =[];

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
 
  open =data.data;
    
  displayAllData(data.data) 
  renderOpenData(open)
  

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
     
    
     

    // console.log( cardData.children.length);
    length.innerText = cardData.children.length;
    // loadinSCreen()
    
    
  }else if(id === "btn-open"){
    // console.log("open button clicked");
    cardData.classList.add("hidden");
    openCard.classList.remove("hidden")
    closedCard.classList.add("hidden")
    length.innerText = openCard.children.length;
     
     
  }else if(id === "btn-closed"){
    // console.log("closed button clicked");
    cardData.classList.add("hidden")
    openCard.classList.add("hidden")
    closedCard.classList.remove("hidden")
    length.innerText = closedCard.children.length;
  }

}

const renderOpenData =(id)=>{

  
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
  word.innerHTML =`<h3 class="text-lg font-bold">${data.title}</h3>
    <p class="py-4 ">${data.status}</p>
    
    <div>
    ${createBtn(data.labels)}
    </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>`

  document.getElementById("my_modal_5").showModal()
}

allData()