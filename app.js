// --- Guard de autenticación simple (compatible con login que guarda 'auth_token') ---
(function(){
    const token = localStorage.getItem('auth_token'); // <- clave correcta
    if (!token) {
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
      {unidad:'QRO-V1', placas:'QRO-4521', marca:'Volvo', modelo:'FH 2020', conductor:'María López', km:99800, disponibilidad:'OK'},
      {unidad:'MTY-C2', placas:'MTY-8891', marca:'Scania', modelo:'R450 2018', conductor:'Jorge Ramos', km:234120, disponibilidad:'OK'},
    ],
    conductores: ['Luis Pérez','Ana Ruiz','Carlos Vega','María López','Jorge Ramos','Diana Romero'],
    proveedores: [
      {nombre:'Refacciones del Centro', contacto:'María López', tel:'33 1234 5678', email:'ventas@refcentro.mx'},
      {nombre:'ServiMec Taller', contacto:'Jorge Ramos', tel:'55 9988 7766', email:'contacto@servimec.com'},
      {nombre:'Aceites y Filtros MX', contacto:'Diana Romero', tel:'81 2233 4455', email:'ventas@ayf.mx'},
    ],
    solicitudes: [
      {id:'SOL-0001', unidad:'NIC-T2', area:'Operaciones', descripcion:'Ruido en frenos', estado:'Pendiente'},
      {id:'SOL-0002', unidad:'MEX-T5', area:'Logística', descripcion:'Luces tablero intermitentes', estado:'En revisión'},
      {id:'SOL-0003', unidad:'QRO-V1', area:'Operaciones', descripcion:'Vibración en alta', estado:'Pendiente'},
    ],
    validaciones: [
      {id:'VAL-1001', unidad:'NIC-T2', concepto:'Verificación documental', estado:'Pendiente'},
      {id:'VAL-1002', unidad:'GDL-T3', concepto:'Checklist de salida', estado:'Observaciones'},
      {id:'VAL-1003', unidad:'MTY-C2', concepto:'Checklist anual', estado:'Pendiente'},
    ],
    aceptaciones: [
      {id:'ORD-3001', unidad:'GDL-T3', reparacion:'Cambio de pastillas', horas: 3, estado:'Por aceptar'},
      {id:'ORD-3002', unidad:'QRO-V1', reparacion:'Ajuste alineación', horas: 2, estado:'Por aceptar'},
    ],
  
    mants: {
      'NIC-T2': [
        {fecha:'2025-02-15', tipo:'Preventivo', horas: 2, estado:'Cerrado'},
        {fecha:'2025-06-12', tipo:'Correctivo', horas: 4, estado:'Cerrado'},
      ],
      'MEX-T5': [
        {fecha:'2025-03-20', tipo:'Preventivo', horas: 2, estado:'Cerrado'},
        {fecha:'2025-07-08', tipo:'Correctivo', horas: 3, estado:'Cerrado'},
      ],
      'GDL-T3': [
        {fecha:'2025-04-18', tipo:'Correctivo', horas: 4, estado:'Cerrado'},
      ],
      'QRO-V1': [
        {fecha:'2025-01-22', tipo:'Preventivo', horas: 2, estado:'Cerrado'},
        {fecha:'2025-05-10', tipo:'Preventivo', horas: 2, estado:'Cerrado'},
      ],
      'MTY-C2': [
        {fecha:'2025-02-01', tipo:'Preventivo', horas: 2, estado:'Cerrado'},
        {fecha:'2025-06-15', tipo:'Correctivo', horas: 5, estado:'Cerrado'},
      ],
    },
  
    // FASE 2
    kmLecturas: [
      { unidad:'NIC-T2', fecha:'2025-06-01', km:184300 },
      { unidad:'NIC-T2', fecha:'2025-07-01', km:185000 },
      { unidad:'NIC-T2', fecha:'2025-08-01', km:185200 },
  
      { unidad:'MEX-T5', fecha:'2025-06-15', km:151600 },
      { unidad:'MEX-T5', fecha:'2025-07-15', km:151950 },
      { unidad:'MEX-T5', fecha:'2025-08-01', km:152300 },
  
      { unidad:'GDL-T3', fecha:'2025-05-20', km:209900 },
      { unidad:'GDL-T3', fecha:'2025-07-20', km:210200 },
      { unidad:'GDL-T3', fecha:'2025-08-05', km:210540 },
  
      { unidad:'QRO-V1', fecha:'2025-06-10', km:98500 },
      { unidad:'QRO-V1', fecha:'2025-07-10', km:99200 },
      { unidad:'QRO-V1', fecha:'2025-08-10', km:99800 },
  
      { unidad:'MTY-C2', fecha:'2025-06-05', km:232900 },
      { unidad:'MTY-C2', fecha:'2025-07-05', km:233500 },
      { unidad:'MTY-C2', fecha:'2025-08-05', km:234120 },
    ],
  
    fuel: [
      { unidad:'NIC-T2', fecha:'2025-08-10', litros:120, proveedor:'Gasolinera Demo SA' },
      { unidad:'MEX-T5', fecha:'2025-08-11', litros:95, proveedor:'Estación Norte' },
      { unidad:'GDL-T3', fecha:'2025-08-09', litros:110, proveedor:'Energía Jalisco' },
      { unidad:'QRO-V1', fecha:'2025-08-08', litros:80, proveedor:'Red Querétaro' },
      { unidad:'MTY-C2', fecha:'2025-08-07', litros:140, proveedor:'Monterrey Fuel' },
    ],
  
    preventivos: {
      'NIC-T2': { km: 10000, meses: 6, ultimoKm: 176000, ultimaFecha: '2025-02-15' },
      'MEX-T5': { km: 10000, meses: 6, ultimoKm: 142000, ultimaFecha: '2025-03-20' },
      'GDL-T3': { km: 10000, meses: 6, ultimoKm: 201000, ultimaFecha: '2025-04-18' },
      'QRO-V1': { km: 10000, meses: 6, ultimoKm: 90000,  ultimaFecha: '2025-01-22' },
      'MTY-C2': { km: 10000, meses: 6, ultimoKm: 224000, ultimaFecha: '2025-02-01' },
    },
  
    correctivos: [
      { id:'COR-001', unidad:'NIC-T2', falla:'Freno delantero', estado:'Pendiente' },
      { id:'COR-002', unidad:'GDL-T3', falla:'Sensor ABS', estado:'En progreso' },
      { id:'COR-003', unidad:'MTY-C2', falla:'Fuga en línea de combustible', estado:'Pendiente' },
    ],
  
    evidencias: [
      { unidad:'NIC-T2', tipo:'Foto', ruta:'img/nic-t2-1.png' },
      { unidad:'MEX-T5', tipo:'Checklist', ruta:'docs/checklist-mex-t5.pdf' },
      { unidad:'QRO-V1', tipo:'Factura', ruta:'docs/factura-qro-v1.pdf' },
      { unidad:'MTY-C2', tipo:'Foto', ruta:'img/mty-c2-1.png' },
    ],
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
    // Header user (si existe auth_user, úsalo)
    let user = { name: 'Administrador' };
    try {
      const saved = localStorage.getItem('auth_user');
      if (saved) user = JSON.parse(saved);
    } catch {}
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
  
    // Logout (borra claves correctas y legado)
    const logoutBtn = $('#logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', ()=>{
      localStorage.removeItem('auth_token'); // <- clave correcta
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth'); // compatibilidad con versiones anteriores
      window.location.href = 'login.html';
    });
  
    // KPIs
    $('#kpiVehiculos').textContent = state.vehiculos.length;
    $('#kpiConductores').textContent = state.conductores.length;
    $('#kpiProveedores').textContent = state.proveedores.length;
  
    // Tablas Fase 1
    renderVehiculos(state.vehiculos);
    renderSolicitudes(state.solicitudes);
    renderValidaciones(state.validaciones);
    renderAceptaciones(state.aceptaciones);
    renderProveedores(state.proveedores);
  
    // Hidratar selects (todas las vistas que lo requieren)
    ['#solUnidad','#expUnidad','#kmUnidad','#fuelUnidad','#prevUnidad','#corrUnidad','#evUnidad'].forEach(sel=>{
      hydrateUnidadSelect(sel);
    });
  
    // Expediente por vehículo
    $('#expUnidad').addEventListener('change', updateExpediente);
    updateExpediente();
  
    // Reportes
    $('#btnReporteExpediente')?.addEventListener('click', ()=>{
      const rows = state.vehiculos.map(v=>({
        unidad:v.unidad, placas:v.placas, marca:v.marca, modelo:v.modelo, km:v.km, disponibilidad:v.disponibilidad
      }));
      downloadCSV('expediente_vehiculos_demo.csv', rows);
    });
    $('#btnReporteSolicitudes')?.addEventListener('click', ()=>{
      downloadCSV('historico_solicitudes_demo.csv', state.solicitudes);
    });
  
    // Export general CSV (vehículos + proveedores)
    $('#btnExportCSV')?.addEventListener('click', ()=>{
      const rows = [
        ...state.vehiculos.map(v=>({tipo:'vehiculo', ...v})),
        ...state.proveedores.map(p=>({tipo:'proveedor', ...p}))
      ];
      downloadCSV('fase1_export_demo.csv', rows);
    });
  
    // Render Fase 2
    renderKm(state.kmLecturas);
    renderFuel(state.fuel);
    renderPrev();            // calcula próximos servicios
    renderCorrectivos(state.correctivos);
    renderIndicadores();     // KPIs flota + tabla por unidad
    renderEvidencias(state.evidencias);
  
    // Filtros Fase 1
    $('#filterVehiculos')?.addEventListener('input', (e)=>{
      const q = e.target.value.toLowerCase();
      renderVehiculos(state.vehiculos.filter(v =>
        Object.values(v).some(val => String(val).toLowerCase().includes(q))
      ));
    });
    $('#filterSolicitudes')?.addEventListener('input', (e)=>{
      const q = e.target.value.toLowerCase();
      renderSolicitudes(state.solicitudes.filter(s =>
        Object.values(s).some(val => String(val).toLowerCase().includes(q))
      ));
    });
    $('#filterProveedores')?.addEventListener('input', (e)=>{
      const q = e.target.value.toLowerCase();
      renderProveedores(state.proveedores.filter(p =>
        Object.values(p).some(val => String(val).toLowerCase().includes(q))
      ));
    });
  
    // Filtros Fase 2
    $('#filterKm')?.addEventListener('input', (e)=>{
      const q = e.target.value.toLowerCase();
      renderKm(state.kmLecturas.filter(r => Object.values(r).some(v=>String(v).toLowerCase().includes(q))));
    });
    $('#filterFuel')?.addEventListener('input', (e)=>{
      const q = e.target.value.toLowerCase();
      renderFuel(state.fuel.filter(r => Object.values(r).some(v=>String(v).toLowerCase().includes(q))));
    });
  
    // Buscador global (aplica a tabla visible)
    $('#globalSearch')?.addEventListener('input', (e)=>{
      const q = e.target.value.toLowerCase();
      const visibleId = document.querySelector('.panel.visible')?.id || '';
      if (visibleId==='mod-catalogos') {
        renderVehiculos(state.vehiculos.filter(v => Object.values(v).some(val => String(val).toLowerCase().includes(q))));
      } else if (visibleId==='mod-solicitudes') {
        renderSolicitudes(state.solicitudes.filter(s => Object.values(s).some(val => String(val).toLowerCase().includes(q))));
      } else if (visibleId==='mod-proveedores') {
        renderProveedores(state.proveedores.filter(p => Object.values(p).some(val => String(val).toLowerCase().includes(q))));
      } else if (visibleId==='mod-kilometraje') {
        renderKm(state.kmLecturas.filter(r => Object.values(r).some(v=>String(v).toLowerCase().includes(q))));
      } else if (visibleId==='mod-combustible') {
        renderFuel(state.fuel.filter(r => Object.values(r).some(v=>String(v).toLowerCase().includes(q))));
      } else if (visibleId==='mod-preventivos') {
        renderPrev();
      } else if (visibleId==='mod-correctivos') {
        renderCorrectivos(state.correctivos.filter(r => Object.values(r).some(v=>String(v).toLowerCase().includes(q))));
      } else if (visibleId==='mod-disponibilidad') {
        renderIndicadores();
      } else if (visibleId==='mod-evidencias') {
        renderEvidencias(state.evidencias.filter(r => Object.values(r).some(v=>String(v).toLowerCase().includes(q))));
      }
    });
  
    // Lightbox UX extra
    const lb = document.getElementById('lightbox');
    if (lb) {
      lb.addEventListener('click', (e)=>{
        if (e.target.id === 'lightbox') closeLightbox();
      });
    }
    window.addEventListener('keydown', (e)=>{
      if (e.key === 'Escape') closeLightbox();
    });
  });
  
  // --- Eventos de guardado Fase 1 y 2 ---
  // Guardar vehículo
  $('#saveVehiculo')?.addEventListener('click', (e)=>{
    e.preventDefault();
    const v = {
      unidad: $('#vehUnidad').value.trim(),
      placas: $('#vehPlacas').value.trim(),
      marca: $('#vehMarca').value.trim(),
      modelo: $('#vehModelo').value.trim(),
      conductor: state.conductores[Math.floor(Math.random()*state.conductores.length)],
      km: 80000 + Math.floor(Math.random()*180000),
      disponibilidad: 'OK'
    };
    if (!v.unidad || !v.placas) return;
    state.vehiculos.push(v);
    ['#solUnidad','#expUnidad','#kmUnidad','#fuelUnidad','#prevUnidad','#corrUnidad','#evUnidad'].forEach(sel=>hydrateUnidadSelect(sel));
    $('#modalVehiculo').close();
    $('#kpiVehiculos').textContent = state.vehiculos.length;
    renderVehiculos(state.vehiculos);
    toast('Vehículo agregado');
  });
  
  // Guardar proveedor
  $('#saveProveedor')?.addEventListener('click', (e)=>{
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
  
  // Guardar solicitud
  $('#saveSolicitud')?.addEventListener('click', (e)=>{
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
  
  // Guardar lectura KM
  $('#saveKm')?.addEventListener('click', (e)=>{
    e.preventDefault();
    const unidad = $('#kmUnidad').value;
    const km = Number($('#kmValor').value||0);
    const fecha = $('#kmFecha').value || new Date().toISOString().slice(0,10);
    if(!unidad || !km){ return; }
    state.kmLecturas.unshift({ unidad, km, fecha });
    $('#modalKm').close();
    renderKm(state.kmLecturas);
    toast('Lectura de KM registrada');
  });
  
  // Guardar carga combustible
  $('#saveFuel')?.addEventListener('click', (e)=>{
    e.preventDefault();
    const unidad = $('#fuelUnidad').value;
    const litros = Number($('#fuelLitros').value||0);
    const proveedor = $('#fuelProveedor').value || '—';
    const fecha = $('#fuelFecha').value || new Date().toISOString().slice(0,10);
    if(!unidad || !litros){ return; }
    state.fuel.unshift({ unidad, litros, proveedor, fecha });
    $('#modalFuel').close();
    renderFuel(state.fuel);
    toast('Carga de combustible registrada');
  });
  
  // Guardar reglas preventivo
  $('#saveReglas')?.addEventListener('click', (e)=>{
    e.preventDefault();
    const unidad = $('#prevUnidad').value;
    const km = Number($('#prevKm').value||10000);
    const meses = Number($('#prevMeses').value||6);
    if(!unidad){ return; }
    const current = state.preventivos[unidad] || { ultimoKm: 0, ultimaFecha: '2025-01-01' };
    state.preventivos[unidad] = { ...current, km, meses };
    $('#modalReglas').close();
    renderPrev();
    toast('Reglas de preventivo actualizadas');
  });
  
  // Guardar correctivo
  $('#saveCorr')?.addEventListener('click', (e)=>{
    e.preventDefault();
    const unidad = $('#corrUnidad').value;
    const falla = $('#corrFalla').value || 'Sin detalle';
    const estado = $('#corrEstado').value || 'Pendiente';
    const id = 'COR-' + String(100 + Math.floor(Math.random()*900));
    state.correctivos.unshift({ id, unidad, falla, estado });
    $('#modalCorrectivo').close();
    renderCorrectivos(state.correctivos);
    toast('Correctivo creado');
  });
  
  // Guardar evidencia
  $('#saveEvidencia')?.addEventListener('click', (e)=>{
    e.preventDefault();
    const unidad = $('#evUnidad').value;
    const tipo = $('#evTipo').value;
    const ruta = $('#evRuta').value || '';
    if(!unidad || !ruta){ return; }
    state.evidencias.unshift({ unidad, tipo, ruta });
    $('#modalEvidencia').close();
    renderEvidencias(state.evidencias);
    toast('Evidencia adjuntada');
  });
  
  // --- Render functions ---
  function renderVehiculos(list){
    const el = $('#tablaVehiculos');
    if (!el) return;
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
    const el = $('#tablaSolicitudes'); if (!el) return;
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
    const el = $('#tablaValidaciones'); if (!el) return;
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
    const el = $('#tablaAceptaciones'); if (!el) return;
    el.innerHTML = `
      <thead><tr><th>Orden</th><th>Unidad</th><th>Reparación</th><th>Horas estimadas</th><th>Acción</th></tr></thead>
      <tbody>
        ${list.map(a=>`
          <tr>
            <td>${a.id}</td>
            <td>${a.unidad}</td>
            <td>${a.reparacion}</td>
            <td>${a.horas ?? 3}</td>
            <td><button class="btn-secondary" onclick="aceptarOrden('${a.id}')">Aceptar</button></td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }
  
  function renderProveedores(list){
    const el = $('#tablaProveedores'); if (!el) return;
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
  
  function renderKm(list){
    const el = $('#tablaKm'); if (!el) return;
    el.innerHTML = `
      <thead><tr><th>Unidad</th><th>Fecha</th><th>KM</th></tr></thead>
      <tbody>
        ${list.map(r=>`
          <tr>
            <td>${r.unidad}</td>
            <td>${r.fecha}</td>
            <td>${(r.km||0).toLocaleString('es-MX')}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }
  
  function renderFuel(list){
    const el = $('#tablaFuel'); if (!el) return;
    const rendCalc = (u) => {
      const lecturas = state.kmLecturas.filter(x=>x.unidad===u).sort((a,b)=>a.fecha.localeCompare(b.fecha));
      if (lecturas.length < 2) return '—';
      const deltaKm = (lecturas.at(-1).km - lecturas.at(-2).km);
      const litros = list.find(x=>x.unidad===u)?.litros || 0;
      return litros ? (deltaKm/litros).toFixed(1)+' km/l' : '—';
    };
    el.innerHTML = `
      <thead><tr><th>Unidad</th><th>Fecha</th><th>Litros</th><th>Proveedor</th><th>Rendimiento aprox.</th></tr></thead>
      <tbody>
        ${list.map(r=>`
          <tr>
            <td>${r.unidad}</td>
            <td>${r.fecha}</td>
            <td>${r.litros}</td>
            <td>${r.proveedor||'—'}</td>
            <td>${rendCalc(r.unidad)}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }
  
  function renderPrev(){
    const el = $('#tablaPrev'); if (!el) return;
    const rows = state.vehiculos.map(v=>{
      const regla = state.preventivos[v.unidad] || { km:10000, meses:6, ultimoKm:v.km-8000, ultimaFecha:'2025-01-01' };
      const proxKm = (regla.ultimoKm||0) + (regla.km||10000);
      const restante = Math.max(0, proxKm - v.km);
      const proxFecha = addMonths(regla.ultimaFecha || '2025-01-01', regla.meses || 6);
      const alerta = restante < 2000 ? 'warn' : 'ok';
      return { unidad:v.unidad, reglaKm:regla.km, reglaMeses:regla.meses, proxKm, restante, proxFecha, alerta };
    });
    el.innerHTML = `
      <thead><tr><th>Unidad</th><th>Regla km</th><th>Regla meses</th><th>Próximo a</th><th>Restante</th><th>Fecha sugerida</th></tr></thead>
      <tbody>
        ${rows.map(r=>`
          <tr>
            <td>${r.unidad}</td>
            <td>${r.reglaKm}</td>
            <td>${r.reglaMeses}</td>
            <td>${r.proxKm.toLocaleString('es-MX')} km</td>
            <td><span class="badge ${r.alerta}">${r.restante.toLocaleString('es-MX')} km</span></td>
            <td>${r.proxFecha}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }
  
  function renderCorrectivos(list){
    const el = $('#tablaCorrectivos'); if (!el) return;
    el.innerHTML = `
      <thead><tr><th>ID</th><th>Unidad</th><th>Falla</th><th>Estado</th></tr></thead>
      <tbody>
        ${list.map(c=>`
          <tr>
            <td>${c.id}</td>
            <td>${c.unidad}</td>
            <td>${c.falla}</td>
            <td><span class="badge ${c.estado==='Pendiente'?'warn':(c.estado==='En progreso'?'warn':'ok')}">${c.estado}</span></td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }
  
  function renderIndicadores(){
    const total = state.vehiculos.length || 1;
    const disponibles = state.vehiculos.filter(v=>v.disponibilidad==='OK').length;
    const disp = Math.round((disponibles/total)*100);
    $('#dispFlota')?.replaceChildren(document.createTextNode(disp+'%'));
    const mttr = 12;
    const mtbf = 78;
    $('#mttrFlota')?.replaceChildren(document.createTextNode(mttr+' h'));
    $('#mtbfFlota')?.replaceChildren(document.createTextNode(mtbf+' días'));
  
    const el = $('#tablaIndicadores'); if (!el) return;
    const rows = state.vehiculos.map(v=>{
      const disp = v.disponibilidad==='OK' ? '96%' : '89%';
      const mttr = v.disponibilidad==='OK' ? '12 h' : '18 h';
      const mtbf = v.disponibilidad==='OK' ? '85 días' : '63 días';
      return { unidad:v.unidad, disp, mttr, mtbf };
    });
    el.innerHTML = `
      <thead><tr><th>Unidad</th><th>Disponibilidad</th><th>MTTR</th><th>MTBF</th></tr></thead>
      <tbody>
        ${rows.map(r=>`
          <tr>
            <td>${r.unidad}</td>
            <td>${r.disp}</td>
            <td>${r.mttr}</td>
            <td>${r.mtbf}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }
  
  function renderEvidencias(list){
    const el = $('#tablaEvidencias'); if (!el) return;
    el.innerHTML = `
      <thead><tr><th>Unidad</th><th>Tipo</th><th>Archivo</th></tr></thead>
      <tbody>
        ${list.map(ev=>`
          <tr>
            <td>${ev.unidad}</td>
            <td>${ev.tipo}</td>
            <td>${ev.ruta ? `<a href="${ev.ruta}" target="_blank" rel="noopener">Ver</a>` : '—'}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }
  
  // Utils
  function addMonths(ymd, months){
    const d = new Date(ymd+'T00:00:00');
    d.setMonth(d.getMonth() + (months||0));
    const m = String(d.getMonth()+1).padStart(2,'0');
    const day = String(d.getDate()).padStart(2,'0');
    return `${d.getFullYear()}-${m}-${day}`;
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
    if (!el) return;
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
      <thead><tr><th>Fecha</th><th>Tipo</th><th>Horas</th><th>Estado</th></tr></thead>
      <tbody>
        ${mants.map(m=>`
          <tr>
            <td>${m.fecha}</td>
            <td>${m.tipo}</td>
            <td>${(m.horas ?? 2)}</td>
            <td><span class="badge ok">${m.estado}</span></td>
          </tr>
        `).join('')}
      </tbody>
    `;
  
    // Galería (3 fotos por unidad)
    const slug = unidad.toLowerCase();
    const photos = [
      `img/${slug}-1.png`,
      `img/${slug}-2.png`,
      `img/${slug}-3.png`,
    ];
    const gal = $('#expGaleria');
    if (gal) {
      gal.innerHTML = photos.map(src =>
        `<img src="${src}" alt="Foto ${unidad}" onclick="openLightbox('${src}')" onerror="this.style.display='none'">`
      ).join('');
    }
  
    // Índice de mantenimiento (0-100) ficticio por categoría
    const indicePorUnidad = {
      'NIC-T2': { 'Mecánica': 82, 'Eléctrica': 67, 'Carrocería': 45 },
      'MEX-T5': { 'Mecánica': 74, 'Eléctrica': 59, 'Carrocería': 38 },
      'GDL-T3': { 'Mecánica': 69, 'Eléctrica': 72, 'Carrocería': 41 },
      'QRO-V1': { 'Mecánica': 77, 'Eléctrica': 64, 'Carrocería': 36 },
      'MTY-C2': { 'Mecánica': 71, 'Eléctrica': 62, 'Carrocería': 43 },
    };
    const indiceDefault = { 'Mecánica': 70, 'Eléctrica': 60, 'Carrocería': 40 };
    const dataIndice = indicePorUnidad[unidad] || indiceDefault;
  
    const canvas = document.getElementById('costChart');
    if (canvas) drawCostChart(canvas, dataIndice);
  }
  
  // Lightbox
  function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    lb.style.display = 'flex';
  }
  function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
  }
  
  // Canvas chart (índice sin dinero)
  function drawCostChart(canvas, data) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
  
    const colors = ['#1a73e8', '#17b26a', '#f59e0b'];
    const labels = Object.keys(data);
    const values = Object.values(data);
  
    const padding = { top: 16, right: 18, bottom: 40, left: 38 };
    const chartW = W - padding.left - padding.right;
    const chartH = H - padding.top - padding.bottom;
    const maxVal = Math.max(100, Math.max(...values));
  
    ctx.fillStyle = 'rgba(0,0,0,0.03)';
    ctx.fillRect(padding.left, padding.top, chartW, chartH);
    ctx.strokeStyle = 'rgba(0,0,0,0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, padding.top + chartH);
    ctx.lineTo(padding.left + chartW, padding.top + chartH);
    ctx.stroke();
  
    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    for (let i = 1; i <= 4; i++) {
      const y = padding.top + chartH - (chartH * i / 4);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartW, y);
      ctx.stroke();
    }
  
    const gap = 20;
    const barW = (chartW - gap * (values.length + 1)) / values.length;
    values.forEach((val, i) => {
      const x = padding.left + gap + i * (barW + gap);
      const h = (val / maxVal) * chartH;
      const y = padding.top + chartH - h;
  
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(x, y, barW, h);
  
      ctx.fillStyle = '#334155';
      ctx.font = '12px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${val}`, x + barW / 2, y - 6);
    });
  
    labels.forEach((lb, i) => {
      const x = padding.left + gap + i * (barW + gap) + barW / 2;
      const y = padding.top + chartH + 18;
      ctx.fillStyle = '#64748b';
      ctx.font = '12px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(lb, x, y);
    });
  
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'right';
    ctx.font = '11px Inter, system-ui, sans-serif';
    [0, 25, 50, 75, 100].forEach(v => {
      const y = padding.top + chartH - chartH * (v / maxVal);
      ctx.fillText(`${v}`, padding.left - 6, y + 4);
    });
  }
  
