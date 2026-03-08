let length = document.getElementById("issue-length");
const cardData = document.getElementById("card-data")
const openCard = document.getElementById("card-data-1");
const closedCard = document.getElementById("card-data-2");



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
loadinSCreen(true)
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
    return`<div id="open-cards" class=" card bg-base-100 border-t-4  ${element.status ==="open"? "border-[green]": "border-[#A855F7]" }  shadow-[0_5px_10px_rgba(0,0,0,0.2)] space-y-2.5 h-96">
    <div class="card-body space-y-2.5 ">
    <div class="flex justify-between">
    <img ${element.status ==="open"?'src="./assets/Open-Status.png" alt=""':'src="./assets/Closed- Status .png" alt=""'} >
    <div>
    
    <p>${element.priority.toUpperCase()}</p>
    </div>
    </div >
    <h2 class="font-semibold capitalize text-lg">${element.title}</h2>
    <p class="text-[#64748B] line-clamp-2">${element.description}</p>
    <div class="">
    <button class="btn ">BUG</button>
    <button class="btn ">HELP WANTED</button>
    </div>
    </div>
    <hr class="text-[#E4E4E7]">
    <div class="p-5 space-y-2.5 text-[#64748B]">
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
  console.log(id);

  
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
    // console.log( openCard.children.length);
  }else if(id === "btn-closed"){
    // console.log("closed button clicked");
    cardData.classList.add("hidden")
    openCard.classList.add("hidden")
    closedCard.classList.remove("hidden")
    length.innerText = closedCard.children.length;
  }

}

const renderOpenData =(id)=>{

  
  id.map(element =>{
   if(element.status === "open"){
    const html = `<div id="open-cards" class=" card bg-base-100 border-t-4  ${element.status ==="open"? "border-[green]": "border-[#A855F7]" }  shadow-[0_5px_10px_rgba(0,0,0,0.2)] space-y-2.5 h-96">
                <div class="card-body space-y-2.5 ">
                    <div class="flex justify-between">
                        <img ${element.status ==="open"?'src="./assets/Open-Status.png" alt=""':'src="./assets/Closed- Status .png" alt=""'} >
                        <div>

                            <p>${element.priority.toUpperCase()}</p>
                        </div>
                    </div >
                    <h2 class="font-semibold capitalize text-lg">${element.title}</h2>
                    <p class="text-[#64748B] line-clamp-2">${element.description}</p>
                    <div class="">
                        <button class="btn ">BUG</button>
                        <button class="btn ">HELP WANTED</button>
                    </div>
                </div>
                <hr class="text-[#E4E4E7]">
                <div class="p-5 space-y-2.5 text-[#64748B]">
                    <p>
                   ${element.author}
                    </p>
                <p>${element.createdAt}</p>
                </div>
               
            </div>`
            openCard.innerHTML +=html
            
   }else if(element.status === "closed"){
    const html = `<div id="open-cards" class=" card bg-base-100 border-t-4  ${element.status ==="open"? "border-[green]": "border-[#A855F7]" }  shadow-[0_5px_10px_rgba(0,0,0,0.2)] space-y-2.5 h-96">
                <div class="card-body space-y-2.5 ">
                    <div class="flex justify-between">
                        <img ${element.status ==="open"?'src="./assets/Open-Status.png" alt=""':'src="./assets/Closed- Status .png" alt=""'} >
                        <div>

                            <p>${element.priority.toUpperCase()}</p>
                        </div>
                    </div >
                    <h2 class="font-semibold capitalize text-lg">${element.title}</h2>
                    <p class="text-[#64748B] line-clamp-2">${element.description}</p>
                    <div class="">
                        <button class="btn ">BUG</button>
                        <button class="btn ">HELP WANTED</button>
                    </div>
                </div>
                <hr class="text-[#E4E4E7]">
                <div class="p-5 space-y-2.5 text-[#64748B]">
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
// all button section 

const main= document.getElementById("main").addEventListener("click",(e)=>{
    const btns = e.target.closest("#all-btn");
    const isBtn =e.target.closest("button");

    if (!isBtn) {
      return
    }

    for (const btn of btns.children) {
     
      btn.classList.remove("activ")
      btn.classList.remove("btn-primary")
      btn.classList.add("remove")
    }
    isBtn.classList.add("activ")
     
    
})

allData()