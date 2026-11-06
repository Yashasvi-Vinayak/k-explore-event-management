const events = [
{id:"e1",title:"Afterglow — The Live Sessions",category:"Music",date:"2026-11-21",time:"6:30 PM – 10:00 PM",venue:"Ekamra Haat, Bhubaneswar",price:"Free entry",description:"An open-air evening of independent music, good energy and new discoveries. Bring your friends, find a spot under the lights and let the sound take over.",image:"https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80"},
{id:"e2",title:"Build for Tomorrow",category:"Technology",date:"2026-11-28",time:"10:00 AM – 4:00 PM",venue:"KIIT Convention Centre, Bhubaneswar",price:"₹199",description:"A hands-on technology gathering for curious minds. Hear from builders, exchange ideas and explore the tools shaping what comes next.",image:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80"},
{id:"e3",title:"The Art of Seeing",category:"Arts",date:"2026-12-05",time:"11:00 AM – 7:00 PM",venue:"Odisha Modern Art Gallery",price:"Free entry",description:"A thoughtful showcase of contemporary visual art, illustration and photography from emerging artists. Come look closer and leave inspired.",image:"https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=80"},
{id:"e4",title:"Ideas After Hours",category:"Community",date:"2026-11-21",time:"5:00 PM – 8:00 PM",venue:"The Brew Corner, Patia",price:"₹149",description:"A relaxed creative meet-up for people who love making things happen. Share what you're working on, meet collaborators and leave with fresh ideas.",image:"https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80"},
{id:"e5",title:"Clay, Create & Connect",category:"Workshop",date:"2026-12-12",time:"2:00 PM – 5:00 PM",venue:"Studio Mitti, Saheed Nagar",price:"₹499",description:"Slow down and get your hands messy in this beginner-friendly pottery session. All materials are included, and you take your creation home.",image:"https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80"},
{id:"e6",title:"Sunset Sound Garden",category:"Music",date:"2026-12-19",time:"4:30 PM – 9:00 PM",venue:"Forest Park Amphitheatre",price:"₹299",description:"A sunset music experience with local selectors, warm lights and an easygoing crowd. Come for the music, stay for the atmosphere.",image:"https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=80"}
];
const $ = s => document.querySelector(s);
const grid=$("#eventGrid"), search=$("#searchInput"), filters=$("#filters"), empty=$("#emptyState"), count=$("#resultCount");
let activeCategory="All", searchTerm="";
const dateParts = date => {const d=new Date(date+"T12:00:00");return {day:d.getDate(),month:d.toLocaleString("en",{month:"short"}),full:d.toLocaleDateString("en",{day:"numeric",month:"long",year:"numeric"})};};
function renderEvents(){
 const shown=events.filter(e=>(activeCategory==="All"||e.category===activeCategory)&&`${e.title} ${e.category} ${e.venue} ${e.description}`.toLowerCase().includes(searchTerm));
 grid.innerHTML=shown.map(e=>{const d=dateParts(e.date);return `<article class="event-card" tabindex="0" role="button" aria-label="View ${e.title}" data-event="${e.id}"><div class="event-photo"><img src="${e.image}" alt="${e.title}" loading="lazy"><span class="category-tag">${e.category}</span><div class="event-date-badge"><strong>${d.day}</strong><span>${d.month.toUpperCase()}</span></div></div><div class="event-card-body"><div class="event-meta"><span>◷ ${e.time.split("–")[0].trim()}</span><span>⌖ ${e.venue.split(",")[0]}</span></div><div class="event-countdown"><span>STARTS IN</span><strong data-countdown="${e.id}">Calculating…</strong></div><h3>${e.title}</h3><p>${e.description}</p><div class="card-bottom"><strong>${e.price}</strong><span>VIEW EVENT <b class="card-arrow">↗</b></span></div></div></article>`}).join("");
 count.textContent=`Showing ${shown.length} of ${events.length} events`;
 empty.hidden=shown.length!==0;grid.hidden=shown.length===0;
}
function getEventStart(event){
 const timeText=event.time.split("–")[0].trim();
 const match=timeText.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
 const start=new Date(`${event.date}T00:00:00`);
 if(match){
  let hour=Number(match[1])%12;
  if(match[3].toUpperCase()==="PM")hour+=12;
  start.setHours(hour,Number(match[2]),0,0);
 }else{
  start.setHours(12,0,0,0);
 }
 return start.getTime();
}
function updateCountdowns(){
 const now=Date.now();
 document.querySelectorAll("[data-countdown]").forEach(node=>{
  const event=events.find(item=>item.id===node.dataset.countdown);
  if(!event)return;
  const remaining=getEventStart(event)-now;
  if(remaining<=0){node.textContent="Event has started";return;}
  const days=Math.floor(remaining/86400000);
  const hours=Math.floor((remaining%86400000)/3600000);
  const minutes=Math.floor((remaining%3600000)/60000);
  const seconds=Math.floor((remaining%60000)/1000);
  node.textContent=`${days}d ${String(hours).padStart(2,"0")}h ${String(minutes).padStart(2,"0")}m ${String(seconds).padStart(2,"0")}s`;
 });
}
function openEvent(id){
 const e=events.find(x=>x.id===id);if(!e)return;const d=dateParts(e.date);
 $("#modalContent").innerHTML=`<div class="modal-hero" style="background-image:url('${e.image}')"></div><div class="modal-inner"><div class="eyebrow"><span class="eyebrow-line"></span>${e.category.toUpperCase()} · FEATURED EXPERIENCE</div><h2 id="modalTitle">${e.title}</h2><div class="detail-meta"><span>▦ ${d.full}</span><span>◷ ${e.time}</span><span>⌖ ${e.venue}</span><strong>${e.price}</strong></div><p>${e.description}</p><form class="register-form" id="registerForm" novalidate><h3>Save your spot</h3><input type="hidden" name="eventId" value="${e.id}"><div class="form-grid"><div class="form-field"><label for="fullName">FULL NAME *</label><input id="fullName" name="fullName" autocomplete="name" required maxlength="70" placeholder="Your name"></div><div class="form-field"><label for="email">EMAIL ADDRESS *</label><input id="email" name="email" type="email" autocomplete="email" required placeholder="you@example.com"></div><div class="form-field full"><label for="phone">PHONE NUMBER *</label><input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="numeric" required placeholder="10-digit mobile number" maxlength="15"></div></div><p class="form-error" id="formError" aria-live="polite"></p><button class="button button-primary form-submit" type="submit">Confirm registration <span>↗</span></button><small style="display:block;color:var(--muted);font-size:9px;margin-top:10px">Demo project: your registration is saved locally in this browser.</small></form></div>`;
 $("#eventModal").hidden=false;document.body.style.overflow="hidden";$("#fullName").focus();
}
function closeModal(){$("#eventModal").hidden=true;document.body.style.overflow="";}
function getRegistrations(){try{return JSON.parse(localStorage.getItem("kExploreRegistrations")||"[]")}catch{return []}}
function saveRegistrations(items){localStorage.setItem("kExploreRegistrations",JSON.stringify(items))}
function renderRegistrations(){
 const list=$("#registrationList"),regs=getRegistrations();
 if(!regs.length){list.innerHTML='<div class="registration-empty"><span>↗</span><strong>Nothing on your calendar yet.</strong><small>Find an event and make it yours.</small><a href="#events">Browse events →</a></div>';return;}
 list.innerHTML=regs.map(r=>`<div class="registration-item"><div><strong>${escapeHtml(r.eventTitle)}</strong><small>${escapeHtml(r.date)} · ${escapeHtml(r.name)}</small></div><span>✓</span></div>`).join("");
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2600);}
filters.addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;filters.querySelectorAll("button").forEach(x=>x.classList.toggle("selected",x===b));renderEvents();});
search.addEventListener("input",()=>{searchTerm=search.value.trim().toLowerCase();renderEvents();});
$("#clearFilters").addEventListener("click",()=>{activeCategory="All";searchTerm="";search.value="";filters.querySelectorAll("button").forEach(b=>b.classList.toggle("selected",b.dataset.category==="All"));renderEvents();});
$("#resetSearch").addEventListener("click",()=>$("#clearFilters").click());
grid.addEventListener("click",e=>{const card=e.target.closest("[data-event]");if(card)openEvent(card.dataset.event);});
grid.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches("[data-event]")){e.preventDefault();openEvent(e.target.dataset.event);}});
$("#eventModal").addEventListener("click",e=>{if(e.target===e.currentTarget||e.target.closest("[data-close]"))closeModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();search.focus();}});
$("#modalContent").addEventListener("submit",e=>{
 if(e.target.id!=="registerForm")return;e.preventDefault();
 const form=e.target,fd=new FormData(form),name=String(fd.get("fullName")||"").trim(),email=String(fd.get("email")||"").trim(),phone=String(fd.get("phone")||"").replace(/\D/g,""),eventId=String(fd.get("eventId")),event=events.find(x=>x.id===eventId),error=$("#formError");
 if(name.length<2){error.textContent="Please enter your full name (at least 2 characters).";$("#fullName").focus();return;}
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){error.textContent="Please enter a valid email address.";$("#email").focus();return;}
 if(!/^\d{10}$/.test(phone)){error.textContent="Please enter a valid 10-digit phone number.";$("#phone").focus();return;}
 const regs=getRegistrations();if(regs.some(r=>r.eventId===eventId&&r.email.toLowerCase()===email.toLowerCase())){error.textContent="This email is already registered for this event.";return;}
 regs.push({id:`${eventId}-${email.toLowerCase()}`,eventId,eventTitle:event.title,date:dateParts(event.date).full,name,email,phone,createdAt:new Date().toISOString()});saveRegistrations(regs);renderRegistrations();closeModal();toast("You're registered! Your spot is saved in this browser.");
});
$("#themeToggle").addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.setItem("kExploreTheme",document.body.classList.contains("dark")?"dark":"light");});
if(localStorage.getItem("kExploreTheme")==="dark")document.body.classList.add("dark");
$("#menuToggle").addEventListener("click",()=>{const open=$("#nav").classList.toggle("open");$("#menuToggle").setAttribute("aria-expanded",String(open));});
$("#nav").addEventListener("click",e=>{if(e.target.closest("a")){$("#nav").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false");}});
const today=new Date();document.querySelectorAll(".event-card").forEach(()=>{});
renderEvents();renderRegistrations();updateCountdowns();setInterval(updateCountdowns,1000);