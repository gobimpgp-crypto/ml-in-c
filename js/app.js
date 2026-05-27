const TOTAL_CHAPTERS = 8;
function getProgress(){const p=localStorage.getItem("ml-c-progress");return p?JSON.parse(p):{}}
function saveProgress(d){localStorage.setItem("ml-c-progress",JSON.stringify(d))}
function clearProgress(){localStorage.removeItem("ml-c-progress");updateProgressUI();updateChapterItems()}
function updateProgressUI(){const prog=getProgress();const count=Object.values(prog).filter(Boolean).length;const pct=(count/TOTAL_CHAPTERS)*100;const bar=document.getElementById("progressBar");const txt=document.getElementById("progressText");if(bar)bar.style.width=pct+"%";if(txt)txt.textContent=count+" of "+TOTAL_CHAPTERS+" chapters completed";}
function updateChapterItems(){const prog=getProgress();document.querySelectorAll(".chapter-item[data-chapter]").forEach(el=>{const ch=el.dataset.chapter;if(prog[ch])el.classList.add("completed");else el.classList.remove("completed")});}
function markChapterComplete(chapterId){const prog=getProgress();prog[chapterId]=true;saveProgress(prog);const btn=document.getElementById("markCompleteBtn");if(btn){btn.textContent="Completed!";btn.classList.add("completed")}updateSidebarDone();}
function updateSidebarDone(){const prog=getProgress();document.querySelectorAll(".sidebar-link[data-chapter]").forEach(el=>{const ch=el.dataset.chapter;if(prog[ch])el.classList.add("done");else el.classList.remove("done")});}
document.addEventListener("DOMContentLoaded",()=>{updateProgressUI();updateChapterItems();updateSidebarDone();const btn=document.getElementById("markCompleteBtn");if(btn){const chapterId=btn.dataset.chapter;const prog=getProgress();if(prog[chapterId]){btn.textContent="Completed!";btn.classList.add("completed")}btn.addEventListener("click",()=>markChapterComplete(chapterId));}if(window.Prism)Prism.highlightAll();});
