





// ---------- UTIL ----------
const qs = s => document.querySelector(s);
const qsa = s => document.querySelectorAll(s);
const uid = ()=> Math.random().toString(36).slice(2,9);

// ---------- STORAGE KEYS ----------
const KEY_STUDENTS = 'gym_students';
const KEY_EQUIP = 'gym_equipments';
const KEY_BOOK = 'gym_bookings';
const KEY_PLANS = 'gym_plans';


// Função auxiliar para escolher aleatoriamente
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Gera 40 equipamentos aleatórios
function seedEquipments() {
  const equips = [];
  const equipNames = [
    'Esteira','Bicicleta','Elíptico','Remo','Supino','Leg Press','Puxador','Crossover',
    'Agachamento','Stepper','Abdominal','Barra Fixa','Prensa de Peito','Tríceps',
    'Rosca Bíceps','Flexora','Extensora','Halter','Kettlebell','Medicine Ball',
    'Jump','Corda','Banco','Anilhas','Cross Trainer','Roda Abdominal','Puxada Alta',
    'Puxada Baixa','Leg Curl','Trap Bar','Battle Rope','TRX','Escada','Plataforma','Saco de Boxe',
    'Smith','Banco Inclinado','Banco Declinado','Peso Livre','Step Aeróbico','Bola Suíça'
  ];
  const equipTypes = ['Cardio','Força','Funcional','Alongamento','Livre'];
  const statusList = ['operando','manutencao','quebrado'];

  for(let i = 0; i < 40; i++){
    equips.push({
      id: uid(),
      name: `${equipNames[i]} ${i < 10 ? '0'+(i+1) : i+1}`,
      desc: randomChoice(equipTypes),
      status: randomChoice(statusList)
    });
  }

  save(KEY_EQUIP, equips);
  renderEquipments();
  return equips;
}

// Função para carregar equipamentos
function loadEquipments() {
  const equips = load(KEY_EQUIP) || [];
  if(equips.length === 0) return seedEquipments(); // se não existir, gera
  return equips;
}

// Renderiza na tabela
function renderEquipments() {
  const equips = loadEquipments();
  const tbody = document.querySelector('#equipTable tbody');
  tbody.innerHTML = '';

  equips.forEach(e => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${e.name}</td>
      <td>${e.desc}</td>
      <td>${e.status}</td>
      <td>
        <button data-id="${e.id}" data-action="edit-e" class="btn btn-sm btn-primary">Editar</button>
        <button data-id="${e.id}" data-action="del-e" class="btn btn-sm btn-danger">Remover</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

 loadEquipments();
  renderEquipments();
  renderEquipments();

// ---------- APP STATE ----------
function load(key){ try{ return JSON.parse(localStorage.getItem(key)) || [] }catch(e){return []}}
function save(key, v){ localStorage.setItem(key, JSON.stringify(v)) }

// ---------- NAV ----------
qsa('.nav-link').forEach(a=>a.addEventListener('click', (e)=>{
  e.preventDefault(); const t = a.dataset.target; showSection(t);
}))
function showSection(id){ qsa('.section-root').forEach(s=>s.classList.add('d-none')); qs('#'+id).classList.remove('d-none'); qs('#pageTitle').innerText = id.charAt(0).toUpperCase()+id.slice(1); }

// ---------- DASHBOARD STATS ----------
function updateCounts(){ const students = load(KEY_STUDENTS); const equips = load(KEY_EQUIP);
  const active = students.filter(s=>s.status==='ativo').length;
  const inactive = students.filter(s=>s.status==='inativo').length;
  const pending = students.filter(s=>s.status==='pendente').length;
  qs('#countActive').innerText = active; qs('#countInactive').innerText = inactive; qs('#countPending').innerText = pending; qs('#countEquip').innerText = equips.length;
}

// ---------- STUDENTS ----------
function refreshStudentsTable(){ const students = load(KEY_STUDENTS); const tbody = qs('#studentsTable tbody'); tbody.innerHTML='';
  students.forEach(s=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.name}</td><td>${s.cpf||''}</td><td>${s.phone||''}</td><td>${s.email||''}</td><td>${s.plan||''}</td><td>${s.status}</td><td class="table-actions">
      <button class="btn btn-sm btn-primary" data-id="${s.id}" data-action="edit">Editar</button>
      <button class="btn btn-sm btn-danger" data-id="${s.id}" data-action="del">Excluir</button></td>`;
    tbody.appendChild(tr);
  })
}

// ---------- EQUIPMENTS ----------
function refreshEquipTable(){ const list = load(KEY_EQUIP); const tbody = qs('#equipTable tbody'); tbody.innerHTML='';
  list.forEach(e=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${e.name}</td><td>${e.desc||''}</td><td>${e.status}</td><td class="table-actions"><button class="btn btn-sm btn-primary" data-id="${e.id}" data-action="edit-e">Editar</button><button class="btn btn-sm btn-danger" data-id="${e.id}" data-action="del-e">Excluir</button></td>`;
    tbody.appendChild(tr);
  })
}

// ---------- PLANS ----------
function refreshPlanTable(){ const plans = load(KEY_PLANS); const tbody = qs('#plansTable tbody'); tbody.innerHTML=''; const sel = qs('#studentPlan'); sel.innerHTML='';
  plans.forEach(p=>{
    const tr = document.createElement('tr'); tr.innerHTML = `<td>${p.name}</td><td>${p.duration}</td><td>R$ ${Number(p.value||0).toFixed(2)}</td><td class="table-actions"><button class="btn btn-sm btn-primary" data-id="${p.id}" data-action="edit-p">Editar</button><button class="btn btn-sm btn-danger" data-id="${p.id}" data-action="del-p">Excluir</button></td>`;
    tbody.appendChild(tr);
    const opt = document.createElement('option'); opt.value = p.name; opt.textContent = p.name + ' ('+p.duration+')'; sel.appendChild(opt);
  })
}

// ---------- BOOKINGS ----------
function refreshBookingsTable(){ const bookings = load(KEY_BOOK); const tbody = qs('#bookingsTable tbody'); tbody.innerHTML='';
  bookings.forEach(b=>{
    const tr = document.createElement('tr'); tr.innerHTML = `<td>${b.studentName||''}</td><td>${new Date(b.date).toLocaleString()}</td><td>${b.className}</td><td>${b.status}</td><td class="table-actions"><button class="btn btn-sm btn-primary" data-id="${b.id}" data-action="edit-b">Editar</button><button class="btn btn-sm btn-danger" data-id="${b.id}" data-action="del-b">Excluir</button></td>`;
    tbody.appendChild(tr);
  })
}

// ---------- QUICK LIST ----------
function updateQuickList(){ const students = load(KEY_STUDENTS); const equips = load(KEY_EQUIP);
  const html = `
    <div><strong>Últimos alunos</strong><ul>${students.slice(-5).reverse().map(s => `<li>${s.name} <small class="text-muted">(${s.status})</small></li>`).join('')}</ul></div>
    <div><strong>Equipamentos com atenção</strong><ul>${equips.filter(e=>e.status!=='operando').slice(0,5).map(e=>`<li>${e.name} <small>(${e.status})</small></li>`).join('')||'<li><small class="text-muted">Nenhum</small></li>'}</ul></div>
  `;
  qs('#quickList').innerHTML = html;
}

// ---------- CHART ----------

// ---------- ACTIONS ----------
// Delegation for students table
qs('#studentsTable').addEventListener('click', e=>{
  const btn = e.target.closest('button'); if(!btn) return; const id = btn.dataset.id; const action = btn.dataset.action;
  let arr = load(KEY_STUDENTS);
  if(action==='del'){ arr = arr.filter(s=>s.id!==id); save(KEY_STUDENTS, arr); refreshAll(); }
  if(action==='edit'){ const s = arr.find(x=>x.id===id); openStudentModal(s); }
})

// Equip table actions
qs('#equipTable').addEventListener('click', e=>{
  const btn = e.target.closest('button'); if(!btn) return; const id = btn.dataset.id; const action = btn.dataset.action; let arr = load(KEY_EQUIP);
  if(action==='del-e'){ arr = arr.filter(s=>s.id!==id); save(KEY_EQUIP, arr); refreshAll(); }
  if(action==='edit-e'){ const s = arr.find(x=>x.id===id); openEquipModal(s); }
})

// Plans
qs('#plansTable').addEventListener('click', e=>{
  const btn = e.target.closest('button'); if(!btn) return; const id = btn.dataset.id; const action = btn.dataset.action; let arr = load(KEY_PLANS);
  if(action==='del-p'){ arr = arr.filter(s=>s.id!==id); save(KEY_PLANS, arr); refreshAll(); }
  if(action==='edit-p'){ const s = arr.find(x=>x.id===id); openPlanModal(s); }
})

// Bookings
qs('#bookingsTable').addEventListener('click', e=>{
  const btn = e.target.closest('button'); if(!btn) return; const id = btn.dataset.id; const action = btn.dataset.action; let arr = load(KEY_BOOK);
  if(action==='del-b'){ arr = arr.filter(s=>s.id!==id); save(KEY_BOOK, arr); refreshAll(); }
  if(action==='edit-b'){ const s = arr.find(x=>x.id===id); openBookingModal(s); }
})

// ---------- MODALS helpers ----------
const modalStudent = new bootstrap.Modal(qs('#modalStudent'));
const modalEquip = new bootstrap.Modal(qs('#modalEquip'));
const modalBooking = new bootstrap.Modal(qs('#modalBooking'));
const modalPlan = new bootstrap.Modal(qs('#modalPlan'));

function openStudentModal(data){ qs('#studentId').value = data?.id||''; qs('#studentName').value = data?.name||''; qs('#studentCPF').value = data?.cpf||''; qs('#studentPhone').value = data?.phone||''; qs('#studentEmail').value = data?.email||''; qs('#studentPlan').value = data?.plan||''; qs('#studentStatus').value = data?.status||'ativo'; modalStudent.show(); }
function openEquipModal(data){ qs('#equipId').value = data?.id||''; qs('#equipName').value = data?.name||''; qs('#equipDesc').value = data?.desc||''; qs('#equipStatus').value = data?.status||'operando'; modalEquip.show(); }
function openBookingModal(data){ // fill students
  const students = load(KEY_STUDENTS); const sel = qs('#bookingStudent'); sel.innerHTML=''; students.forEach(s=>{ const opt=document.createElement('option'); opt.value=s.id; opt.textContent=s.name; sel.appendChild(opt); })
  qs('#bookingId').value = data?.id||''; qs('#bookingDate').value = data? new Date(data.date).toISOString().slice(0,16) : '' ; qs('#bookingClass').value = data?.className||''; qs('#bookingStatus').value = data?.status||'agendado'; modalBooking.show(); }
function openPlanModal(data){ qs('#planId').value = data?.id||''; qs('#planName').value = data?.name||''; qs('#planDuration').value = data?.duration||'mensal'; qs('#planValue').value = data?.value||''; modalPlan.show(); }

// ---------- FORM SUBMITS ----------
qs('#formStudent').addEventListener('submit', e=>{
  e.preventDefault(); const id = qs('#studentId').value; const arr = load(KEY_STUDENTS);
  const payload = { id: id||uid(), name: qs('#studentName').value.trim(), cpf: qs('#studentCPF').value.trim(), phone: qs('#studentPhone').value.trim(), email: qs('#studentEmail').value.trim(), plan: qs('#studentPlan').value, status: qs('#studentStatus').value, createdAt: id? arr.find(x=>x.id===id).createdAt : Date.now() };
  let newArr; if(id){ newArr = arr.map(s=> s.id===id? payload : s) } else { newArr = [...arr,payload] }
  save(KEY_STUDENTS,newArr); modalStudent.hide(); refreshAll(); })

qs('#formEquip').addEventListener('submit', e=>{ e.preventDefault(); const id = qs('#equipId').value; const arr = load(KEY_EQUIP); const payload = { id:id||uid(), name:qs('#equipName').value.trim(), desc:qs('#equipDesc').value.trim(), status:qs('#equipStatus').value }; let newArr = id? arr.map(z=> z.id===id? payload:z) : [...arr,payload]; save(KEY_EQUIP,newArr); modalEquip.hide(); refreshAll(); })

qs('#formPlan').addEventListener('submit', e=>{ e.preventDefault(); const id = qs('#planId').value; const arr = load(KEY_PLANS); const payload = { id:id||uid(), name:qs('#planName').value.trim(), duration:qs('#planDuration').value, value: Number(qs('#planValue').value) }; let newArr = id? arr.map(z=> z.id===id? payload:z) : [...arr,payload]; save(KEY_PLANS,newArr); modalPlan.hide(); refreshAll(); })

qs('#formBooking').addEventListener('submit', e=>{ e.preventDefault(); const id = qs('#bookingId').value; const arr = load(KEY_BOOK); const students = load(KEY_STUDENTS); const student = students.find(s=>s.id===qs('#bookingStudent').value);
  const payload = { id:id||uid(), studentId: student?.id, studentName: student?.name, date: new Date(qs('#bookingDate').value).toISOString(), className: qs('#bookingClass').value, status: qs('#bookingStatus').value };
  let newArr = id? arr.map(z=> z.id===id? payload:z) : [...arr,payload]; save(KEY_BOOK,newArr); modalBooking.hide(); refreshAll(); })

// ---------- BUTTONS ----------
qs('#openAddStudent').addEventListener('click', ()=>openStudentModal()); qs('#addStudentBtnTop').addEventListener('click', ()=>openStudentModal()); qs('#openEquip').addEventListener('click', ()=>openEquipModal()); qs('#openBooking').addEventListener('click', ()=>openBookingModal()); qs('#openPlan').addEventListener('click', ()=>openPlanModal());

qs('#btnReset').addEventListener('click', ()=>{ if(confirm('Limpar todos os dados locais?')){ localStorage.removeItem(KEY_STUDENTS); localStorage.removeItem(KEY_EQUIP); localStorage.removeItem(KEY_BOOK); localStorage.removeItem(KEY_PLANS); refreshAll(); } })


// ---------- SAMPLE DATA ----------

// VARIÁVEL GLOBAL
let chart; // declare fora de qualquer função

function buildChart(){
  const ctx = document.querySelector('#chartEnrollments');

  // destrói instância anterior se existir
  if(chart) chart.destroy();

  const students = load(KEY_STUDENTS);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear  = now.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = Array.from({length: daysInMonth}, (_,i)=>0);

  students.forEach(s=>{
    const d = new Date(s.createdAt || Date.now());
    if(d.getMonth() === currentMonth && d.getFullYear() === currentYear){
      days[d.getDate()-1]++;
    }
  });

  const labels = Array.from({length: daysInMonth}, (_,i)=> (i+1).toString());

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Novos cadastros no mês',
        data: days,
        fill: false,
        borderColor: '#36a2eb',
        backgroundColor: '#36a2eb',
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

  const students = [];
// Marcar 20 alunos como novos
function markNewStudents(students) {
  // embaralha o array
  const shuffled = students.sort(() => 0.5 - Math.random());
  const newStudents = shuffled.slice(0, 20);

  newStudents.forEach(s => {
    s.isNew = true;
    // define a data de criação para o mês atual
    const now = new Date();
    const day = Math.floor(Math.random() * 28) + 1;
    s.createdAt = new Date(now.getFullYear(), now.getMonth(), day).getTime();
  });
}

// No buildChart
students.forEach(s => {
  const d = new Date(s.createdAt || Date.now());
  if(s.isNew && d.getMonth() === currentMonth && d.getFullYear() === currentYear){
    days[d.getDate()-1]++;
  }
});

// ---------- SAMPLE DATA ----------
  qs('#openSample').addEventListener('click', () => {
  if (confirm('Adicionar dados de exemplo?')) {
    seedSample();
    refreshAll();
  }
});


// ---------- LOCAL STORAGE ----------
function load(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch(e) { return []; }
}
function save(key, v) { localStorage.setItem(key, JSON.stringify(v)); }

// ---------- POPULAÇÃO INICIAL ----------
let equipments = load("equipamentos");
let plans = load("planos");

// Se não houver nada, cria dados de exemplo
if (students.length === 0) {
  for (let i = 1; i <= 100; i++) {
    students.push({
      name: "Aluno " + i,
      cpf: "000.000.000-" + String(i).padStart(2, "0"),
      phone: "1190000" + String(1000 + i),
      email: "aluno" + i + "@email.com",
      plan: ["Básico", "Premium", "VIP"][i % 3],
      status: ["ativo", "inativo", "pendente"][i % 3]
    });
  }
  save("alunos", students);
}

if (equipments.length === 0) {
  equipments = [];
  for (let i = 1; i <= 40; i++) {
    equipments.push({ name: "Equipamento " + i, status: "ativo" });
  }
  save("equipamentos", equipments);
}

if (plans.length === 0) {
  plans = [
    { name: "Básico", price: 100 },
    { name: "Premium", price: 200 },
    { name: "VIP", price: 300 }
  ];
  save("planos", plans);
}

// ---------- FUNÇÕES DE RENDERIZAÇÃO ----------
function renderStudents(list = students) {
  const tbody = document.querySelector('#studentsTable tbody');
  tbody.innerHTML = '';

  if(list.length === 0){
    tbody.innerHTML = '<tr><td colspan="7">Nenhum aluno encontrado</td></tr>';
    return;
  }

  list.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${s.name}</td>
      <td>${s.cpf}</td>
      <td>${s.phone}</td>
      <td>${s.email}</td>
      <td>${s.plan}</td>
      <td>${s.status}</td>
      <td>
        <button class="btn btn-sm btn-primary">Editar</button>
        <button class="btn btn-sm btn-danger">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ---------- LOCAL STORAGE ----------
function load(key){ try{ return JSON.parse(localStorage.getItem(key)) || [] }catch(e){return []} }
function save(key, v){ localStorage.setItem(key, JSON.stringify(v)) }

// ---------- VARIÁVEIS ----------


// ---------- POPULAÇÃO INICIAL ----------
if (students.length === 0) {
  students = [];
  for (let i = 1; i <= 100; i++) {
    students.push({
      name: "Aluno " + i,
      cpf: "000.000.000-" + String(i).padStart(2, "0"),
      phone: "1190000" + String(1000 + i),
      email: "aluno" + i + "@email.com",
      plan: ["Básico","Premium","VIP"][i%3],
      status: ["ativo","inativo","pendente"][i%3]
    });
  }
  save("alunos", students);
}

if (equipments.length === 0) {
  equipments = [];
  for (let i = 1; i <= 40; i++) {
    equipments.push({ name: "Equipamento " + i, status: "ativo" });
  }
  save("equipamentos", equipments);
}

if (plans.length === 0) {
  plans = [
    { name: "Básico", price: 100 },
    { name: "Premium", price: 200 },
    { name: "VIP", price: 300 }
  ];
  save("planos", plans);
}

// ---------- CHAMADA INICIAL ----------
renderStudents();
renderEquipments();
renderPlans();

function renderPlans(list = plans) {
  const tbody = document.querySelector('#plansTable tbody');
  tbody.innerHTML = '';

  if(list.length === 0){
    tbody.innerHTML = '<tr><td colspan="2">Nenhum plano encontrado</td></tr>';
    return;
  }

  list.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.price}</td>
      <td>
        <button class="btn btn-sm btn-primary">Editar</button>
        <button class="btn btn-sm btn-danger">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ---------- CHAMADA INICIAL ----------
renderStudents();
renderEquipments();
renderPlans();

// Função de busca por nome
const searchInput = document.querySelector('#searchInput');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = students.filter(s => s.name.toLowerCase().includes(query));
  renderStudents(filtered);
});

// Função para construir gráfico de novos cadastros
function buildChart(){
  const ctx = document.querySelector('#chartEnrollments');
  if(chart) chart.destroy();

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear  = now.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth+1, 0).getDate();
  const days = Array.from({length: daysInMonth}, ()=>0);

  students.forEach(s=>{
    const d = new Date(s.createdAt);
    if(d.getMonth() === currentMonth && d.getFullYear() === currentYear){
      days[d.getDate()-1]++;
    }
  });

  const labels = Array.from({length: daysInMonth}, (_,i)=> (i+1).toString());

  chart = new Chart(ctx, {
    type:'line',
    data:{
      labels,
      datasets:[{
        label:'Novos cadastros no mês',
        data:days,
        borderColor:'#36a2eb',
        backgroundColor:'#36a2eb',
        fill:false,
        tension:0.3
      }]
    },
    options:{
      responsive:true,
      plugins:{legend:{display:true}},
      scales:{y:{beginAtZero:true}}
    }
  });
}

// Botão para adicionar os 100 alunos
document.querySelector('#openSample').addEventListener('click', () => {
  if(confirm('Adicionar 100 alunos de exemplo?')){
    seedSample();
  }
});

  // ---------- REFRESH ALL ----------
function refreshAll(){ updateCounts(); refreshStudentsTable(); refreshEquipTable(); refreshPlanTable(); refreshBookingsTable(); updateQuickList(); buildChart(); }

// initial
refreshAll();


