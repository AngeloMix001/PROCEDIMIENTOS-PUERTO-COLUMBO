import { DocumentItem } from '../types';

export const proceduresData: DocumentItem[] = [
  {
    id: "proc-1",
    code: "PR-GC-001",
    title: "Procedimientos Gate Control",
    category: "Gate Control",
    date: "Actualizado • Versión 001",
    type: "procedure",
    fileType: "docx",
    description: "Normativa y directrices para el control de acceso, verificación documental de transportistas, inspección de sellos y registro de entrada/salida de unidades.",
    steps: [
      "Verificación de documentación del conductor y manifiesto de carga en portería.",
      "Inspección física de sellos de seguridad y estado de precintos del contenedor.",
      "Registro en el sistema informático de control de pesaje y autorización de ingreso.",
      "Asignación de bahía o posición de descarga en patio según planificación."
    ],
    pdfUrl: "https://res.cloudinary.com/djmo7ydpm/raw/upload/v1776862024/Gate_Control_version_001_ukl3jq.docx"
  },
  {
    id: "proc-2",
    code: "PR-CFS-001",
    title: "Procedimientos CFS",
    category: "CFS",
    date: "Actualizado • Versión 001",
    type: "procedure",
    fileType: "docx",
    description: "Protocolo operativo para consolidación, desconsolidación de contenedores (LCL/FCL) y verificación de mercancías en estación de transferencia.",
    steps: [
      "Recepción y cotejo del manifiesto de carga consolidada con la orden de trabajo.",
      "Coordinación de cuadrilla de estiba y asignación de maquinaria para desconsolidación.",
      "Inspección minuciosa de embalajes y emisión de acta de avería si corresponde.",
      "Ubicación temporal y tarjado de bultos en zona techada asignada."
    ],
    pdfUrl: "https://res.cloudinary.com/djmo7ydpm/raw/upload/v1776862024/CFS_version_001_d5oi8r.docx"
  },
  {
    id: "proc-3",
    code: "PR-ALP-001",
    title: "Procedimientos Almacén Patio",
    category: "Almacén Patio",
    date: "Actualizado • Vigente",
    type: "procedure",
    fileType: "gdoc",
    description: "Instrucciones de apilamiento, estiba segura, segregación de cargas especiales y gestión de tránsitos de grúas en patios de almacenamiento.",
    steps: [
      "Identificación satelital o por radiofrecuencia de la unidad en patio.",
      "Segregación estricta de contenedores vacíos, llenos y con carga sobredimensionada.",
      "Control de alturas máximas de stacking de acuerdo a normas de estabilidad portuaria.",
      "Actualización inmediata de coordenadas en el sistema de gestión de patio."
    ],
    pdfUrl: "https://docs.google.com/document/d/1FzTSVaf_IMAGKj-xwN33bgiEZML-GYN6/edit?usp=sharing&ouid=115558709160216474718&rtpof=true&sd=true"
  },
  {
    id: "proc-4",
    code: "PR-CDOC-002",
    title: "Procedimientos Control Documentos",
    category: "Control Documentos",
    date: "Actualizado • Versión 002",
    type: "procedure",
    fileType: "docx",
    description: "Gestión, resguardo, validación aduanera y trazabilidad de guías de despacho, conocimientos de embarque (B/L) y certificados de inspección.",
    steps: [
      "Recepción digital y física de despachos aduaneros y resoluciones de levante.",
      "Validación de firmas autorizadas y sellos de agencias de aduana acreditadas.",
      "Carga de metadatos al repositorio central institucional y archivo correlativo.",
      "Notificación automatizada a las áreas de facturación y despacho operacional."
    ],
    pdfUrl: "https://res.cloudinary.com/djmo7ydpm/raw/upload/v1776862024/Control_Documentos_version_002_kxsihk.docx"
  },
  {
    id: "proc-5",
    code: "PR-BOD-001",
    title: "Procedimientos Bodega",
    category: "Bodega",
    date: "Actualizado • Versión 001",
    type: "procedure",
    fileType: "docx",
    description: "Procedimiento estándar para la recepción, inventario selectivo, control de racks, almacenamiento de mercaderías e insumos operacionales.",
    steps: [
      "Iniciar verificación física contra orden de compra o guía de despacho recibida.",
      "Registro de número de lote, fecha de caducidad (si aplica) y condiciones físicas.",
      "Etiquetado con código de barras correlativo para trazabilidad interna.",
      "Almacenamiento en estanterías homologadas respetando capacidades de carga nominal."
    ],
    pdfUrl: "https://res.cloudinary.com/djmo7ydpm/raw/upload/v1776862025/Bodega_version_001_qbzlws.docx"
  },
  { 
    id: "proc-6", 
    code: "PR-CMPC-EXP",
    title: "Procedimientos CMPC", 
    category: "CMPC", 
    date: "Actualizado • Fichas Oficiales", 
    type: "procedure",
    isFolder: true,
    badge: "CARPETA MULTI-DOCUMENTAL CMPC",
    description: "Colección integral de 9 fichas técnicas y procedimientos específicos para la recepción, preparación, picking y despacho de productos forestales y celulosa CMPC.",
    subItems: [
      { id: "cmpc-1", code: "CMPC-01", title: "CMPC - Proceso Operacional", date: "Actualizado", pdfUrl: "https://docs.google.com/document/d/1hwMHfc-LtSWlQmyw95_vlw6RWBTA-U4S/edit?usp=sharing&ouid=115558709160216474718&rtpof=true&sd=true", fileType: "gdoc" },
      { id: "cmpc-2", code: "CMPC-02", title: "CMPC - Proceso Planificación de Consolidados", date: "Actualizado", pdfUrl: "https://docs.google.com/document/d/1hcH1x2WwGFGUTQApYfL-Cyu9K3lJHa7y/edit?usp=sharing&ouid=115558709160216474718&rtpof=true&sd=true", fileType: "gdoc" },
      { id: "cmpc-3", code: "CMPC-03", title: "CMPC - Proceso Recepción de Carga de Productos", date: "Actualizado", pdfUrl: "https://docs.google.com/document/d/1q3CK7_HAvrokRjn4tZu6FYDHq3a2mWgk/edit?usp=sharing&ouid=115558709160216474718&rtpof=true&sd=true", fileType: "gdoc" },
      { id: "cmpc-4", code: "CMPC-04", title: "CMPC - Proceso Almacenamiento de la Carga", date: "Actualizado", pdfUrl: "https://docs.google.com/document/d/1iexYGXFjj5fqGlIrAyIEkTtHi5puvovu/edit?usp=sharing&ouid=115558709160216474718&rtpof=true&sd=true", fileType: "gdoc" },
      { id: "cmpc-5", code: "CMPC-05", title: "CMPC - Proceso Picking de Carga", date: "Actualizado", pdfUrl: "https://docs.google.com/document/d/1Cj4a4iwTtt-7dzooBDPTZTfEvxWbmtK7/edit?usp=sharing&ouid=115558709160216474718&rtpof=true&sd=true", fileType: "gdoc" },
      { id: "cmpc-6", code: "CMPC-06", title: "CMPC - Proceso Consolidación de la Carga", date: "Actualizado", pdfUrl: "https://docs.google.com/document/d/1WNVASqmJ5YuuInoTje9l2xIoOReudewG/edit?usp=sharing&ouid=115558709160216474718&rtpof=true&sd=true", fileType: "gdoc" },
      { id: "cmpc-7", code: "CMPC-07", title: "CMPC - Proceso Despacho de Contenedor", date: "Actualizado", pdfUrl: "https://docs.google.com/document/d/1MR7Fwm2p6JdkZPCxsy8JyRSb0hqf3OOi/edit?usp=sharing&ouid=115558709160216474718&rtpof=true&sd=true", fileType: "gdoc" },
      { id: "cmpc-8", code: "CMPC-08", title: "CMPC - Proceso Liquidación de Embarque", date: "Actualizado", pdfUrl: "https://docs.google.com/document/d/1l_tcGAfw7lWUBAXVOA3aROUmXPKmmjXE/edit?usp=sharing&ouid=115558709160216474718&rtpof=true&sd=true", fileType: "gdoc" },
      { id: "cmpc-9", code: "CMPC-09", title: "CMPC - Procedimiento Operaciones", date: "Actualizado", pdfUrl: "https://docs.google.com/document/d/1EX4QZ2jsYFboBcof2bQNj24mGU4Ni-Gl/edit?usp=sharing&ouid=115558709160216474718&rtpof=true&sd=true", fileType: "gdoc" },
    ]
  },
  { 
    id: "proc-7", 
    code: "PR-COM-001",
    title: "Procedimiento Acuerdos Comerciales", 
    category: "Área Comercial", 
    date: "Actualizado • Vigente", 
    type: "procedure",
    fileType: "gdoc",
    description: "Metodología corporativa para formulación de convenios de servicio, determinación tarifaria, evaluación crediticia y formalización contractual con clientes.",
    steps: [
      "Recepción y análisis formal de requerimientos del cliente para el acuerdo comercial.",
      "Definición de tarifas, plazos, condiciones de pago y volumen proyectado de faenas.",
      "Confección del borrador del acuerdo y validación jurídica y operativa interna.",
      "Firma del acuerdo comercial, registro en el sistema corporativo y difusión a operaciones."
    ],
    pdfUrl: "https://docs.google.com/document/d/1xyS6JuMp4xgBxDzdZXTepsz8BEzcfugF/edit?usp=sharing" 
  },
  { 
    id: "proc-8", 
    code: "PR-CS-001",
    title: "Procedimiento Customer Service", 
    category: "Customer Service", 
    date: "Actualizado • Vigente", 
    type: "procedure",
    fileType: "gdoc",
    description: "Protocolos de atención al cliente portuario, seguimiento proactivo de faenas, gestión de reclamos, emisión de estados de situación y encuestas de servicio.",
    steps: [
      "Recepción de requerimientos y consultas operativas de clientes por canales oficiales.",
      "Verificación de factibilidad comercial y capacidad operativa en patio o bodega.",
      "Elaboración, validación técnica y envío de cotizaciones u órdenes de servicio.",
      "Confirmación formal del servicio y registro en sistema de control operativo."
    ],
    pdfUrl: "https://docs.google.com/document/d/1hlLfLAFa637Znrt8oycVwLO1o_2KDM3L/edit?usp=sharing" 
  },
  { 
    id: "proc-9", 
    code: "PR-EQM-001",
    title: "Seguimiento y Mantención de Equipos y Maquinarias", 
    category: "Equipos y Maquinarias", 
    date: "Actualizado • Vigente", 
    type: "procedure",
    fileType: "drive",
    description: "Pautas de inspección preoperacional, programas de mantenimiento preventivo y correctivo para grúas Reach Stacker, horquillas, tractocamiones y generadores.",
    steps: [
      "Verificar el estado de operatividad de los equipos antes de iniciar las operaciones diarias.",
      "Registrar de inmediato cualquier desperfecto, ruido inusual o anomalía técnica en bitácora.",
      "Programar mantenimientos preventivos periódicos según horas de uso y manual de fabricante.",
      "Realizar la mantención correctiva o coordinar asistencia técnica especializada externa.",
      "Completar y firmar la bitácora oficial de inspección e intervención de los equipos."
    ],
    pdfUrl: "https://drive.google.com/file/d/1HuAHU9PP_oQFbvqDt6mG8pTGQ8u8Y6H8/view?usp=sharing" 
  },
  { 
    id: "proc-10", 
    code: "PTS-SGI-009",
    title: "Procedimiento Operador Maquinaria", 
    category: "Equipos y Maquinarias", 
    date: "23-09-2026 • Versión 000", 
    type: "procedure",
    fileType: "pdf",
    description: "Estandarizar las actividades para movilizar todo tipo de material considerado como carga o contenedor que por su peso y tamaño no puede ser manipulado manualmente. El propósito es recepcionar, organizar y despachar contenedores, pallets, carga suelta o mercancías, garantizando faenas expeditas y seguras dentro de las bodegas o en patio.",
    steps: [
      "5.2.1 Inicio de Turno: Al iniciar el turno, verificar obligatoriamente el estado de la máquina asignada, realizar Check List con todas las observaciones y mantener comunicación constante con Control Room, Coordinador Bodega, Supervisor CFS, Gate Control y Almacén Patio para planificar las faenas.",
      "5.2.2 Ejecución de Movimientos: Proceder a movilizar las diversas cargas y mercancías (contenedor, pallets, carga suelta, etc.) según el requerimiento específico de la operación y atender requerimientos de manera eficiente.",
      "5.2.3 Cierre de Turno: Estacionar la maquinaria en los lugares designados, reportando cualquier anomalía detectada durante el turno para asegurar la continuidad del siguiente operador.",
      "6. Aspectos Adicionales: Estar atento y concentrado a indicaciones de carga, descarga, recepción y despacho, realizando todas las labores de manera segura para la carga y el entorno de trabajo."
    ],
    pdfUrl: "#doc-pts-sgi-009"
  },
];

export const checklistsData: DocumentItem[] = [
  { 
    id: "chk-1", 
    code: "CK-BOD-001",
    title: "Check List Bodega", 
    category: "Bodega", 
    date: "Versión 001", 
    type: "checklist",
    fileType: "drive",
    description: "Pauta de verificación diaria para orden, seguridad, señalética y control de inventarios físicos dentro de la bodega principal de almacenamiento.",
    steps: [
      "Verificar estado de iluminación, pasillos despejados y señalización de evacuación.",
      "Comprobar correcta rotulación y apilado de bultos según capacidades de rack.",
      "Revisión de extintores vigentes, mangueras y elementos de respuesta ante derrames.",
      "Confirmar registro al día en el sistema de entradas y salidas de materiales."
    ],
    pdfUrl: "https://drive.google.com/file/d/1-o7RkBU63e2kIn9vSeSpJZqkW93GvUZV/view?usp=sharing" 
  },
  { 
    id: "chk-2", 
    code: "CK-CFS-001",
    title: "Check List CFS", 
    category: "CFS", 
    date: "Versión 001", 
    type: "checklist",
    fileType: "drive",
    description: "Lista de chequeo operativa previa y posterior al proceso de consolidación o desconsolidación en el área CFS.",
    steps: [
      "Revisar programación diaria de contenedores asignados al sector CFS.",
      "Inspeccionar cuadrilla con EPP reglamentario completo antes del inicio de maniobras.",
      "Verificar integridad estructural interna del contenedor (limpieza, olores, humedad).",
      "Validar precintado de seguridad y entrega de copias de tarja firmadas."
    ],
    pdfUrl: "https://drive.google.com/file/d/1gsCL7DzoLyiJZqwHpr8duIoXbn29lM9L/view?usp=sharing" 
  },
  { 
    id: "chk-3", 
    code: "CK-GC-001",
    title: "Check List Gate Control", 
    category: "Gate Control", 
    date: "Versión 001", 
    type: "checklist",
    fileType: "drive",
    description: "Control metódico en caseta de ingreso y báscula: estado del conductor, unidad tractora, chasis, documentación y sellos aduaneros.",
    steps: [
      "Verificar vigencia de licencia de conductor, seguro obligatorio y revisión técnica.",
      "Revisar correspondencia de número de contenedor contra documentación de puerto.",
      "Chequear número de sello oficial sin signos de manipulación o rotura previa.",
      "Confirmar pesaje por eje y peso bruto total dentro de la tolerancia vial permitida."
    ],
    pdfUrl: "https://drive.google.com/file/d/1nCHLAlTD_yMgUqlWfWZOKLnGHYGeuuT_/view?usp=sharing" 
  },
  { 
    id: "chk-4", 
    code: "CK-CDOC-002",
    title: "Check List Control Documentos", 
    category: "Control Documentos", 
    date: "Versión 002", 
    type: "checklist",
    fileType: "drive",
    description: "Lista de cotejo documental para liberación de cargas de importación y exportación ante aduana y agencias marítimas.",
    steps: [
      "Revisar planificación naviera, fecha estimada de arribo (ETA) y corte de stack (cut-off).",
      "Identificar naves operando y verificar correspondencia de manifiesto marítimo.",
      "Confirmar timbrajes aduaneros y autorización de retiro emitida por la agencia naviera.",
      "Validar firma de recepción conforme del transportista en la guía de despacho final."
    ],
    pdfUrl: "https://drive.google.com/file/d/1-xrVViIgY2P66KgbjMSN32g645jepwHB/view?usp=sharing" 
  },
  { 
    id: "chk-5", 
    code: "CK-ALP-001",
    title: "Check List Almacén Patio", 
    category: "Almacén Patio", 
    date: "Versión 001", 
    type: "checklist",
    fileType: "drive",
    description: "Inspección de orden en bloques de acopio, vías de rodado de maquinaria pesada, segregación IMO y conexiones de contenedores refrigerados.",
    steps: [
      "Verificar estado de contenedor y posición física exacta en bloque de patio.",
      "Comprobar conexión eléctrica, set point de temperatura y alarma en unidades reefer.",
      "Confirmar que vías de circulación de Reach Stackers estén despejadas y señalizadas.",
      "Inspeccionar demarcaciones y segregación de sustancias peligrosas (norma IMO)."
    ],
    pdfUrl: "https://drive.google.com/file/d/1PY0lVHuJwrxyKZY1COBBFh5EjpWC1GZy/view?usp=sharing" 
  },
  { 
    id: "chk-6", 
    code: "CK-CMPC-001",
    title: "Check List Bodega - CMPC", 
    category: "Bodega - CMPC", 
    date: "Versión 001", 
    type: "checklist",
    fileType: "drive",
    description: "Pauta de verificación específica para los estándares de calidad, limpieza, protección contra humedad e integridad de rollos y fardos de celulosa CMPC.",
    steps: [
      "Verificar limpieza exhaustiva, ausencia de clavos o humedad en el piso del contenedor.",
      "Revisar papel kraft perimetral o revestimiento protector colocado antes de la carga.",
      "Monitorear maniobra de horquilla con clamp para evitar marcas o desgarros en rollos.",
      "Confirmar colocación de bolsas de secante (desecantes) y trinca reglamentaria."
    ],
    pdfUrl: "https://drive.google.com/file/d/1u1jqAsxIMBhnPhhZLoeiBxzoABwiNFeF/view?usp=sharing" 
  },
  { 
    id: "chk-7", 
    code: "CK-CS-001",
    title: "Check List Customer Service", 
    category: "Customer Service", 
    date: "Versión 001", 
    type: "checklist",
    fileType: "drive",
    description: "Guía de seguimiento de calidad en la atención al cliente, plazos de respuesta a cotizaciones y confirmaciones de operaciones en curso.",
    steps: [
      "Monitorear bandeja de entrada corporativa y confirmar recepción de solicitudes en <30 min.",
      "Verificar cumplimiento de plazos comprometidos en cotizaciones y acuerdos tarifarios.",
      "Enviar reportes diarios de estado operacional de contenedores a clientes suscritos.",
      "Cerrar tickets de consultas registrando la conformidad del cliente en plataforma."
    ],
    pdfUrl: "https://drive.google.com/file/d/1cPx-MXcLaV1XbuFXkIvry3JNwM20xUjN/view?usp=sharing" 
  },
];
