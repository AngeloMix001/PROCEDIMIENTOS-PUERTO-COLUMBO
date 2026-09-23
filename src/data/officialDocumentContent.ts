export interface OfficialDocumentData {
  title: string;
  code: string;
  version: string;
  year: string;
  pages: number;
  emite: { name: string; date: string };
  revisa: { name: string; date: string };
  aprueba: { name: string; date: string };
  objeto: string;
  campoAplicacion: string;
  normasReferencias: string;
  definiciones: string;
  responsabilidades: {
    role: string;
    items: string[];
  }[];
  etapas: {
    code: string;
    title: string;
    items: string[];
  }[];
  aspectosAdicionales: string[];
  anexos: string;
  controlCambios: {
    version: string;
    description: string;
    date: string;
  }[];
}

export const PTS_SGI_009_DATA: OfficialDocumentData = {
  title: "Procedimiento Operador Maquinaria",
  code: "PTS- SGI-009",
  version: "000",
  year: "2026",
  pages: 5,
  emite: { name: "M. Silva", date: "23-09-2026" },
  revisa: { name: "L. Muñoz", date: "23-09-2026" },
  aprueba: { name: "L. Muñoz", date: "23-09-2026" },
  objeto:
    "Estandarizar las actividades para movilizar todo tipo de material considerado como “carga” o “contenedor” que por su peso y tamaño no puede ser manipulado manualmente. El propósito es recepcionar, organizar y despachar contenedores, pallets, carga suelta o mercancías, garantizando faenas expeditas y seguras dentro de las bodegas o en patio.",
  campoAplicacion:
    "Aplica a los Operadores de Maquinaria de Puerto Columbo S.A., incluyendo personal de empresas contratistas, subcontratistas, proveedores de productos y servicios.",
  normasReferencias: "El presente procedimiento no considera normas y/o referencias",
  definiciones: "El presente procedimiento no considera definiciones y/o abreviaturas",
  responsabilidades: [
    {
      role: "Operador de Maquinaria",
      items: [
        "Ejecutar de manera segura los movimientos.",
        "Cuidar la maquina a cargo en su turno.",
      ],
    },
    {
      role: "Control Room / Coordinador de Bodega / Supervisor CFS / Gate Control / Almacén Patio",
      items: [
        "Entregar las directrices para organizar los movimientos de la carga.",
      ],
    },
  ],
  etapas: [
    {
      code: "5.2.1",
      title: "INICIO DE TURNO",
      items: [
        "Al iniciar el turno, el operador debe verificar el estado en el que se encuentra la máquina asignada.",
        "Debe realizar Check List de manera obligatoria con todas las observaciones.",
        "Mantener comunicación constante con Control Room/Coordinador Bodega/Supervisor CFS/Gate Control/Almacén Patio para organizar y mantener una planificación clara de las faenas diarias a realizar.",
      ],
    },
    {
      code: "5.2.2",
      title: "EJECUCIÓN DE MOVIMIENTOS",
      items: [
        "Proceder a movilizar las diversas cargas y mercancías (contenedor, pallets, carga suelta, etc.) según el requerimiento específico de la operación.",
        "Atender los requerimientos operativos de manera eficiente.",
      ],
    },
    {
      code: "5.2.3",
      title: "CIERRE DE TURNO",
      items: [
        "Estacionar la maquinaria en los lugares designados, reportando cualquier anomalía detectada durante el turno para asegurar la continuidad del siguiente operador.",
      ],
    },
  ],
  aspectosAdicionales: [
    "Estar atento y concentrado a las indicaciones entregadas por las distintas áreas respecto a carga, descarga, recepción, despacho tanto de carga suelta como de contenedores.",
    "Realizar de manera segura todas las labores tanto para la carga, como para el entorno en el cual están trabajando.",
  ],
  anexos: "El presente procedimiento no considera anexos.",
  controlCambios: [
    {
      version: "000",
      description: "Creación del documento",
      date: "23-09-2026",
    },
  ],
};

export function downloadOfficialDocument(data: OfficialDocumentData = PTS_SGI_009_DATA) {
  const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${data.code} - ${data.title} - Puerto Columbo</title>
  <style>
    @page { size: A4 portrait; margin: 20mm; }
    body {
      font-family: Arial, sans-serif;
      color: #111827;
      background: #ffffff;
      margin: 0;
      padding: 24px;
      line-height: 1.6;
    }
    .page {
      max-width: 800px;
      margin: 0 auto 40px auto;
      padding: 40px;
      background: white;
      border: 1px solid #d1d5db;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      page-break-after: always;
    }
    .header-logo { text-align: center; margin-bottom: 30px; }
    .header-logo h2 { margin: 0; color: #003B6F; font-size: 26px; font-weight: bold; letter-spacing: 1px; }
    .header-logo p { margin: 0; color: #4B5563; font-size: 13px; font-weight: bold; }
    .title-box {
      background-color: #E5E7EB;
      border: 1px solid #9CA3AF;
      padding: 12px;
      text-align: center;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 35px;
    }
    .meta-table {
      width: 100%;
      margin-bottom: 40px;
      font-size: 15px;
    }
    .meta-table td { padding: 6px 0; }
    .signatures-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 60px;
      border: 1px solid #000;
    }
    .signatures-table th, .signatures-table td {
      border: 1px solid #000;
      padding: 12px;
      text-align: left;
      font-size: 14px;
    }
    .signatures-table th { background: #f3f4f6; }
    .index-title {
      font-weight: bold;
      font-size: 16px;
      letter-spacing: 2px;
      margin-bottom: 24px;
      border-bottom: 1px solid #000;
      display: inline-block;
      padding-bottom: 4px;
    }
    .index-list { list-style: none; padding-left: 0; font-size: 14px; line-height: 2.2; }
    .stamp-box {
      border: 3px solid #DC2626;
      color: #DC2626;
      text-align: center;
      padding: 16px;
      max-width: 360px;
      margin: 80px auto 0 auto;
      font-weight: bold;
    }
    .section-title {
      font-size: 15px;
      font-weight: bold;
      margin-top: 24px;
      margin-bottom: 12px;
    }
    .subsection-title {
      font-size: 14px;
      font-weight: bold;
      margin-top: 16px;
      margin-bottom: 8px;
    }
    p, li { font-size: 13.5px; color: #1F2937; text-align: justify; }
    ul { margin: 6px 0 16px 20px; padding: 0; }
    li { margin-bottom: 6px; }
    .change-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
      border: 1px solid #000;
    }
    .change-table th, .change-table td {
      border: 1px solid #000;
      padding: 8px 12px;
      font-size: 13px;
      text-align: left;
    }
    .change-table th { background: #f3f4f6; }
    @media print {
      body { padding: 0; background: white; }
      .page { border: none; box-shadow: none; margin: 0; padding: 0; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <!-- PÁGINA 1: PORTADA -->
  <div class="page">
    <div class="header-logo">
      <h2>PUERTO COLUMBO</h2>
      <p>D&C EXTRAPORTUARIO</p>
    </div>
    
    <div class="title-box">
      ${data.title}
    </div>

    <table class="meta-table">
      <tr>
        <td style="width: 150px; font-weight: bold;">Código:</td>
        <td><strong>${data.code}</strong></td>
      </tr>
      <tr>
        <td style="font-weight: bold;">Número Versión:</td>
        <td>${data.version}</td>
      </tr>
      <tr>
        <td style="font-weight: bold;">Año:</td>
        <td>${data.year}</td>
      </tr>
      <tr>
        <td style="font-weight: bold;">Páginas:</td>
        <td>${data.pages}</td>
      </tr>
    </table>

    <table class="signatures-table">
      <tr>
        <th style="width: 33%;">EMITE</th>
        <th style="width: 33%;">REVISA</th>
        <th style="width: 33%;">APRUEBA</th>
      </tr>
      <tr>
        <td>
          <p><strong>Nombre:</strong> ${data.emite.name}</p>
          <p><strong>Fecha:</strong> ${data.emite.date}</p>
          <p><strong>Firma:</strong> <em>Registrada SGI</em></p>
        </td>
        <td>
          <p><strong>Nombre:</strong> ${data.revisa.name}</p>
          <p><strong>Fecha:</strong> ${data.revisa.date}</p>
          <p><strong>Firma:</strong> <em>Registrada SGI</em></p>
        </td>
        <td>
          <p><strong>Nombre:</strong> ${data.aprueba.name}</p>
          <p><strong>Fecha:</strong> ${data.aprueba.date}</p>
          <p><strong>Firma:</strong> <em>Registrada SGI</em></p>
        </td>
      </tr>
    </table>
  </div>

  <!-- PÁGINA 2: ÍNDICE -->
  <div class="page">
    <div class="index-title">I N D I C E</div>
    <ul class="index-list">
      <li><strong>1.</strong> OBJETO</li>
      <li><strong>2.</strong> CAMPO DE APLICACIÓN</li>
      <li><strong>3.</strong> NORMAS Y REFERENCIAS</li>
      <li><strong>4.</strong> DEFINICIONES Y/O ABREVIATURAS</li>
      <li><strong>5.</strong> METODO</li>
      <li><strong>6.</strong> ASPECTOS ADICIONALES</li>
      <li><strong>7.</strong> ANEXOS</li>
      <li><strong>8.</strong> CONTROL DE CAMBIOS</li>
    </ul>

    <div class="stamp-box">
      <div style="font-size: 15px; margin-bottom: 4px;">COPIA CONTROLADA</div>
      <div style="font-size: 12px; font-style: italic;">“Documento impreso es copia No controlada”</div>
    </div>
  </div>

  <!-- PÁGINA 3: OBJETO, CAMPO, NORMAS, DEFINICIONES, RESPONSABILIDADES -->
  <div class="page">
    <div class="section-title">1. OBJETO</div>
    <p>${data.objeto}</p>

    <div class="section-title">2. CAMPO DE APLICACIÓN</div>
    <p>${data.campoAplicacion}</p>

    <div class="section-title">3. NORMAS Y REFERENCIAS</div>
    <p>${data.normasReferencias}</p>

    <div class="section-title">4. DEFINICIONES Y/O ABREVIATURAS</div>
    <p>${data.definiciones}</p>

    <div class="section-title">5. MÉTODO</div>
    <div class="subsection-title">5.1 RESPONSABILIDADES</div>
    ${data.responsabilidades
      .map(
        (r) => `
      <p style="font-weight: bold; margin-bottom: 4px;">${r.role}:</p>
      <ul>
        ${r.items.map((i) => `<li>${i}</li>`).join('')}
      </ul>
    `
      )
      .join('')}
  </div>

  <!-- PÁGINA 4: ETAPAS DEL PROCESO & ASPECTOS ADICIONALES -->
  <div class="page">
    <div class="subsection-title">5.2 DESCRIPCIÓN DE LAS ETAPAS DEL PROCESO</div>
    ${data.etapas
      .map(
        (e) => `
      <div class="subsection-title" style="margin-left: 10px;">${e.code} ${e.title}</div>
      <ul style="margin-left: 28px;">
        ${e.items.map((i) => `<li>${i}</li>`).join('')}
      </ul>
    `
      )
      .join('')}

    <div class="section-title">6. ASPECTOS ADICIONALES</div>
    <ul>
      ${data.aspectosAdicionales.map((a) => `<li>${a}</li>`).join('')}
    </ul>
  </div>

  <!-- PÁGINA 5: ANEXOS & CONTROL DE CAMBIOS -->
  <div class="page">
    <div class="section-title">7. ANEXOS</div>
    <p>${data.anexos}</p>

    <div class="section-title">8. CONTROL DE CAMBIOS</div>
    <table class="change-table">
      <tr>
        <th style="width: 25%;">Versión</th>
        <th style="width: 50%;">Descripción</th>
        <th style="width: 25%;">Fecha</th>
      </tr>
      ${data.controlCambios
        .map(
          (c) => `
        <tr>
          <td><strong>${c.version}</strong></td>
          <td>${c.description}</td>
          <td>${c.date}</td>
        </tr>
      `
        )
        .join('')}
    </table>
  </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.code.replace(/\s+/g, '_')}_${data.title.replace(/\s+/g, '_')}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
