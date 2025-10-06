// ---------- APP STATE ----------
function load(key){ try{ return JSON.parse(localStorage.getItem(key)) || [] }catch(e){return []} }
function save(key, v){ localStorage.setItem(key, JSON.stringify(v)) }
function clearStorage(){ localStorage.clear(); }

// ---------- GERAÇÃO ALEATÓRIA ----------
function randomName(){ 
    const names = ['Lucas','Gabriel','Fernanda','Marcos','Julia','Rafael','Carla','Pedro','Larissa','Bruno','Amanda','Victor','Camila','Felipe','Bianca','Gustavo','Aline','Rodrigo','Daniela','Matheus'];
    return names[Math.floor(Math.random()*names.length)]; 
}
function randomCPF(){ 
    return Array.from({length:11},()=>Math.floor(Math.random()*10)).join('');
}
function randomPhone(){ 
    return '63' + Array.from({length:8},()=>Math.floor(Math.random()*10)).join('');
}
function randomPlan(){ 
    const plans = ['mensal','trimestral','anual']; 
    return plans[Math.floor(Math.random()*plans.length)];
}
function randomStatus(){ 
    const status = ['ativo','inativo','pendente']; 
    return status[Math.floor(Math.random()*status.length)];
}
function randomDate(monthsAgo=0){
    const now = new Date();
    now.setMonth(now.getMonth()-Math.floor(Math.random()*monthsAgo));
    now.setDate(Math.floor(Math.random()*298)+1);
    return now;
}


// ---------- SEED ALEATÓRIO ----------
function seedStudents(n=400){
    const students = [];
    for(let i=0;i<n;i++){
        const name = randomName();
        students.push({
            id: i+1,
            name,
            cpf: randomCPF(),
            phone: randomPhone(),
            email: `${name.toLowerCase()}@gmail.com`,
            plan: randomPlan(),
            status: randomStatus(),
            createdAt: randomDate(3) // últimos 3 meses
        });
    }
    save('students', students);
    return students;
}

function seedEquipments(n=40){
    const equipments = [];
    for(let i=0;i<n;i++){
        equipments.push({
            id:i+1,
            name:'Equipamento ' + (i+1),
            description:'Descrição do equipamento ' + (i+1),
            status:['operando','manutencao','quebrado'][Math.floor(Math.random()*3)]
        });
    }
    save('equipments', equipments);
    return equipments;
}

function seedPlans(){
    const plans = [
        {id:1, name:'Mensal', duration:'mensal', value:100},
        {id:2, name:'Trimestral', duration:'trimestral', value:270},
        {id:3, name:'Anual', duration:'anual', value:1000}
    ];
    save('plans', plans);
    return plans;
}

// ---------- RENDER FUNÇÕES ----------
function renderStudents(list){
    const tbody = document.querySelector('#studentsTable tbody');
    tbody.innerHTML = '';
    if(!list.length){ tbody.innerHTML='<tr><td colspan="7">Nenhum aluno encontrado</td></tr>'; return; }
    list.forEach(s=>{
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

function renderEquipments(list){
    const tbody = document.querySelector('#equipTable tbody');
    tbody.innerHTML='';
    list.forEach(e=>{
        const tr = document.createElement('tr');
        tr.innerHTML=`
            <td>${e.name}</td>
            <td>${e.description}</td>
            <td>${e.status}</td>
            <td>
                <button class="btn btn-sm btn-primary">Editar</button>
                <button class="btn btn-sm btn-danger">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderPlans(list){
    const tbody = document.querySelector('#plansTable tbody');
    tbody.innerHTML='';
    list.forEach(p=>{
        const tr=document.createElement('tr');
        tr.innerHTML=`
            <td>${p.name}</td>
            <td>${p.duration}</td>
            <td>R$ ${p.value}</td>
            <td>
                <button class="btn btn-sm btn-primary">Editar</button>
                <button class="btn btn-sm btn-danger">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ---------- LOCAL STORAGE UTIL ----------
function load(key){ 
    try { return JSON.parse(localStorage.getItem(key)) || []; } 
    catch(e){ return []; } 
}
function save(key, value){ 
    localStorage.setItem(key, JSON.stringify(value)); 
}

// ---------- GERAÇÃO DE DADOS ----------

// Alunos
function generateStudents() {
    const firstNames = ['Ana','Bruno','Carlos','Daniela','Eduardo','Fernanda','Gustavo','Helena','Igor','Juliana'];
    const plans = ['mensal','trimestral','anual'];
    const students = [];

    const statusDistribution = [
        ...Array(65).fill('ativo'), 
        ...Array(10).fill('inativo'), 
        ...Array(25).fill('pendente')
    ];

    for(let i=0; i<100; i++){
        const firstName = firstNames[Math.floor(Math.random()*firstNames.length)];
        const cpf = String(Math.floor(10000000000 + Math.random()*89999999999));
        const phone = '63' + String(Math.floor(900000000 + Math.random()*99999999));
        const plan = plans[Math.floor(Math.random()*plans.length)];
        const status = statusDistribution[i];

        students.push({
            id: Date.now() + i,
            name: firstName,
            cpf,
            phone,
            email: `${firstName.toLowerCase()}@exemplo.com`,
            plan,
            status,
            createdAt: new Date() 
        });
    }

    save('students', students);
    return students;
}

// Equipamentos
const equipmentNames = [
  'Esteira Ergométrica', 'Bicicleta Ergométrica', 'Elíptico', 'Máquina de Remo', 'Simulador de Escada',
  'Leg Press 45°', 'Cadeira Flexora', 'Cadeira Extensora', 'Cadeira Abdutora', 'Cadeira Adutora',
  'Pulley Costas', 'Pulley Peito', 'Cross Over', 'Supino Reto', 'Supino Inclinado',
  'Desenvolvimento de Ombro', 'Puxada Frontal', 'Puxada Costas', 'Remada Baixa', 'Remada Alta',
  'Glúteo 45°', 'Glúteo 90°', 'Hack Squat', 'Prensa Horizontal', 'Prensa Vertical',
  'Mesa Flexora', 'Mesa Romana', 'Banco Declinado', 'Banco Plano', 'Banco Inclinado',
  'Banco Ajustável', 'Step', 'Colchonete', 'Kettlebell', 'Halteres', 'Anilhas', 'Barras Olímpicas',
  'Barras Fixas', 'Paralelas', 'Corda Naval', 'Bola Suíça'
];

function generateEquipments() {
    const statusOptions = ['operando','manutenção','quebrado'];
    const equipments = equipmentNames.map((name, i) => ({
        id: Date.now() + i,
        name,
        description: `Equipamento ${name} para treino`,
        status: statusOptions[Math.floor(Math.random()*statusOptions.length)]
    }));
    save('equipments', equipments);
    return equipments;
}

// Planos
function generatePlans(){
    const plans = [
        {id:1,name:'Mensal',duration:'1 mês',value:150},
        {id:2,name:'Trimestral',duration:'3 meses',value:400},
        {id:3,name:'Anual',duration:'12 meses',value:1200},
    ];
    save('plans', plans);
    return plans;
}

// ---------- RENDER DASHBOARD ----------
function renderDashboard() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const equipments = JSON.parse(localStorage.getItem('equipments')) || [];

    // ===== Contadores =====
    document.getElementById('countActive').textContent = students.filter(s => s.status === 'ativo').length;
    document.getElementById('countInactive').textContent = students.filter(s => s.status === 'inativo').length;
    document.getElementById('countPending').textContent = students.filter(s => s.status === 'pendente').length;
    document.getElementById('countEquip').textContent = equipments.length;

    // ===== Quick summary =====
    const quickList = document.getElementById('quickList');
    quickList.innerHTML = `
        <strong>Últimos alunos:</strong>
        <ul>${students.slice(-5).map(s => `<li>${s.name}</li>`).join('')}</ul>

        <strong>Equipamentos com atenção:</strong>
        <ul>${shuffleArray(equipments.filter(e => e.status !== 'operando')).slice(0, 3)
            .map(e => `<li>${e.name} - ${e.status}</li>`).join('')}</ul>

        <strong>Parabéns hoje:</strong>
        <ul>${shuffleArray(students).slice(0,3).map(s => `<li>${s.name}</li>`).join('')}</ul>
    `;

    // ===== Gráfico de setembro - linha estilo investimento =====
    const ctx = document.getElementById('chartEnrollments').getContext('2d');
    if(window.myChart) window.myChart.destroy();

    const daysInSeptember = 30;
    const dayLabels = Array.from({length: daysInSeptember}, (_, i) => i + 1);

    // Gerando dados aleatórios com sobe/desce
    let dataPoints = [];
    let current = Math.floor(Math.random() * 10) + 5;
    for(let i = 0; i < daysInSeptember; i++){
        const change = Math.floor(Math.random() * 5) - 2;
        current = Math.max(0, current + change);
        dataPoints.push(current);
    }

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dayLabels,
            datasets: [{
                label: 'Cadastros (Setembro)',
                data: dataPoints,
                fill: true,
                borderColor: '#0d6efd',
                backgroundColor: 'rgba(13, 110, 253, 0.2)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: true } },
            scales: {
                x: { title: { display: true, text: 'Dia do mês' } },
                y: { title: { display: true, text: 'Cadastros' }, beginAtZero: true }
            }
        }
    });
}

// Função utilitária para embaralhar array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}


// ---------- RENDER ALUNOS ----------
function renderStudents(){
    const students = load('students');
    const tbody = document.querySelector('#studentsTable tbody');
    tbody.innerHTML = '';
    students.forEach(s=>{
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

// ---------- RENDER EQUIPAMENTOS ----------
function renderEquipments(){
    const equipments = load('equipments');
    const tbody = document.querySelector('#equipTable tbody');
    tbody.innerHTML = '';
    equipments.forEach(e=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${e.name}</td>
            <td>${e.description}</td>
            <td>${e.status}</td>
            <td>
                <button class="btn btn-sm btn-primary">Editar</button>
                <button class="btn btn-sm btn-danger">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ---------- RENDER PLANOS ----------
function renderPlans(){
    const plans = load('plans');
    const tbody = document.querySelector('#plansTable tbody');
    tbody.innerHTML = '';
    plans.forEach(p=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.name}</td>
            <td>${p.duration}</td>
            <td>R$ ${p.value}</td>
            <td>
                <button class="btn btn-sm btn-primary">Editar</button>
                <button class="btn btn-sm btn-danger">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ---------- INICIALIZAÇÃO ----------
document.addEventListener('DOMContentLoaded', ()=>{
    generateStudents();
    generateEquipments();
    generatePlans();
    renderDashboard();
    renderStudents();
    renderEquipments();
    renderPlans();
});


// ---------- SPA NAVEGAÇÃO ----------
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section-root');

navLinks.forEach(link => {
    link.addEventListener('click', e=>{
        e.preventDefault();
        navLinks.forEach(l=>l.classList.remove('active'));
        link.classList.add('active');
        const target = link.dataset.target;
        sections.forEach(sec=>{
            if(sec.id===target) sec.classList.remove('d-none');
            else sec.classList.add('d-none');
        });
        document.getElementById('pageTitle').textContent = target.charAt(0).toUpperCase() + target.slice(1);

        // Re-render ao mudar sessão
        if(target==='dashboard') renderDashboard();
        if(target==='alunos') renderStudents(load('students'));
        if(target==='equipamentos') renderEquipments(load('equipments'));
        if(target==='planos') renderPlans(load('plans'));
    });
});

document.addEventListener('DOMContentLoaded', ()=>{
    // Seeds iniciais se não houver dados
    if(!load('students').length) seedStudents();
    if(!load('equipments').length) seedEquipments();
    if(!load('plans').length) seedPlans();

    // Abre dashboard por padrão
    if(navLinks.length) navLinks[0].click();
});

// ---------- GERAÇÃO ALEATÓRIA DE EQUIPAMENTOS DE ACADEMIA ----------
function seedEquipments(n = 40) {
  const equipmentNames = [
    'Esteira Ergométrica', 'Bicicleta Ergométrica', 'Elíptico', 'Máquina de Remo', 'Simulador de Escada',
    'Leg Press 45°', 'Cadeira Flexora', 'Cadeira Extensora', 'Cadeira Abdutora', 'Cadeira Adutora',
    'Pulley Costas', 'Pulley Peito', 'Cross Over', 'Supino Reto', 'Supino Inclinado',
    'Desenvolvimento de Ombro', 'Puxada Frontal', 'Puxada Costas', 'Remada Baixa', 'Remada Alta',
    'Glúteo 45°', 'Glúteo 90°', 'Hack Squat', 'Prensa Horizontal', 'Prensa Vertical',
    'Mesa Flexora', 'Mesa Romana', 'Banco Declinado', 'Banco Plano', 'Banco Inclinado',
    'Banco Ajustável', 'Step', 'Colchonete', 'Kettlebell', 'Halteres', 'Anilhas', 'Barras Olímpicas',
    'Barras Fixas', 'Paralelas', 'Corda Naval', 'Bola Suíça'
  ];

  const equipments = [];
  for (let i = 0; i < n; i++) {
    const name = equipmentNames[i % equipmentNames.length];
    equipments.push({
      id: i + 1,
      name,
      description: `Descrição do ${name}`,
      status: ['operando', 'manutenção', 'quebrado'][Math.floor(Math.random() * 3)]
    });
  }
  save('equipments', equipments);
  return equipments;
}
// Busca de alunos
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = students.filter(student => student.name.toLowerCase().includes(query));
  renderStudents(filtered);
});


// ---------- FUNÇÕES DE ARMAZENAMENTO ----------
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    return [];
  }
}

function clearStorage() {
  localStorage.clear();
}
// ---------- FUNÇÕES DE ARMAZENAMENTO ----------
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    return [];
  }
}

// Função para embaralhar array
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function renderEquipments() {
  const tbody = document.querySelector('#equipTable tbody');
  tbody.innerHTML = '';

  // Embaralha os equipamentos
  const shuffled = shuffleArray([...equipmentNames]);

  shuffled.forEach((name, index) => {
    const description = `Descrição de ${name}`;
    const statusOptions = ['operando', 'manutenção', 'quebrado'];
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${name}</td>
      <td>${description}</td>
      <td>${status}</td>
      <td>
        <button class="btn btn-sm btn-primary">Editar</button>
        <button class="btn btn-sm btn-danger">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', renderEquipments);




// ======== DADOS ========
let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
let students = JSON.parse(localStorage.getItem('students')) || [];


// ======== MODAL ========
const modalBooking = new bootstrap.Modal(document.getElementById('modalBooking'));
const formBooking = document.getElementById('formBooking');
const bookingStudentInput = document.getElementById('bookingStudent');
const bookingDateInput = document.getElementById('bookingDate');
const bookingClassInput = document.getElementById('bookingClass');
const bookingStatusInput = document.getElementById('bookingStatus');
let editingBookingId = null;

// Abrir modal
document.getElementById('openBooking').addEventListener('click', () => {
  editingBookingId = null;
  populateStudentOptions(); // Preenche alunos no select
  formBooking.reset();
  modalBooking.show();
});

// ======== FUNÇÃO PARA POPULAR SELECT DE ALUNOS ========
function populateStudentOptions() {
  bookingStudentInput.innerHTML = '';
  if(!students || students.length === 0) return;
  students.forEach(s => {
    const option = document.createElement('option');
    option.value = s.name;
    option.textContent = s.name;
    bookingStudentInput.appendChild(option);
  });
}

// ======== EDITAR ========
function editBooking(id) {
  const booking = bookings.find(b => b.id === id);
  if(!booking) return;
  editingBookingId = id;
  populateStudentOptions();
  bookingStudentInput.value = booking.student;
  bookingDateInput.value = booking.date;
  bookingClassInput.value = booking.className;
  bookingStatusInput.value = booking.status;
  modalBooking.show();
}

// ======== SALVAR ========
formBooking.addEventListener('submit', (e) => {
  e.preventDefault();
  const studentId = bookingStudentInput.value; // aqui é o id do aluno selecionado
  const date = bookingDateInput.value;
  const className = bookingClassInput.value;
  const status = bookingStatusInput.value;

  // pegar lista de alunos do localStorage
  const students = load('students') || [];
  const studentObj = students.find(s => s.id == studentId);
  const studentName = studentObj ? studentObj.name : "Aluno não encontrado";

  if(editingBookingId) {
    const index = bookings.findIndex(b => b.id === editingBookingId);
    bookings[index] = { 
      ...bookings[index], 
      student: studentName, // salva o nome do aluno
      date, 
      className, 
      status 
    };
  } else {
    const id = Date.now();
    bookings.push({ id, student: studentName, date, className, status });
  }

  localStorage.setItem('bookings', JSON.stringify(bookings));
  renderBookings();
  modalBooking.hide();
});


// ======== EXCLUIR ========
function deleteBooking(id) {
  if(!confirm('Deseja realmente excluir este agendamento?')) return;
  bookings = bookings.filter(b => b.id !== id);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  renderBookings();
}

// ======== RENDER ========
function renderBookings() {
  const tbody = document.querySelector('#bookingsTable tbody');
  tbody.innerHTML = '';
  bookings.forEach(b => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${b.student}</td>
      <td>${b.date}</td>
      <td>${b.className}</td>
      <td>${b.status}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="editBooking(${b.id})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="deleteBooking(${b.id})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}


// ======== GERAR AGENDAMENTOS ALEATÓRIOS ========
function seedBookings() {
  if(bookings.length > 0) return;
  if(!students || students.length === 0) return;

  const classes = ['Musculação', 'Spinning', 'Pilates', 'Yoga', 'Treino Funcional'];
  for(let i=0;i<10;i++) { // 10 agendamentos
    const student = students[Math.floor(Math.random()*students.length)].name;
    const className = classes[Math.floor(Math.random()*classes.length)];
    const date = new Date(Date.now() - Math.random()*7*24*60*60*1000).toISOString().slice(0,16); // últimos 7 dias
    const statusOptions = ['agendado','realizado','cancelado'];
    const status = statusOptions[Math.floor(Math.random()*statusOptions.length)];
    bookings.push({ id: Date.now()+i, student, className, date, status });
  }
  localStorage.setItem('bookings', JSON.stringify(bookings));
}

// ======== INICIALIZAÇÃO ========
document.addEventListener('DOMContentLoaded', () => {
  seedBookings();
  renderBookings();
});


function populateStudentOptions() {
  bookingStudentInput.innerHTML = '';
  students = JSON.parse(localStorage.getItem('students')) || [];
  if(students.length === 0) return;
  students.forEach(s => {
    const option = document.createElement('option');
    option.value = s.name;
    option.textContent = s.name;
    bookingStudentInput.appendChild(option);
  });
}



// ======== MODAL ========
const modalStudent = new bootstrap.Modal(document.getElementById('modalStudent'));
const formStudent = document.getElementById('formStudent');
const studentNameInput = document.getElementById('studentName');
const studentCPFInput = document.getElementById('studentCPF');
const studentPhoneInput = document.getElementById('studentPhone');
const studentEmailInput = document.getElementById('studentEmail');
const studentPlanInput = document.getElementById('studentPlan');
const studentStatusInput = document.getElementById('studentStatus');
let editingStudentId = null;

// ======== ABRIR MODAL ========
document.getElementById('addStudentBtnTop').addEventListener('click', () => {
  editingStudentId = null; // novo aluno
  formStudent.reset();
  modalStudent.show();
});

// ======== EDITAR ALUNO ========
function editStudent(id) {
  const student = students.find(s => s.id === id);
  if (!student) return;

  editingStudentId = id;
  studentNameInput.value = student.name;
  studentCPFInput.value = student.cpf;
  studentPhoneInput.value = student.phone;
  studentEmailInput.value = student.email;
  studentPlanInput.value = student.plan;
  studentStatusInput.value = student.status;

  modalStudent.show();
}

// ======== SALVAR ALUNO ========
formStudent.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = studentNameInput.value.trim();
  const cpf = studentCPFInput.value.trim();
  const phone = studentPhoneInput.value.trim();
  const email = studentEmailInput.value.trim();
  const plan = studentPlanInput.value;
  const status = studentStatusInput.value;

  if (editingStudentId) {
    // Atualiza aluno existente
    const index = students.findIndex(s => s.id === editingStudentId);
    students[index] = { ...students[index], name, cpf, phone, email, plan, status };
  } else {
    // Cria novo aluno
    const id = Date.now(); // ID único simples
    students.push({ id, name, cpf, phone, email, plan, status });
  }

  localStorage.setItem('students', JSON.stringify(students));
  renderStudents();
  modalStudent.hide();
});

function renderStudents(list = []) {
    const tbody = document.querySelector('#studentsTable tbody');
    tbody.innerHTML = '';

    if (!Array.isArray(list)) {
        console.warn('renderStudents recebeu algo que não é array', list);
        list = [];
    }

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
            <button class="btn btn-sm btn-primary" onclick="editStudent(${s.id})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="deleteStudent(${s.id})">Excluir</button>
          </td>
        `;
        tbody.appendChild(tr);
    });
}


// ======== EXCLUIR ALUNO ========
function deleteStudent(id) {
  if (!confirm('Deseja realmente excluir este aluno?')) return;
  students = students.filter(s => s.id !== id);
  localStorage.setItem('students', JSON.stringify(students));
  renderStudents();
}

// ======== RENDERIZA TABELA AO CARREGAR ========
document.addEventListener('DOMContentLoaded', renderStudents);





    document.addEventListener('DOMContentLoaded', () => {
    const state = {
      users: [],
      sentLog: [], // {id, userId, type, dateSim, message}
      sentFlags: {}, // evitar duplicatas: key = `${userId}_${type}_${dateISO}`
      settings: {
        dueDays: 3,
        enabled: { birthday:true, dueSoon:true, overdue:true },
        speedDaysPerTick: 1
      },
      simDate: new Date(), // data simulada corrente
      running: false,
      tickMs: 1000, // cada tick de clock (real)
      intervalId: null
    };

    // --- Util helpers ---
    const $ = sel => document.querySelector(sel);
    const qis = sel => document.querySelectorAll(sel);
    const fmtDate = d => d.toLocaleString();
    const isoDate = d => (new Date(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().slice(0,10);

    // --- Inicialização elementos ---
    const simDateEl = $('#simDate');
    const bigClockEl = $('#bigClock');
    const statusEl = $('#status');
    const speedEl = $('#speed');
    const speedLabel = $('#speedLabel');
    const startBtn = $('#startBtn');
    const pauseBtn = $('#pauseBtn');
    const advanceBtn = $('#advanceBtn');
    const toggleGroup = $('#toggleGroup');
    const dueDaysEl = $('#dueDays');
    const usersListEl = $('#usersList');
    const historyEl = $('#history');
    const toastsEl = $('#toasts');
    const sentCountEl = $('#sentCount');

    // form
    const addUserBtn = $('#addUser');
    const addSampleBtn = $('#addSample');
    const nameEl = $('#name'); const emailEl = $('#email'); const birthdayEl = $('#birthday'); const dueDateEl = $('#dueDate');
    const clearHistoryBtn = $('#clearHistory'); const resetSimBtn = $('#resetSim');

    // --- Funções de UI ---
    function renderUsers(){
      usersListEl.innerHTML = '';
      state.users.forEach(u=>{
        const div = document.createElement('div');
        div.className = 'user';
        div.innerHTML = `<div>
          <b>${u.name}</b>
          <div class="small muted">${u.email}</div>
          <div class="small">Aniv: ${u.birthday} • Venc: ${u.dueDate}</div>
        </div>
        <div style="text-align:right">
          <div class="small muted">id:${u.id}</div>
          <div style="height:6px"></div>
          <button data-id="${u.id}" class="del">Remover</button>
        </div>`;
        usersListEl.appendChild(div);
      });
      usersListEl.querySelectorAll('.del').forEach(b=>{
        b.addEventListener('click', e=>{
          const id = e.currentTarget.dataset.id;
          state.users = state.users.filter(u=>u.id!==id);
          renderUsers(); renderHistory();
        });
      });
    }

    function addToast(type, title, text){
      const t = document.createElement('div');
      t.className = 'toast ' + (type || '');
      t.innerHTML = `<div style="font-weight:700">${title}</div><div class="small muted">${text}</div>`;
      toastsEl.appendChild(t);
      setTimeout(()=>{ t.style.opacity=0; t.style.transform='translateX(20px)'; }, 3500);
      setTimeout(()=>t.remove(), 4500);
    }

    function renderHistory(){
      historyEl.innerHTML = '';
      const reversed = [...state.sentLog].reverse();
      reversed.slice(0,200).forEach(item=>{
        const d = new Date(item.dateSim);
        const el = document.createElement('div');
        el.style.padding='8px';
        el.style.borderBottom='1px solid rgba(255,255,255,0.02)';
        el.innerHTML = `<div style="font-weight:700">${item.title}</div>
                        <div class="small muted">${item.message}</div>
                        <div class="small" style="margin-top:6px">${fmtDate(d)} — para <b>${item.userName}</b></div>`;
        historyEl.appendChild(el);
      });
      sentCountEl.textContent = state.sentLog.length;
    }

    // --- Persistência simples (localStorage) ---
    function saveLocal(){
      try{
        const save = {
          users: state.users,
          sentLog: state.sentLog,
          sentFlags: state.sentFlags,
          simDate: state.simDate.toISOString(),
          settings: state.settings
        };
        localStorage.setItem('simMessages_v1', JSON.stringify(save));
      }catch(e){ console.warn('save fail', e) }
    }
    function loadLocal(){
      try{
        const raw = localStorage.getItem('simMessages_v1');
        if(!raw) return;
        const obj = JSON.parse(raw);
        state.users = obj.users || [];
        state.sentLog = obj.sentLog || [];
        state.sentFlags = obj.sentFlags || {};
        state.settings = obj.settings || state.settings;
        if(obj.simDate) state.simDate = new Date(obj.simDate);
      }catch(e){ console.warn('load fail', e) }
    }

    // --- Lógica de disparos (regras) ---
    function checkRulesAndSend(){
      // roda por cada usuário e avalia três regras
      state.users.forEach(u=>{
        // birthday: compara mês-dia
        if(state.settings.enabled.birthday){
          const [y,m,d] = u.birthday.split('-').map(Number);
          const sim = state.simDate;
          if(sim.getMonth()+1 === m && sim.getDate() === d){
            triggerOnce(u, 'birthday', `Feliz aniversário, ${u.name}! 🎉`, `Aniversário de ${u.name} — ${u.email}`);
          }
        }

        // dueSoon: dias antes do vencimento
        if(state.settings.enabled.dueSoon){
          const due = new Date(u.dueDate + 'T00:00:00');
          const diffDays = Math.floor((due - new Date(state.simDate.getFullYear(), state.simDate.getMonth(), state.simDate.getDate())) / (24*3600*1000));
          if(diffDays >=0 && diffDays <= state.settings.dueDays){
            triggerOnce(u, 'dueSoon_'+diffDays, `Sua fatura vence em ${diffDays} dia(s)`, `Vencimento: ${u.dueDate} (${u.email})`);
          }
        }

        // overdue: já passou o vencimento
        if(state.settings.enabled.overdue){
          const due = new Date(u.dueDate + 'T00:00:00');
          if(state.simDate > due){
            const overdueDays = Math.floor((state.simDate - due)/(24*3600*1000));
            triggerOnce(u, 'overdue', `Fatura atrasada: ${overdueDays} dia(s)`, `Vencimento: ${u.dueDate}, já passaram ${overdueDays} dia(s).`);
          }
        }
      });

      // salvar estado
      saveLocal();
      renderHistory();
    }

    function triggerOnce(user, type, title, message){
      const key = `${user.id}_${type}_${isoDate(state.simDate)}`;
      // especial: tipos que devem apenas ser uma vez por evento (birthday/dueSoon with same diff)
      if(state.sentFlags[key]) return;
      // evitar duplicatas similares no mesmo dia (por tipo genérico)
      // atente: para 'overdue' queremos evitar repetir todos os ticks — marcamos por user+type sem data
      const keyNonDate = (type==='overdue') ? `${user.id}_${type}` : key;
      if(state.sentFlags[keyNonDate]) return;

      // registrar
      const entry = {
        id: Math.random().toString(36).slice(2,9),
        userId: user.id,
        userName: user.name,
        type,
        title,
        message,
        dateSim: state.simDate.toISOString()
      };
      state.sentLog.push(entry);
      state.sentFlags[key] = true;
      if(type==='overdue') state.sentFlags[`${user.id}_overdue`] = true;

      // UI
      const kind = type.startsWith('overdue') ? 'danger' : (type.startsWith('dueSoon') ? 'warn' : 'success');
      addToast(kind, title, message);
    }

    // --- Motor do tempo ---
    function tick(){
      // avança simDate por X dias por tick
      const days = Number(state.settings.speedDaysPerTick) || 1;
      state.simDate.setDate(state.simDate.getDate() + days);
      updateClock();
      checkRulesAndSend();
    }

    function start(){
      if(state.running) return;
      state.running = true;
      statusEl.textContent = 'Executando';
      state.intervalId = setInterval(tick, state.tickMs);
    }
    function pause(){
      if(!state.running) return;
      state.running = false;
      statusEl.textContent = 'Pausado';
      clearInterval(state.intervalId);
      state.intervalId = null;
    }

    function updateClock(){
      simDateEl.value = state.simDate.toISOString().slice(0,10) + ' • ' + state.simDate.toLocaleTimeString();
      bigClockEl.textContent = state.simDate.toLocaleString();
      // estimate next action (simple: when next user event occurs)
      let soon = null;
      state.users.forEach(u=>{
        const due = new Date(u.dueDate + 'T00:00:00');
        const bday = (() => {
          const [y,m,d] = u.birthday.split('-').map(Number);
          return new Date(state.simDate.getFullYear(), m-1, d);
        })();
        [bday, due].forEach(dt=>{
          const diff = dt - state.simDate;
          if(diff >= -1 && (soon===null || diff < soon.diff)){ soon = {diff, dt, user:u} }
        });
      });
      $('#nextAction').textContent = soon ? 'Próximo (estim): ' + new Date(soon.dt).toLocaleDateString() : 'Próximo disparo: —';
    }

    // --- Eventos UI ---
    speedEl.addEventListener('input', e=>{
      const v = Number(e.target.value);
      speedLabel.textContent = `${v} dia(s) / tick`;
      state.settings.speedDaysPerTick = v;
    });

    startBtn.addEventListener('click', ()=>start());
    pauseBtn.addEventListener('click', ()=>pause());
    advanceBtn.addEventListener('click', ()=>{
      // avança 1 dia imediatamente
      state.simDate.setDate(state.simDate.getDate()+1);
      updateClock();
      checkRulesAndSend();
      saveLocal();
    });

    toggleGroup.querySelectorAll('button').forEach(b=>{
      b.addEventListener('click', e=>{
        const key = b.dataset.key;
        const on = !b.classList.contains('active');
        if(on) b.classList.add('active'); else b.classList.remove('active');
        state.settings.enabled[key] = on;
      });
    });

    dueDaysEl.addEventListener('change', e=>{
      state.settings.dueDays = Number(e.target.value);
    });

    addUserBtn.addEventListener('click', ()=>{
      const name = nameEl.value.trim()||'Anon';
      const email = emailEl.value.trim()||'anon@example.com';
      const birthday = birthdayEl.value || isoDate(new Date());
      const dueDate = dueDateEl.value || isoDate(new Date(new Date().setDate(new Date().getDate()+7)));
      const id = Math.random().toString(36).slice(2,9);
      state.users.push({id, name, email, birthday, dueDate});
      nameEl.value=''; emailEl.value=''; birthdayEl.value=''; dueDateEl.value='';
      renderUsers(); saveLocal();
    });

    addSampleBtn.addEventListener('click', ()=>{
      // adiciona alguns testes com datas próximas do simDate
      const base = new Date(state.simDate);
      const iso = d => d.toISOString().slice(0,10);
      const samples = [
        {name:'Mariana', email:'maria@ex.com', birthday: iso(new Date(base.getFullYear(), base.getMonth(), base.getDate())), dueDate: iso(new Date(base.getFullYear(), base.getMonth(), base.getDate()+2))},
        {name:'João', email:'joao@ex.com', birthday: iso(new Date(base.getFullYear(), base.getMonth(), base.getDate()+1)), dueDate: iso(new Date(base.getFullYear(), base.getMonth(), base.getDate()-1))},
        {name:'Clara', email:'clara@ex.com', birthday: iso(new Date(base.getFullYear(), base.getMonth()+1, base.getDate())), dueDate: iso(new Date(base.getFullYear(), base.getMonth(), base.getDate()+5))}
      ];
      samples.forEach(s=>{
        s.id = Math.random().toString(36).slice(2,9);
        state.users.push(s);
      });
      renderUsers(); saveLocal();
    });

    clearHistoryBtn.addEventListener('click', ()=>{
      state.sentLog = []; state.sentFlags = {};
      saveLocal(); renderHistory();
    });

    resetSimBtn.addEventListener('click', ()=>{
      pause();
      state.users = []; state.sentLog = []; state.sentFlags = {}; state.settings = {dueDays:3, enabled:{birthday:true,dueSoon:true,overdue:true}, speedDaysPerTick:1};
      state.simDate = new Date();
      speedEl.value = 1; speedLabel.textContent='1 dia / tick'; dueDaysEl.value=3;
      renderUsers(); renderHistory(); updateClock(); saveLocal();
    });

    // --- Carregamento inicial ---
    loadLocal();
    // se nenhum usuário, populamos exemplo
if(state.users.length===0){
  const today = new Date();
  const iso = d => d.toISOString().slice(0,10);
  state.users = [
    {id:'u1', name:'Alice', email:'alice@.com', birthday: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate())), dueDate: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+2))},
    {id:'u2', name:'Pedro', email:'pedro@.com', birthday: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+1)), dueDate: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()-1))},
    {id:'u3', name:'Mariana', email:'mariana@.com', birthday: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+2)), dueDate: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+3))},
    {id:'u4', name:'João', email:'joao@.com', birthday: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()-1)), dueDate: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+4))},
    {id:'u5', name:'Clara', email:'clara@.com', birthday: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+3)), dueDate: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+5))},
    {id:'u6', name:'Rafael', email:'rafael@.com', birthday: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()-2)), dueDate: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+6))},
    {id:'u7', name:'Fernanda', email:'fernanda@.com', birthday: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+4)), dueDate: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+7))},
    {id:'u8', name:'Thiago', email:'thiago@.com', birthday: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()-3)), dueDate: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+8))},
    {id:'u9', name:'Patrícia', email:'patricia@.com', birthday: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+5)), dueDate: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+9))},
    {id:'u10', name:'Carlos', email:'carlos@.com', birthday: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()-4)), dueDate: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+10))},
    {id:'u11', name:'Daniela', email:'daniela@.com', birthday: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+6)), dueDate: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+11))},
    {id:'u12', name:'Eduardo', email:'eduardo@.com', birthday: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()-5)), dueDate: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+12))},
    {id:'u13', name:'Fabiana', email:'fabiana@.com', birthday: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+7)), dueDate: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+13))},
    {id:'u14', name:'Gustavo', email:'gustavo@.com', birthday: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()-6)), dueDate: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+14))},
    {id:'u15', name:'Helena', email:'helena@.com', birthday: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+8)), dueDate: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+15))},
    {id:'u16', name:'Igor', email:'igor@.com', birthday: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()-7)), dueDate: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+16))},
    {id:'u17', name:'Julia', email:'julia@.com', birthday: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+9)), dueDate: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+17))},
    {id:'u18', name:'Marcos', email:'marcos@.com', birthday: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()-8)), dueDate: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+18))},
    {id:'u19', name:'Sofia', email:'sofia@.com', birthday: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+10)), dueDate: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+19))},
    {id:'u20', name:'William', email:'william@.com', birthday: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()-9)), dueDate: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate()+20))}
  ];
}

    // carregar configurações
    speedEl.value = state.settings.speedDaysPerTick || 1;
    speedLabel.textContent = `${speedEl.value} dia(s) / tick`;
    dueDaysEl.value = state.settings.dueDays;
    // habilitar toggles UI
    toggleGroup.querySelectorAll('button').forEach(b=>{
      const key = b.dataset.key;
      if(state.settings.enabled[key]) b.classList.add('active'); else b.classList.remove('active');
    });

    // start paused by default
    updateClock();
    renderUsers();
    renderHistory();

    document.addEventListener('DOMContentLoaded', ()=>{

  // --- Estado global ---
  const state = {
    users: [],
    sentLog: [],
    sentFlags: {},
    settings: { dueDays: 3, enabled:{birthday:true,dueSoon:true,overdue:true}, speedDaysPerTick:1 },
    simDate: new Date(),
    running: false,
    tickMs: 1000,
    intervalId: null
  };

  let chart; // gráfico global

  // --- Seletores ---
  const usersListEl = document.querySelector('#usersList');
  const searchInput = document.querySelector('#searchInput');
  const studentsTable = document.querySelector('#studentsTable tbody');
  const chartCtx = document.querySelector('#chartEnrollments');

  // --- Funções auxiliares ---
  const isoDate = d => new Date(d.getFullYear(),d.getMonth(),d.getDate()).toISOString().slice(0,10);

  // --- Seed de 100 alunos aleatórios ---
  function seedSample(){
    state.users = [];
    const firstNames = ['Ana','Bruno','Carlos','Daniela','Eduardo','Fabiana','Gustavo','Helena','Igor','Julia','Marcos','Patrícia','Rodrigo','Sofia','Thiago','Vanessa','William','Yasmin','Zeca','Paula','Rafael','Fernanda','Clara','Leonardo'];
    const lastNames  = ['Silva','Souza','Oliveira','Santos','Pereira','Ferreira','Almeida','Costa','Nascimento','Rodrigues','Gomes','Martins','Barbosa','Melo','Cardoso','Azevedo','Dias','Freitas','Teixeira','Correia'];
    const plans = ['Mensal','Trimestral','Anual'];
    const statusList = ['ativo','inativo','pendente'];

    const randChoice = arr => arr[Math.floor(Math.random()*arr.length)];
    const randCPF = () => Array.from({length:11},()=>Math.floor(Math.random()*10)).join('').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    const randPhone = () => `(63) 9${Array.from({length:8},()=>Math.floor(Math.random()*10)).join('')}`;
    const randFullName = () => `${randChoice(firstNames)} ${randChoice(lastNames)} ${randChoice(lastNames)}`;

    const now = new Date();
    for(let i=0;i<100;i++){
      const created = new Date(now.getFullYear(), Math.floor(Math.random()*12), Math.floor(Math.random()*28)+1);
      state.users.push({
        id: Math.random().toString(36).slice(2,9),
        name: randFullName(),
        cpf: randCPF(),
        phone: randPhone(),
        email: `user${i}@mail.com`,
        plan: randChoice(plans),
        status: randChoice(statusList),
        createdAt: created.getTime(),
        birthday: isoDate(created),
        dueDate: isoDate(new Date(created.getTime() + 7*24*3600*1000))
      });
    }

    renderUsers();
    buildChart();
  }

  // --- Render tabela de alunos ---
  function renderUsers(list=state.users){
    studentsTable.innerHTML = '';
    if(list.length===0){
      studentsTable.innerHTML = '<tr><td colspan="7">Nenhum aluno encontrado</td></tr>';
      return;
    }
    list.forEach(u=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${u.name}</td>
        <td>${u.cpf}</td>
        <td>${u.phone}</td>
        <td>${u.email}</td>
        <td>${u.plan}</td>
        <td>${u.status}</td>
        <td>
          <button class="btn btn-sm btn-primary">Editar</button>
          <button class="btn btn-sm btn-danger">Excluir</button>
        </td>`;
      studentsTable.appendChild(tr);
    });
  }

  // --- Busca por nome ---
  searchInput.addEventListener('input', ()=>{
    const query = searchInput.value.toLowerCase();
    const filtered = state.users.filter(u=>u.name.toLowerCase().includes(query));
    renderUsers(filtered);
  });

  // --- Gráfico de cadastros ---
  function buildChart(){
    if(chart) chart.destroy();
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const daysInMonth = new Date(currentYear,currentMonth+1,0).getDate();
    const days = Array.from({length: daysInMonth}, ()=>0);

    state.users.forEach(u=>{
      const d = new Date(u.createdAt);
      if(d.getMonth()===currentMonth && d.getFullYear()===currentYear){
        days[d.getDate()-1]++;
      }
    });

    const labels = Array.from({length: daysInMonth}, (_,i)=> (i+1).toString());

    chart = new Chart(chartCtx,{
      type:'line',
      data:{
        labels,
        datasets:[{label:'Novos cadastros no mês', data:days, borderColor:'#36a2eb', backgroundColor:'#36a2eb', fill:false, tension:0.3}]
      },
      options:{responsive:true, plugins:{legend:{display:true}}, scales:{y:{beginAtZero:true}}}
    });
  }

  // --- Inicialização ---
  if(state.users.length===0){
    seedSample(); // já popula 100 alunos e renderiza
  } else {
    renderUsers();
    buildChart();
  }

});


    // start auto if you want uncomment:
    // start();

    // salvar automaticamente periodicamente
    setInterval(saveLocal, 5000);

    // small UX: press space to toggle run/pause
    window.addEventListener('keydown', e=>{
      if(e.code==='Space'){ e.preventDefault(); state.running ? pause() : start(); }
    });

    // good measure
    console.log('Simulador pronto — salve como HTML e abra no navegador.');});





    document.getElementById('openSample').addEventListener('click', () => {
    // Carrega dados do localStorage
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const equipments = JSON.parse(localStorage.getItem('equipments')) || [];
    const plans = JSON.parse(localStorage.getItem('plans')) || [];
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    // ===== Atualiza dashboard =====
    renderDashboard();

    // ===== Atualiza tabela de alunos =====
    renderStudents(students);

    // ===== Atualiza tabela de equipamentos =====
    renderEquipments();

    // ===== Atualiza tabela de planos =====
    renderPlans(plans);

    // ===== Atualiza tabela de agendamentos =====
    renderBookings(bookings);

    alert('Dados carregados do localStorage com sucesso!');
});

// Exemplo das funções de renderização que você deve ter já definidas:

function renderStudents(list) {
    const tbody = document.querySelector('#studentsTable tbody');
    tbody.innerHTML = '';
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
            <button class="btn btn-sm btn-primary" onclick="editStudent(${s.id})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="deleteStudent(${s.id})">Excluir</button>
          </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderPlans(list) {
    const tbody = document.querySelector('#plansTable tbody');
    tbody.innerHTML = '';
    list.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${p.name}</td>
          <td>${p.duration}</td>
          <td>${p.value}</td>
          <td>
            <button class="btn btn-sm btn-primary" onclick="editPlan(${p.id})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="deletePlan(${p.id})">Excluir</button>
          </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderBookings() {
  const tbody = document.querySelector('#bookingsTable tbody');
  tbody.innerHTML = '';
  bookings.forEach(b => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${b.student}</td>
      <td>${b.date}</td>
      <td>${b.className}</td>
      <td>${b.status}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="editBooking(${b.id})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="deleteBooking(${b.id})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
// Bloqueia os botões
document.getElementById('btnReset').disabled = true;
document.getElementById('btnResetTestData').disabled = true;




