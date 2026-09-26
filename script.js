const jobs = [
 {id:1,title:"Frontend Developer",company:"Nova Labs",location:"Remote",type:"Full-time",experience:"Mid Level",category:"Engineering",salary:115000,displaySalary:"$95k–$115k",logo:"N",color:"blue",days:1,description:"Build polished, accessible interfaces with modern JavaScript and component-based UI patterns. Work closely with product and design to ship customer-facing features."},
 {id:2,title:"UI/UX Designer",company:"Pixelly Studio",location:"New York, NY",type:"Full-time",experience:"Mid Level",category:"Design",salary:105000,displaySalary:"$85k–$105k",logo:"P",color:"purple",days:2,description:"Own end-to-end product experiences, from research and wireframes to high-fidelity prototypes. Collaborate with engineers to deliver thoughtful interfaces."},
 {id:3,title:"Digital Marketing Specialist",company:"Orbit Media",location:"Remote",type:"Contract",experience:"Entry Level",category:"Marketing",salary:72000,displaySalary:"$60k–$72k",logo:"O",color:"orange",days:2,description:"Plan and execute digital campaigns across search and social channels, analyze performance, and help grow a fast-moving technology brand."},
 {id:4,title:"Data Analyst",company:"Vertex Analytics",location:"Austin, TX",type:"Full-time",experience:"Entry Level",category:"Data",salary:90000,displaySalary:"$75k–$90k",logo:"V",color:"green",days:3,description:"Turn product and business data into clear insights. Build dashboards, investigate trends, and partner with stakeholders on data-informed decisions."},
 {id:5,title:"Product Manager",company:"Cloudbase",location:"San Francisco, CA",type:"Full-time",experience:"Senior Level",category:"Product",salary:145000,displaySalary:"$125k–$145k",logo:"C",color:"pink",days:4,description:"Lead product strategy from discovery through launch. Define priorities, align cross-functional teams, and measure outcomes against customer needs."},
 {id:6,title:"Junior Web Developer",company:"Brightworks",location:"Remote",type:"Internship",experience:"Entry Level",category:"Engineering",salary:48000,displaySalary:"$40k–$48k",logo:"B",color:"yellow",days:5,description:"Learn by building real production features with HTML, CSS and JavaScript. Great opportunity for a developer starting their professional journey."},
 {id:7,title:"Content Strategist",company:"Northstar",location:"Chicago, IL",type:"Part-time",experience:"Mid Level",category:"Marketing",salary:62000,displaySalary:"$50k–$62k",logo:"N",color:"teal",days:6,description:"Create content strategies that connect audience needs with business goals. Work across editorial, social and campaign content."},
 {id:8,title:"Senior Product Designer",company:"Frame Labs",location:"Remote",type:"Full-time",experience:"Senior Level",category:"Design",salary:132000,displaySalary:"$110k–$132k",logo:"F",color:"violet",days:7,description:"Shape the experience of a rapidly growing SaaS product. Mentor designers and establish systems that scale across multiple product areas."}
];

const grid=document.getElementById("jobGrid"), count=document.getElementById("resultCount"), empty=document.getElementById("emptyState");
const keyword=document.getElementById("keywordInput"), locationInput=document.getElementById("locationInput");
const experience=document.getElementById("experienceFilter"), category=document.getElementById("categoryFilter"), remote=document.getElementById("remoteFilter");
const sort=document.getElementById("sortSelect");
let visible=6, activeJob=null;

const colorClass={blue:"blue",purple:"purple",orange:"orange",green:"green",pink:"pink",yellow:"yellow",teal:"teal",violet:"violet"};
function timeLabel(d){return d===1?"1 day ago":d+" days ago"}
function getFiltered(){
 const q=keyword.value.trim().toLowerCase(), loc=locationInput.value.trim().toLowerCase();
 const types=[...document.querySelectorAll(".type-filter:checked")].map(x=>x.value);
 let result=jobs.filter(j=>(!q||[j.title,j.company,j.category].join(" ").toLowerCase().includes(q))&&(!loc||j.location.toLowerCase().includes(loc)||loc==="remote"&&j.location==="Remote")&&(!types.length||types.includes(j.type))&&(!experience.value||j.experience===experience.value)&&(!category.value||j.category===category.value)&&(!remote.checked||j.location==="Remote"));
 if(sort.value==="salary")result.sort((a,b)=>b.salary-a.salary); else result.sort((a,b)=>a.days-b.days);
 return result;
}
function render(){
 const result=getFiltered(), shown=result.slice(0,visible);
 count.textContent=result.length+" opportunities found";
 grid.innerHTML=shown.map(j=>`<article class="job-card">
   <div class="job-icon ${colorClass[j.color]}">${j.logo}</div>
   <div class="job-main"><h3><button onclick="openJob(${j.id})">${j.title}</button></h3><div class="job-company">${j.company} · ${j.location}</div>
   <div class="job-meta"><span>◷ ${timeLabel(j.days)}</span><span>◉ ${j.type}</span><span>⌖ ${j.category}</span></div>
   <div class="job-tags"><span>${j.experience}</span><span>${j.location==="Remote"?"Remote":"On-site"}</span></div></div>
   <div><div class="salary">${j.displaySalary}</div><button class="save" onclick="toggleSave(this,${j.id})" aria-label="Save job">♡</button></div>
 </article>`).join("");
 empty.hidden=result.length>0; document.getElementById("loadMore").style.display=result.length>visible?"block":"none";
}
function openJob(id){
 const j=jobs.find(x=>x.id===id); activeJob=j;
 document.getElementById("modalIcon").textContent=j.logo;
 document.getElementById("modalCompany").textContent=j.company;
 document.getElementById("modalTitle").textContent=j.title;
 document.getElementById("modalMeta").textContent=j.location+" · "+j.type+" · "+j.displaySalary;
 document.getElementById("modalTags").innerHTML=`<span>${j.category}</span><span>${j.experience}</span><span>${j.location==="Remote"?"Remote":"On-site"}</span>`;
 document.getElementById("modalDescription").textContent=j.description;
 document.getElementById("modalBackdrop").hidden=false; document.body.style.overflow="hidden";
}
function closeModal(){document.getElementById("modalBackdrop").hidden=true;document.body.style.overflow=""}
function toggleSave(btn,id){btn.classList.toggle("saved");btn.textContent=btn.classList.contains("saved")?"♥":"♡";showToast(btn.classList.contains("saved")?"Job saved":"Job removed from saved jobs")}
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2200)}
document.getElementById("searchForm").addEventListener("submit",e=>{e.preventDefault();visible=6;render();document.getElementById("jobs").scrollIntoView({behavior:"smooth"})});
[experience,category,remote,sort].forEach(el=>el.addEventListener("change",()=>{visible=6;render()}));
document.querySelectorAll(".type-filter").forEach(el=>el.addEventListener("change",()=>{visible=6;render()}));
document.getElementById("clearFilters").onclick=()=>{document.querySelectorAll(".type-filter").forEach(x=>x.checked=false);experience.value="";category.value="";remote.checked=false;render()};
document.getElementById("resetEmpty").onclick=()=>{keyword.value="";locationInput.value="";document.getElementById("clearFilters").click()};
document.getElementById("loadMore").onclick=()=>{visible+=2;render()};
document.getElementById("modalClose").onclick=closeModal;
document.getElementById("modalBackdrop").addEventListener("click",e=>{if(e.target.id==="modalBackdrop")closeModal()});
document.getElementById("applyBtn").onclick=()=>showToast("Application flow opened for "+activeJob.title);
document.getElementById("modalSave").onclick=()=>showToast("Job saved to your profile");
document.getElementById("filterBtn").onclick=()=>document.getElementById("filters").classList.toggle("open");
document.getElementById("menuBtn").onclick=()=>showToast("Use the page sections below to explore");
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
render();