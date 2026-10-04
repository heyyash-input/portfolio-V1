(function () {
  "use strict";
  var D = typeof PORTFOLIO !== "undefined" ? PORTFOLIO : {}, $ = function (s) { return document.querySelector(s); };
  var panel=$("#chat-panel"), launcher=$("#chat-launcher"), close=$("#chat-close"), form=$("#chat-form"), input=$("#chat-input"), log=$("#chat-messages");
  if (!panel || !launcher || !form || !input || !log) return;
  var arr=function(x){return Array.isArray(x)?x:[];};
  var esc=function(x){return String(x==null?"":x).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});};
  var L=D.links||{}, projects=arr(D.projects), skills=arr(D.skills&&D.skills.groups).reduce(function(a,g){return a.concat(arr(g.items));},[]);
  var exp=arr(D.experience), edu=arr(D.education), certs=arr(D.certificates), awards=arr(D.achievements);
  var resume=typeof D.resume==="string"?D.resume:(D.resume&&D.resume.file)||"", resumeUrl=/^https?:\/\//i.test(resume)?resume:new URL(resume||"#",document.baseURI).href;
  function projectAnswer(re){var found=projects.filter(function(p){return re.test((p.title+" "+(p.subtitle||"")).toLowerCase());});if(!found.length)return "I don’t have details for that project yet. See Projects for current information.";return found.map(function(p){return "<strong>"+esc(p.title)+" · "+esc(p.subtitle||"")+"</strong><br>"+esc(p.description)+(p.metric&&p.metric.value?"<br><br>Result: "+esc(p.metric.value)+" "+esc(p.metric.label||""):"")+(p.tech&&p.tech.length?"<br><br>Built with: "+p.tech.map(esc).join(", ")+".":"")+(p.github?'<br><a href="'+esc(p.github)+'" target="_blank" rel="noopener noreferrer">View source code</a>':"");}).join("<br><br>");}
  var rules=[
    [/tulip|child|gemini/,function(){return projectAnswer(/tulip/);}],
    [/lidar|point cloud|pytorch/,function(){return projectAnswer(/lidar/);}],
    [/edupredict|prediction|student performance/,function(){return projectAnswer(/edupredict/);}],
    [/e-khata|khata|banking/,function(){return projectAnswer(/e-khata/);}],
    [/freelanc|freelancer/,function(){return 'Yes, Yash does freelance work. Please contact him at <a href="mailto:'+esc(L.email||"")+'">'+esc(L.email||"his email")+'</a>.';}],
    [/code|github|repository|source/,function(){var linked=projects.filter(function(p){return p.github;});return linked.length?"Project code: "+linked.map(function(p){return '<a href="'+esc(p.github)+'" target="_blank" rel="noopener noreferrer">'+esc(p.title)+" source code</a>";}).join(" · "):"Project code links are not available yet.";}],
    [/project|built|work|portfolio/,function(){return "Yash’s projects: "+projects.map(function(p){return "<strong>"+esc(p.title)+"</strong> — "+esc(p.description);}).join("<br><br>")+' <br><a href="#projects">Browse projects</a>.';}],
    [/skill|technology|tech stack|programming|language|backend|ai|machine learning|ml tools/,function(){return "Yash’s listed skills include "+skills.map(esc).join(", ")+'. <a href="#skills">See all skills</a>.';}],
    [/experience|intern|prodigy/,function(){return exp.map(function(e){return "<strong>"+esc(e.role)+" · "+esc(e.company)+"</strong> ("+esc(e.start)+"–"+esc(e.end)+"): "+esc(e.summary);}).join("<br><br>")+' <a href="#experience">See experience</a>.';}],
    [/education|degree|college|university|cgpa/,function(){return edu.map(function(e){return "<strong>"+esc(e.degree)+"</strong>, "+esc(e.school)+" ("+esc(e.start)+"–"+esc(e.end)+")"+(e.grade?" · "+esc(e.grade):"")+".";}).join("<br>");}],
    [/resume|résumé|cv|curriculum/,function(){return resume?'You can <a href="'+esc(resumeUrl)+'" '+(/^https?:\/\//i.test(resume)?'target="_blank" rel="noopener noreferrer"':'download="Yash_Patil_Resume.pdf"')+'>view or download Yash’s résumé</a>.':"The résumé link is unavailable right now.";}],
    [/contact|email|reach|hire|linkedin/,function(){return 'The best way to reach Yash is <a href="mailto:'+esc(L.email||"")+'">'+esc(L.email||"his email")+'</a>. You can also <a href="'+esc(L.linkedin||"#contact")+'" target="_blank" rel="noopener noreferrer">connect on LinkedIn</a>.';}],
    [/certificate|certification|course/,function(){return "Certifications include "+certs.map(function(c){return esc(c.title);}).join(", ")+'. <a href="#achievements">See certificates</a>.';}],
    [/achievement|leetcode|hackathon|sih|problem/,function(){return awards.map(function(a){return "<strong>"+esc(a.value)+" · "+esc(a.title)+"</strong>: "+esc(a.text);}).join("<br><br>")+' <a href="#achievements">See achievements</a>.';}],
    [/available|open|role|position|opportunit/,function(){var s=D.status||{};return esc(s.title||"Open to opportunities")+": "+esc(s.detail||"See Contact for details")+'. <a href="#contact">Get in touch</a>.';}]
  ];
  function respond(q){q=q.toLowerCase().replace(/[^a-z0-9+.#\s-]/g," ").replace(/\s+/g," ").trim();if(/^(hi|hello|hey|good morning|good afternoon|good evening)$/.test(q))return "Hi! Ask me about Yash’s projects, skills, experience, résumé or contact details.";for(var i=0;i<rules.length;i++)if(rules[i][0].test(q))return rules[i][1]();return 'I can answer questions about projects, skills, experience, education, résumé and contact details. Try a suggestion, or <a href="mailto:'+esc(L.email||"")+'">email Yash</a> for anything else.';}
  function add(content,who,html){var n=document.createElement("div");n.className="chat-message "+who;if(html)n.innerHTML=content;else n.textContent=content;log.appendChild(n);log.scrollTop=log.scrollHeight;}
  function send(raw){var q=String(raw||"").trim().slice(0,300);if(!q)return;add(q,"user",false);add(respond(q),"bot",true);input.value="";input.focus();}
  var starterGroups=[
    {title:"Projects",description:"Explore Yash's project work",questions:["What problem does Tulip solve?","What technologies did you use for EduPredict?","What accuracy did LiDARNet achieve?","Where can I see Yash's project code?"]},
    {title:"Skills & Experience",description:"Skills, internship and certificates",questions:["What backend technologies does Yash know?","What did Yash do during his internship?","What AI or machine-learning tools has he used?","What certifications does Yash have?"]},
    {title:"Contact & Opportunities",description:"Jobs, freelancing and contact",questions:["Is Yash open to job opportunities?","How can I contact Yash?","Does Yash do freelance work?"]}
  ];
  function menuCard(title,choices,mode){var box=document.createElement("div");box.className="chat-message bot chat-welcome";var heading=document.createElement("h3");heading.className="chat-choice-title";heading.textContent=title;box.appendChild(heading);var list=document.createElement("ul");list.className="chat-welcome-list";choices.forEach(function(choice){var item=document.createElement("li"),button=document.createElement("button");button.type="button";button.className=mode==="topics"?"chat-topic-button":"";if(mode==="topics"){var name=document.createElement("strong"),detail=document.createElement("small");name.textContent=choice.title;detail.textContent=choice.description;button.appendChild(name);button.appendChild(detail);button.addEventListener("click",function(){add(choice.title,"user",false);showQuestions(choice);});}else{button.textContent=choice;button.addEventListener("click",function(){send(choice);});}item.appendChild(button);list.appendChild(item);});box.appendChild(list);if(mode==="questions"){var back=document.createElement("button");back.type="button";back.className="chat-back-button";back.textContent="Choose another topic";back.addEventListener("click",function(){add("Choose another topic","user",false);showTopics();});box.appendChild(back);}log.appendChild(box);log.scrollTop=log.scrollHeight;}
  function showTopics(){menuCard("What would you like help with?",starterGroups,"topics");}
  function showQuestions(group){menuCard("Questions about "+group.title,group.questions,"questions");}
  function welcome(){add("Hi! I'm Mira, Yash's portfolio assistant. Pick a topic and I'll show you some questions.","bot",false);showTopics();}
  var welcomed=false;
  function open(){panel.hidden=false;launcher.setAttribute("aria-expanded","true");if(!welcomed){welcome();welcomed=true;}input.focus();}
  function shut(){panel.hidden=true;launcher.setAttribute("aria-expanded","false");launcher.focus();}
  launcher.addEventListener("click",function(){if(panel.hidden)open();else shut();});close.addEventListener("click",shut);
  form.addEventListener("submit",function(e){e.preventDefault();send(input.value);});
  document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!panel.hidden)shut();});
})();


