// --- Guard de autenticación simple ---
(function(){
    const token = localStorage.getItem('auth_token');
    if (!token) {
      // Si estamos en index y no hay token, devolvemos a login
      if (location.pathname.toLowerCase().endsWith('index.html')) {
        window.location.href = 'login.html';
      }
    }
  })();
  
  // --- Estado de demo (datos ficticios) ---
  const state = {
    vehiculos: [
      {unidad:'NIC-T2', placas:'JNK-9021', marca:'Freightliner', modelo:'Cascadia 2021', conductor:'Luis Pérez', km:185200, disponibilidad:'OK'},
      {unidad:'MEX-T5', placas:'JCR-3302', marca:'Kenworth', modelo:'T680 2020', conductor:'Ana Ruiz', km:152300, disponibilidad:'OK'},
      {unidad:'GDL-T3', placas:'JDG-7731', marca:'International', modelo:'LT 2019', conductor:'Carlos Vega', km:210540, disponibilidad:'WARN'},
    ],
    conductores: ['Luis Pérez','Ana Ruiz','Carlos Vega','María López'],
    proveedores: [
      {nombre:'Refacciones del Centro', contacto:'María López', tel:'33 1234 5678', email:'ventas@refcentro.mx'},
      {nombre:'ServiMec Taller', contacto:'Jorge Ramos', tel:'55 9988 7766', email:'contacto@servimec.com'},
    ],
    solicitudes: [
      {id:'SOL-0001', unidad:'NIC-T2', area:'Operaciones', descripcion:'Ruido en frenos', estado:'Pendiente'},
      {id:'SOL-0002', unidad:'MEX-T5', area:'Logística', descripcion:'Luces tablero intermitentes', estado:'En revisión'},
    ],
    validaciones: [
      {id:'VAL-1001', unidad:'NIC-T2', concepto:'Verificación documental', estado:'Pendiente'},
      {id:'VAL-1002', unidad:'GDL-T3', concepto:'Checklist de salida', estado:'Observaciones'},
    ],
    aceptaciones: [
      {id:'ORD-3001', unidad:'GDL-T3', reparacion:'Cambio de pastillas', costo: 3850, estado:'Por aceptar'},
    ],
    mants: {
      'NIC-T2': [
        {fecha:'2025-02-15', tipo:'Preventivo', costo: 3200, estado:'Cerrado'},
        {fecha:'2025-06-12', tipo:'Correctivo', costo: 5400, estado:'Cerrado'},
      ],
      'MEX-T5': [
        {fecha:'2025-03-20', tipo:'Preventivo', costo: 2900, estado:'Cerrado'},
      ],
      'GDL-T3': [
        {fecha:'2025-04-18', tipo:'Correctivo', costo: 4200, estado:'Cerrado'},
      ],
    }
  };
  
  // --- Utilidades UI ---
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  
  function toast(msg){
    const host = $('#toast');
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    host.appendChild(el);
    setTimeout(()=>{ el.remove(); }, 3800);
  }
  
  function toCSV(rows){
    if (!rows.length) return '';
    const headers = Object.keys(rows[0]);
    const lines = [headers.join(',')];
    rows.forEach(r=>{
      const line = headers.map(h=>{
        const v = r[h] ?? '';
        return `"${String(v).replace(/"/g,'""')}"`;
      }).join(',');
      lines.push(line);
    });
    return lines.join('\n');
  }
  
  function downloadCSV(filename, rows){
    const blob = new Blob([toCSV(rows)], {type:'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }
  
  // --- Render inicial ---
  window.addEventListener('DOMContentLoaded', () => {
    // Header user
    const user = JSON.parse(localStorage.getItem('auth_user') || '{}');
    if ($('#userName')) $('#userName').textContent = user.name || 'Usuario';
  
    // Navegación lateral
    $$('.nav-item[data-target]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        $$('.nav-item').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.getAttribute('data-target');
        $$('.panel').forEach(p=>p.classList.remove('visible'));
        $('#'+target).classList.add('visible');
      });
    });
  
    // Logout
    const logoutBtn = $('#logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', ()=>{
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.href = 'login.html';
    });
  
    // KPIs
    $('#kpiVehiculos').textContent = state.vehiculos.length;
    $('#kpiConductores').textContent = state.conductores.length;
    $('#kpiProveedores').textContent = state.proveedores.length;
  
    // Tablas
    renderVehiculos(state.vehiculos);
    renderSolicitudes(state.solicitudes);
    renderValidaciones(state.validaciones);
    renderAceptaciones(state.aceptaciones);
    renderProveedores(state.proveedores);
  
    // Filtros
    $('#filterVehiculos').addEventListener('input', (e)=>{
      const q = e.target.value.toLowerCase();
      renderVehiculos(state.vehiculos.filter(v =>
        Object.values(v).some(val => String(val).toLowerCase().includes(q))
      ));
    });
  
    $('#filterSolicitudes').addEventListener('input', (e)=>{
      const q = e.target.value.toLowerCase();
      renderSolicitudes(state.solicitudes.filter(s =>
        Object.values(s).some(val => String(val).toLowerCase().includes(q))
      ));
    });
  
    $('#filterProveedores').addEventListener('input', (e)=>{
      const q = e.target.value.toLowerCase();
      renderProveedores(state.proveedores.filter(p =>
        Object.values(p).some(val => String(val).toLowerCase().includes(q))
      ));
    });
  
    // Modales
    $$('[data-open]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const id = btn.getAttribute('data-open');
        const dlg = document.getElementById(id);
        if (id==='modalVehiculo') {
          $('#vehUnidad').value = ''; $('#vehPlacas').value='';
          $('#vehMarca').value=''; $('#vehModelo').value='';
        }
        if (id==='modalProveedor') {
          $('#provNombre').value=''; $('#provContacto').value='';
          $('#provTel').value=''; $('#provEmail').value='';
        }
        if (id==='modalSolicitud') {
          hydrateUnidadSelect('#solUnidad');
          $('#solArea').value=''; $('#solDesc').value='';
        }
        dlg.showModal();
      });
    });
  
    $('#saveVehiculo').addEventListener('click', (e)=>{
      e.preventDefault();
      const v = {
        unidad: $('#vehUnidad').value.trim(),
        placas: $('#vehPlacas').value.trim(),
        marca: $('#vehMarca').value.trim(),
        modelo: $('#vehModelo').value.trim(),
        conductor: state.conductores[Math.floor(Math.random()*state.conductores.length)],
        km: 100000 + Math.floor(Math.random()*150000),
        disponibilidad: 'OK'
      };
      if (!v.unidad || !v.placas) return;
      state.vehiculos.push(v);
      $('#modalVehiculo').close();
      $('#kpiVehiculos').textContent = state.vehiculos.length;
      renderVehiculos(state.vehiculos);
      toast('Vehículo agregado');
    });
  
    $('#saveProveedor').addEventListener('click', (e)=>{
      e.preventDefault();
      const p = {
        nombre: $('#provNombre').value.trim(),
        contacto: $('#provContacto').value.trim(),
        tel: $('#provTel').value.trim(),
        email: $('#provEmail').value.trim(),
      };
      if (!p.nombre) return;
      state.proveedores.push(p);
      $('#modalProveedor').close();
      $('#kpiProveedores').textContent = state.proveedores.length;
      renderProveedores(state.proveedores);
      toast('Proveedor agregado');
    });
  
    $('#saveSolicitud').addEventListener('click', (e)=>{
      e.preventDefault();
      const id = 'SOL-' + String(1000 + Math.floor(Math.random()*9000));
      const s = {
        id,
        unidad: $('#solUnidad').value,
        area: $('#solArea').value || 'Operaciones',
        descripcion: $('#solDesc').value || 'Revisión general',
        estado:'Pendiente'
      };
      state.solicitudes.unshift(s);
      $('#modalSolicitud').close();
      renderSolicitudes(state.solicitudes);
      toast('Solicitud enviada');
    });
  
    // Expediente por vehículo
    hydrateUnidadSelect('#expUnidad');
    $('#expUnidad').addEventListener('change', updateExpediente);
    updateExpediente();
  
    // Reportes
    $('#btnReporteExpediente').addEventListener('click', ()=>{
      const rows = state.vehiculos.map(v=>({
        unidad:v.unidad, placas:v.placas, marca:v.marca, modelo:v.modelo, km:v.km, disponibilidad:v.disponibilidad
      }));
      downloadCSV('expediente_vehiculos_demo.csv', rows);
    });
  
    $('#btnReporteSolicitudes').addEventListener('click', ()=>{
      downloadCSV('historico_solicitudes_demo.csv', state.solicitudes);
    });
  
    // Export general CSV (vehículos + proveedores)
    $('#btnExportCSV').addEventListener('click', ()=>{
      const rows = [
        ...state.vehiculos.map(v=>({tipo:'vehiculo', ...v})),
        ...state.proveedores.map(p=>({tipo:'proveedor', ...p}))
      ];
      downloadCSV('fase1_export_demo.csv', rows);
    });
  
    // Buscador global (aplica a tabla visible)
    $('#globalSearch').addEventListener('input', (e)=>{
      const q = e.target.value.toLowerCase();
      const visibleId = document.querySelector('.panel.visible')?.id || '';
      if (visibleId==='mod-catalogos') {
        renderVehiculos(state.vehiculos.filter(v => Object.values(v).some(val => String(val).toLowerCase().includes(q))));
      } else if (visibleId==='mod-solicitudes') {
        renderSolicitudes(state.solicitudes.filter(s => Object.values(s).some(val => String(val).toLowerCase().includes(q))));
      } else if (visibleId==='mod-proveedores') {
        renderProveedores(state.proveedores.filter(p => Object.values(p).some(val => String(val).toLowerCase().includes(q))));
      }
    });
  });
  
  // --- Render functions ---
  function renderVehiculos(list){
    const el = $('#tablaVehiculos');
    el.innerHTML = `
      <thead><tr>
        <th>Unidad</th><th>Placas</th><th>Marca</th><th>Modelo</th><th>Conductor</th><th>Km</th><th>Estado</th>
      </tr></thead>
      <tbody>
        ${list.map(v=>`
          <tr>
            <td>${v.unidad}</td>
            <td>${v.placas}</td>
            <td>${v.marca}</td>
            <td>${v.modelo}</td>
            <td>${v.conductor}</td>
            <td>${v.km.toLocaleString('es-MX')}</td>
            <td><span class="badge ${v.disponibilidad==='OK'?'ok':'warn'}">${v.disponibilidad}</span></td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }
  
  function renderSolicitudes(list){
    const el = $('#tablaSolicitudes');
    el.innerHTML = `
      <thead><tr>
        <th>ID</th><th>Unidad</th><th>Área</th><th>Descripción</th><th>Estado</th>
      </tr></thead>
      <tbody>
        ${list.map(s=>`
          <tr>
            <td>${s.id}</td>
            <td>${s.unidad}</td>
            <td>${s.area}</td>
            <td>${s.descripcion}</td>
            <td><span class="badge ${s.estado==='Pendiente'?'warn':'ok'}">${s.estado}</span></td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }
  
  function renderValidaciones(list){
    const el = $('#tablaValidaciones');
    el.innerHTML = `
      <thead><tr><th>ID</th><th>Unidad</th><th>Concepto</th><th>Estado</th></tr></thead>
      <tbody>
        ${list.map(v=>`
          <tr>
            <td>${v.id}</td>
            <td>${v.unidad}</td>
            <td>${v.concepto}</td>
            <td><span class="badge ${v.estado==='Pendiente'?'warn':(v.estado==='Observaciones'?'err':'ok')}">${v.estado}</span></td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }
  
  function renderAceptaciones(list){
    const el = $('#tablaAceptaciones');
    el.innerHTML = `
      <thead><tr><th>Orden</th><th>Unidad</th><th>Reparación</th><th>Costo</th><th>Acción</th></tr></thead>
      <tbody>
        ${list.map(a=>`
          <tr>
            <td>${a.id}</td>
            <td>${a.unidad}</td>
            <td>${a.reparacion}</td>
            <td>$${a.costo.toLocaleString('es-MX')}</td>
            <td><button class="btn-secondary" onclick="aceptarOrden('${a.id}')">Aceptar</button></td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }
  
  function renderProveedores(list){
    const el = $('#tablaProveedores');
    el.innerHTML = `
      <thead><tr><th>Proveedor</th><th>Contacto</th><th>Teléfono</th><th>Email</th></tr></thead>
      <tbody>
        ${list.map(p=>`
          <tr>
            <td>${p.nombre}</td>
            <td>${p.contacto||'-'}</td>
            <td>${p.tel||'-'}</td>
            <td>${p.email||'-'}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }
  
  function aceptarOrden(id){
    const idx = state.aceptaciones.findIndex(a=>a.id===id);
    if (idx>-1){
      const ord = state.aceptaciones[idx];
      state.aceptaciones.splice(idx,1);
      renderAceptaciones(state.aceptaciones);
      toast(`Orden ${ord.id} aceptada`);
    }
  }
  
  function hydrateUnidadSelect(sel){
    const el = $(sel);
    el.innerHTML = state.vehiculos.map(v=>`<option>${v.unidad}</option>`).join('');
  }
  
  function updateExpediente(){
    const unidad = $('#expUnidad').value || state.vehiculos[0]?.unidad;
    if (!unidad) return;
    $('#expUnidad').value = unidad;
  
    const v = state.vehiculos.find(x=>x.unidad===unidad) || state.vehiculos[0];
  
    // Datos
    $('#expDatos').innerHTML = `
      <div class="grid-2">
        <div><strong>Unidad:</strong> ${v.unidad}</div>
        <div><strong>Placas:</strong> ${v.placas}</div>
        <div><strong>Marca:</strong> ${v.marca}</div>
        <div><strong>Modelo:</strong> ${v.modelo}</div>
        <div><strong>Conductor:</strong> ${v.conductor}</div>
        <div><strong>Kilometraje:</strong> ${v.km.toLocaleString('es-MX')} km</div>
      </div>
    `;
  
    // Métricas (ficticias)
    const disp = v.disponibilidad==='OK' ? '96%' : '89%';
    const mttr = v.disponibilidad==='OK' ? '12 h' : '18 h';
    const mtbf = v.disponibilidad==='OK' ? '85 días' : '63 días';
  
    $('#expMetricas').innerHTML = `
      <div class="kpis">
        <div class="kpi"><span>Disponibilidad</span><strong>${disp}</strong></div>
        <div class="kpi"><span>MTTR</span><strong>${mttr}</strong></div>
        <div class="kpi"><span>MTBF</span><strong>${mtbf}</strong></div>
      </div>
    `;
  
    // Historial
    const mants = state.mants[unidad] || [];
    $('#expMants').innerHTML = `
      <thead><tr><th>Fecha</th><th>Tipo</th><th>Costo</th><th>Estado</th></tr></thead>
      <tbody>
        ${mants.map(m=>`
          <tr>
            <td>${m.fecha}</td>
            <td>${m.tipo}</td>
            <td>$${m.costo.toLocaleString('es-MX')}</td>
            <td><span class="badge ok">${m.estado}</span></td>
          </tr>
        `).join('')}
      </tbody>
    `;
    // Galería (3 fotos por unidad)
  const slug = unidad.toLowerCase(); // p. ej. "NIC-T2" -> "nic-t2"
  const photos = [
    `img/${slug}-1.png`,
    `img/${slug}-2.png`,
    `img/${slug}-3.png`,
  ];
  const gal = $('#expGaleria');
  gal.innerHTML = photos.map(src =>
    `<img src="${src}" alt="Foto ${unidad}" onerror="this.style.display='none'">`
  ).join('');
  }
