const DEFAULT_LANGUAGE = "en";
const LANGUAGE_KEY = "megaFurnitStaticLanguage";

const translations = {
  en: {
    skipLink: "Skip to content",
    menu: "Menu",
    brandSubtitle: "B2B furniture supply chain coordination",
    navServices: "Services",
    navCapabilities: "Capabilities",
    navProcess: "Process",
    navWhy: "Why Us",
    navFaq: "FAQ",
    navContact: "Contact",
    sendInquiry: "Send Inquiry",
    viewCapabilities: "View Capabilities",
    heroEyebrow: "B2B furniture supply chain partner",
    heroTitle: "Professional furniture manufacturing and supply chain support for global buyers.",
    heroText: "Mega Furnit connects China and Vietnam production capacity with a trusted network of 20+ partner factories, supporting FOB full-container orders, product development, quality inspection, export documents, and container loading coordination.",
    heroCardTop: "Full-container order support",
    heroCardBottom: "Partner factory network",
    metricFactories: "Partner Factories",
    metricNetworkTitle: "China & Vietnam",
    metricNetwork: "Production Network",
    metricFob: "Full-container Orders",
    metricRegionsShort: "NA / EU / LATAM / SEA / ME",
    metricRegions: "Regional Buyer Support",
    servicesEyebrow: "Services",
    servicesTitle: "Supply chain work built around importers, wholesalers, and distributors.",
    servicesText: "Mega Furnit focuses on B2B coordination rather than retail checkout. We help buyers move from sourcing requirements to production and shipment with clearer execution.",
    serviceOneTitle: "Product Development",
    serviceOneText: "Support for new furniture concepts, reference samples, material options, construction details, and supplier-ready specifications.",
    serviceTwoTitle: "Factory & Supply Chain Matching",
    serviceTwoText: "Match product categories, quality level, target price, and order scale with suitable China, Vietnam, and partner factory capacity.",
    serviceThreeTitle: "Quality Inspection Coordination",
    serviceThreeText: "Coordinate inspection checkpoints, packaging review, production updates, and pre-loading quality communication.",
    serviceFourTitle: "Export Documents & Container Loading",
    serviceFourText: "Assist with export document coordination, container loading plans, and shipment handoff for FOB full-container orders.",
    serviceFiveTitle: "Overseas Stock / Distribution Support",
    serviceFiveText: "When needed, discuss regional stock programs, distributor needs, and practical support for North America, Europe, Latin America, Southeast Asia, and Middle East.",
    productsEyebrow: "Product programs",
    productsTitle: "Furniture programs for global buyers",
    productsText: "A visual sample of furniture categories and styles that can be developed, sourced, and coordinated through Mega Furnit's manufacturing network.",
    capabilitiesEyebrow: "Capabilities",
    capabilitiesTitle: "Integrated production resources and supply chain coordination.",
    capabilitiesText: "Mega Furnit combines self-owned production resources with a broad partner factory network, helping global buyers source furniture programs with fewer handoff gaps.",
    discussRequirements: "Discuss Requirements",
    capOneTitle: "Owned and partner production resources",
    capOneText: "Coordinate China and Vietnam production capacity with a network of 20+ partner factories for different categories and order profiles.",
    capTwoTitle: "Material and category sourcing",
    capTwoText: "Support upholstered furniture, panel furniture, solid wood programs, packaging options, and related material sourcing.",
    capThreeTitle: "Sample development and quotation support",
    capThreeText: "Help turn buyer requirements into sample direction, factory quotation requests, and comparable sourcing options.",
    capFourTitle: "QC, packaging, and FOB shipment coordination",
    capFourText: "Coordinate quality inspection communication, carton and label requirements, export documents, and container loading support.",
    processEyebrow: "Process",
    processTitle: "A practical path from sourcing brief to container loading.",
    processText: "The workflow is designed for B2B buyers who need reliable coordination, not a shopping cart.",
    stepOneTitle: "Requirement discussion",
    stepOneText: "Share your target market, product category, order size, quality level, and timeline.",
    stepTwoTitle: "Product matching or development",
    stepTwoText: "Review existing factory options or develop products from reference designs and specifications.",
    stepThreeTitle: "Quotation and sample confirmation",
    stepThreeText: "Compare suitable options, confirm materials, packaging, lead time, and sample direction.",
    stepFourTitle: "Production coordination",
    stepFourText: "Coordinate order details, factory communication, progress updates, and buyer requirements.",
    stepFiveTitle: "Quality inspection and packaging",
    stepFiveText: "Support QC coordination, packing review, carton marks, labels, and compliance-related details where applicable.",
    stepSixTitle: "Export documents and container loading",
    stepSixText: "Coordinate FOB shipment documents, loading plan, container utilization, and final handoff.",
    stepSevenTitle: "Delivery support",
    stepSevenText: "Support practical follow-up for importers, wholesalers, distributors, and regional buyers after shipment.",
    whyEyebrow: "Why Mega Furnit",
    whyTitle: "A coordination partner for buyers who need factory options and export execution.",
    whyText: "We understand that B2B furniture sourcing depends on price, quality, production fit, packaging, delivery timing, and communication. Mega Furnit is built around those operational needs.",
    whySummary: [
      "4 self-owned factories, 300+ employees, monthly capacity of 500 × 40HQ containers",
      "Product categories cover indoor/outdoor furniture, upholstered furniture, panel furniture, and solid wood furniture",
      "Support FOB payment terms and DDP delivery"
    ],
    whyOneTitle: "China + Vietnam sourcing network",
    whyOneText: "Access more production options and practical sourcing flexibility across two major furniture supply regions.",
    whyTwoTitle: "20+ factory cooperation",
    whyTwoText: "Match different furniture categories, quality levels, and container programs with a focused supply base.",
    whyThreeTitle: "Importer and wholesaler focus",
    whyThreeText: "Support batch orders, product programs, FOB containers, and regional buyer requirements.",
    whyFourTitle: "One-stop coordination",
    whyFourText: "Move from product development to quotation, samples, production, QC, documents, and loading with fewer disconnected steps.",
    faqEyebrow: "FAQ",
    faqTitle: "Common B2B sourcing questions.",
    faqOneQ: "Do you support FOB full-container orders?",
    faqOneA: "Yes. Mega Furnit focuses on B2B FOB full-container order coordination, including production communication, packing requirements, export documents, and container loading support.",
    faqTwoQ: "Can you help develop custom furniture products?",
    faqTwoA: "Yes. We can work from reference images, specifications, sample requirements, material direction, and target market needs to coordinate product development with suitable factories.",
    faqThreeQ: "Do you work with importers and wholesalers?",
    faqThreeA: "Yes. Our service is built for importers, wholesalers, retailers, distributors, sourcing companies, and regional furniture buyers.",
    faqFourQ: "Can you coordinate QC and export documents?",
    faqFourA: "Yes. We help coordinate QC communication, packaging review, carton and label details, export document preparation, and loading arrangements.",
    faqFiveQ: "Which markets do you support?",
    faqFiveA: "We support buyers serving North America, Europe, Latin America, Southeast Asia, Middle East, and other international markets where China and Vietnam furniture sourcing is suitable.",
    inquiryEyebrow: "Inquiry",
    inquiryTitle: "Looking for a reliable furniture supply chain partner?",
    inquiryText: "Tell us your target market, product category, order size, and sourcing needs. Mega Furnit will help match suitable furniture products and supply solutions.",
    contactMega: "Contact Mega Furnit",
    contactEyebrow: "Contact",
    contactTitle: "Send your sourcing requirements.",
    contactText: "Please include product category, target market, estimated order size, and any reference details. We will review your request and respond with practical next steps.",
    emailLabel: "Email",
    marketsLine: "Markets: North America, Europe, Latin America, Southeast Asia, Middle East",
    formName: "Name",
    formCompany: "Company",
    formEmail: "Email",
    formPhone: "WhatsApp / Phone",
    formCountry: "Country / Region",
    formCategory: "Product category or sourcing need",
    formCategoryPlaceholder: "Sofas, dining, bedroom, panel furniture...",
    formOrderSize: "Estimated order size",
    formOrderPlaceholder: "Example: 1 x 40HQ, monthly containers, trial order",
    formMessage: "Message",
    footerDescription: "B2B furniture manufacturing and supply chain coordination"
  },
  de: {
    skipLink: "Zum Inhalt springen",
    menu: "Menü",
    brandSubtitle: "B2B-Möbel-Lieferkettenkoordination",
    navServices: "Leistungen",
    navCapabilities: "Kompetenzen",
    navProcess: "Prozess",
    navWhy: "Warum wir",
    navFaq: "FAQ",
    navContact: "Kontakt",
    sendInquiry: "Anfrage senden",
    viewCapabilities: "Kompetenzen ansehen",
    heroEyebrow: "B2B-Partner für Möbellieferketten",
    heroTitle: "Professionelle Möbelproduktion und Supply-Chain-Unterstützung für globale Käufer.",
    heroText: "Mega Furnit verbindet Produktionskapazitäten in China und Vietnam mit einem verlässlichen Netzwerk von 20+ Partnerfabriken und unterstützt FOB-Containeraufträge, Produktentwicklung, Qualitätsprüfung, Exportdokumente und Containerverladung.",
    heroCardTop: "Unterstützung für Vollcontainer",
    heroCardBottom: "Partnerfabrik-Netzwerk",
    metricFactories: "Partnerfabriken",
    metricNetworkTitle: "China & Vietnam",
    metricNetwork: "Produktionsnetzwerk",
    metricFob: "FOB-Vollcontainer",
    metricRegionsShort: "NA / EU / LATAM / SEA / ME",
    metricRegions: "Regionale Käuferbetreuung",
    servicesEyebrow: "Leistungen",
    servicesTitle: "Supply-Chain-Arbeit für Importeure, Großhändler und Distributoren.",
    servicesText: "Mega Furnit konzentriert sich auf B2B-Koordination statt Einzelhandel. Wir begleiten Käufer von der Beschaffungsanforderung bis zur Produktion und Verschiffung.",
    serviceOneTitle: "Produktentwicklung",
    serviceOneText: "Unterstützung für neue Möbelkonzepte, Referenzmuster, Materialoptionen, Konstruktionsdetails und fabrikgerechte Spezifikationen.",
    serviceTwoTitle: "Fabrik- und Lieferketten-Matching",
    serviceTwoText: "Abgleich von Kategorie, Qualitätsniveau, Zielpreis und Bestellumfang mit geeigneter Kapazität in China, Vietnam und Partnerfabriken.",
    serviceThreeTitle: "Koordination der Qualitätsprüfung",
    serviceThreeText: "Koordination von Prüfzeitpunkten, Verpackungsprüfung, Produktionsupdates und Qualitätskommunikation vor der Verladung.",
    serviceFourTitle: "Exportdokumente & Containerverladung",
    serviceFourText: "Unterstützung bei Exportdokumenten, Ladeplanung und Übergabe für FOB-Vollcontaineraufträge.",
    serviceFiveTitle: "Überseelager / Distributionssupport",
    serviceFiveText: "Bei Bedarf besprechen wir regionale Lagerprogramme, Distributionsanforderungen und Support für Nordamerika, Europa, Lateinamerika, Südostasien und den Nahen Osten.",
    productsEyebrow: "Produktprogramme",
    productsTitle: "Möbelprogramme für globale Käufer",
    productsText: "Visuelle Beispiele für Möbelkategorien und Stile, die über das Mega Furnit Produktionsnetzwerk entwickelt, beschafft und koordiniert werden können.",
    capabilitiesEyebrow: "Kompetenzen",
    capabilitiesTitle: "Integrierte Produktionsressourcen und Lieferkettenkoordination.",
    capabilitiesText: "Mega Furnit verbindet eigene Produktionsressourcen mit einem breiten Partnerfabriknetzwerk, damit Käufer Möbelprogramme mit weniger Übergabelücken beschaffen können.",
    discussRequirements: "Anforderungen besprechen",
    capOneTitle: "Eigene und Partner-Produktionsressourcen",
    capOneText: "Koordination von Kapazitäten in China und Vietnam mit 20+ Partnerfabriken für verschiedene Kategorien und Auftragsprofile.",
    capTwoTitle: "Material- und Kategoriesourcing",
    capTwoText: "Unterstützung für Polstermöbel, Plattenmöbel, Massivholzprogramme, Verpackungsoptionen und Materialbeschaffung.",
    capThreeTitle: "Musterentwicklung und Angebotsunterstützung",
    capThreeText: "Wir übersetzen Käuferanforderungen in Musterrichtungen, Angebotsanfragen und vergleichbare Beschaffungsoptionen.",
    capFourTitle: "QC, Verpackung und FOB-Versand",
    capFourText: "Koordination von Qualitätskommunikation, Karton- und Labelanforderungen, Exportdokumenten und Containerverladung.",
    processEyebrow: "Prozess",
    processTitle: "Ein praktischer Weg vom Sourcing-Briefing bis zur Containerverladung.",
    processText: "Der Workflow ist für B2B-Käufer gemacht, die verlässliche Koordination benötigen, keinen Warenkorb.",
    stepOneTitle: "Anforderungsbesprechung",
    stepOneText: "Teilen Sie Zielmarkt, Produktkategorie, Bestellumfang, Qualitätsniveau und Zeitplan.",
    stepTwoTitle: "Produkt-Matching oder Entwicklung",
    stepTwoText: "Prüfung vorhandener Fabrikoptionen oder Entwicklung nach Referenzen und Spezifikationen.",
    stepThreeTitle: "Angebot und Musterbestätigung",
    stepThreeText: "Geeignete Optionen vergleichen, Materialien, Verpackung, Lieferzeit und Musterrichtung bestätigen.",
    stepFourTitle: "Produktionskoordination",
    stepFourText: "Koordination von Auftragsdetails, Fabrikkommunikation, Fortschrittsupdates und Käuferanforderungen.",
    stepFiveTitle: "Qualitätsprüfung und Verpackung",
    stepFiveText: "Unterstützung bei QC, Verpackungsprüfung, Kartonmarkierungen, Labels und relevanten Compliance-Details.",
    stepSixTitle: "Exportdokumente und Verladung",
    stepSixText: "Koordination von FOB-Dokumenten, Ladeplan, Containerauslastung und finaler Übergabe.",
    stepSevenTitle: "Lieferunterstützung",
    stepSevenText: "Praktische Nachbetreuung für Importeure, Großhändler, Distributoren und regionale Käufer.",
    whyEyebrow: "Warum Mega Furnit",
    whyTitle: "Ein Koordinationspartner für Käufer, die Fabrikoptionen und Exportabwicklung brauchen.",
    whyText: "B2B-Möbelsourcing hängt von Preis, Qualität, Produktionsfit, Verpackung, Timing und Kommunikation ab. Mega Furnit ist um diese operativen Anforderungen gebaut.",
    whySummary: [
      "4 eigene Fabriken, über 300 Mitarbeiter, monatliche Kapazität von 500 × 40HQ-Containern",
      "Produktkategorien umfassen Innen- und Außenmöbel, Polstermöbel, Plattenmöbel und Massivholzmöbel",
      "Unterstützung für FOB-Zahlungsbedingungen und DDP-Lieferung"
    ],
    whyOneTitle: "China + Vietnam Sourcing-Netzwerk",
    whyOneText: "Mehr Produktionsoptionen und praktische Flexibilität in zwei wichtigen Möbelregionen.",
    whyTwoTitle: "20+ Fabrikkooperationen",
    whyTwoText: "Abgleich unterschiedlicher Kategorien, Qualitätsniveaus und Containerprogramme mit einer fokussierten Lieferbasis.",
    whyThreeTitle: "Fokus auf Importeure und Großhändler",
    whyThreeText: "Unterstützung für Serienbestellungen, Produktprogramme, FOB-Container und regionale Käuferanforderungen.",
    whyFourTitle: "Koordination aus einer Hand",
    whyFourText: "Von Produktentwicklung bis Angebot, Muster, Produktion, QC, Dokumente und Verladung mit weniger Schnittstellen.",
    faqEyebrow: "FAQ",
    faqTitle: "Häufige B2B-Sourcing-Fragen.",
    faqOneQ: "Unterstützen Sie FOB-Vollcontaineraufträge?",
    faqOneA: "Ja. Mega Furnit konzentriert sich auf B2B-FOB-Vollcontainerkoordination inklusive Produktionskommunikation, Verpackung, Exportdokumenten und Verladung.",
    faqTwoQ: "Können Sie kundenspezifische Möbel entwickeln?",
    faqTwoA: "Ja. Wir arbeiten mit Referenzbildern, Spezifikationen, Musteranforderungen, Materialrichtung und Zielmarktbedarf.",
    faqThreeQ: "Arbeiten Sie mit Importeuren und Großhändlern?",
    faqThreeA: "Ja. Unser Service ist für Importeure, Großhändler, Einzelhändler, Distributoren, Sourcing-Unternehmen und regionale Möbelkäufer gemacht.",
    faqFourQ: "Können Sie QC und Exportdokumente koordinieren?",
    faqFourA: "Ja. Wir koordinieren Qualitätskommunikation, Verpackungsprüfung, Karton- und Labeldetails, Exportdokumente und Verladung.",
    faqFiveQ: "Welche Märkte unterstützen Sie?",
    faqFiveA: "Wir unterstützen Käufer in Nordamerika, Europa, Lateinamerika, Südostasien, dem Nahen Osten und weiteren internationalen Märkten.",
    inquiryEyebrow: "Anfrage",
    inquiryTitle: "Suchen Sie einen zuverlässigen Möbel-Lieferkettenpartner?",
    inquiryText: "Nennen Sie Zielmarkt, Produktkategorie, Bestellumfang und Sourcing-Bedarf. Mega Furnit hilft bei passenden Produkten und Lieferlösungen.",
    contactMega: "Mega Furnit kontaktieren",
    contactEyebrow: "Kontakt",
    contactTitle: "Senden Sie Ihre Sourcing-Anforderungen.",
    contactText: "Bitte nennen Sie Produktkategorie, Zielmarkt, geschätzten Bestellumfang und Referenzdetails. Wir prüfen Ihre Anfrage und antworten mit nächsten Schritten.",
    emailLabel: "E-Mail",
    marketsLine: "Märkte: Nordamerika, Europa, Lateinamerika, Südostasien, Naher Osten",
    formName: "Name",
    formCompany: "Unternehmen",
    formEmail: "E-Mail",
    formPhone: "WhatsApp / Telefon",
    formCountry: "Land / Region",
    formCategory: "Produktkategorie oder Sourcing-Bedarf",
    formCategoryPlaceholder: "Sofas, Esszimmer, Schlafzimmer, Plattenmöbel...",
    formOrderSize: "Geschätzter Bestellumfang",
    formOrderPlaceholder: "Beispiel: 1 x 40HQ, monatliche Container, Testauftrag",
    formMessage: "Nachricht",
    footerDescription: "B2B-Möbelproduktion und Lieferkettenkoordination"
  },
  es: {
    skipLink: "Saltar al contenido",
    menu: "Menú",
    brandSubtitle: "Coordinación B2B de cadena de suministro de muebles",
    navServices: "Servicios",
    navCapabilities: "Capacidades",
    navProcess: "Proceso",
    navWhy: "Por qué nosotros",
    navFaq: "FAQ",
    navContact: "Contacto",
    sendInquiry: "Enviar consulta",
    viewCapabilities: "Ver capacidades",
    heroEyebrow: "Socio B2B para suministro de muebles",
    heroTitle: "Fabricación de muebles y soporte de cadena de suministro para compradores globales.",
    heroText: "Mega Furnit conecta capacidad productiva en China y Vietnam con una red confiable de 20+ fábricas asociadas, apoyando pedidos FOB de contenedor completo, desarrollo de producto, inspección de calidad, documentos de exportación y coordinación de carga.",
    heroCardTop: "Soporte para contenedor completo",
    heroCardBottom: "Red de fábricas asociadas",
    metricFactories: "Fábricas asociadas",
    metricNetworkTitle: "China y Vietnam",
    metricNetwork: "Red de producción",
    metricFob: "Pedidos de contenedor completo",
    metricRegionsShort: "NA / EU / LATAM / SEA / ME",
    metricRegions: "Soporte regional a compradores",
    servicesEyebrow: "Servicios",
    servicesTitle: "Trabajo de cadena de suministro para importadores, mayoristas y distribuidores.",
    servicesText: "Mega Furnit se enfoca en coordinación B2B, no en venta minorista. Ayudamos a pasar de necesidades de sourcing a producción y embarque con ejecución clara.",
    serviceOneTitle: "Desarrollo de producto",
    serviceOneText: "Soporte para conceptos de muebles, muestras de referencia, materiales, detalles constructivos y especificaciones para fábrica.",
    serviceTwoTitle: "Matching de fábrica y suministro",
    serviceTwoText: "Conectamos categoría, calidad, precio objetivo y escala de pedido con capacidad adecuada en China, Vietnam y fábricas asociadas.",
    serviceThreeTitle: "Coordinación de inspección de calidad",
    serviceThreeText: "Coordinamos puntos de inspección, revisión de empaque, avances de producción y comunicación de calidad antes de carga.",
    serviceFourTitle: "Documentos de exportación y carga",
    serviceFourText: "Apoyo con documentos de exportación, planes de carga y entrega para pedidos FOB de contenedor completo.",
    serviceFiveTitle: "Soporte de stock / distribución overseas",
    serviceFiveText: "Cuando sea necesario, revisamos programas regionales de stock, necesidades de distribuidores y soporte para Norteamérica, Europa, Latinoamérica, Sudeste Asiático y Medio Oriente.",
    productsEyebrow: "Programas de producto",
    productsTitle: "Programas de muebles para compradores globales",
    productsText: "Una muestra visual de categorías y estilos que pueden desarrollarse, buscarse y coordinarse a través de la red de fabricación de Mega Furnit.",
    capabilitiesEyebrow: "Capacidades",
    capabilitiesTitle: "Recursos productivos integrados y coordinación de cadena de suministro.",
    capabilitiesText: "Mega Furnit combina recursos propios de producción con una amplia red de fábricas asociadas para ayudar a compradores globales con menos fricción operativa.",
    discussRequirements: "Hablar de requisitos",
    capOneTitle: "Recursos propios y asociados",
    capOneText: "Coordinamos capacidad en China y Vietnam con una red de 20+ fábricas asociadas para diferentes categorías y perfiles de pedido.",
    capTwoTitle: "Sourcing de materiales y categorías",
    capTwoText: "Soporte para tapizados, muebles de panel, madera sólida, opciones de empaque y materiales relacionados.",
    capThreeTitle: "Muestras y soporte de cotización",
    capThreeText: "Convertimos requisitos de compradores en dirección de muestra, solicitudes de cotización y opciones comparables.",
    capFourTitle: "QC, empaque y embarque FOB",
    capFourText: "Coordinamos calidad, requisitos de cajas y etiquetas, documentos de exportación y carga de contenedores.",
    processEyebrow: "Proceso",
    processTitle: "Un camino práctico desde el brief de sourcing hasta la carga del contenedor.",
    processText: "El flujo está diseñado para compradores B2B que necesitan coordinación confiable, no un carrito.",
    stepOneTitle: "Discusión de requisitos",
    stepOneText: "Comparta mercado objetivo, categoría, tamaño de pedido, nivel de calidad y cronograma.",
    stepTwoTitle: "Matching o desarrollo de producto",
    stepTwoText: "Revisamos opciones existentes o desarrollamos productos desde referencias y especificaciones.",
    stepThreeTitle: "Cotización y confirmación de muestra",
    stepThreeText: "Comparamos opciones, confirmamos materiales, empaque, lead time y dirección de muestra.",
    stepFourTitle: "Coordinación de producción",
    stepFourText: "Coordinamos detalles de pedido, comunicación con fábrica, avances y requisitos del comprador.",
    stepFiveTitle: "Inspección de calidad y empaque",
    stepFiveText: "Apoyamos QC, revisión de empaque, marcas de caja, etiquetas y detalles de cumplimiento cuando aplique.",
    stepSixTitle: "Documentos y carga de contenedor",
    stepSixText: "Coordinamos documentos FOB, plan de carga, uso del contenedor y entrega final.",
    stepSevenTitle: "Soporte de entrega",
    stepSevenText: "Seguimiento práctico para importadores, mayoristas, distribuidores y compradores regionales.",
    whyEyebrow: "Por qué Mega Furnit",
    whyTitle: "Un socio de coordinación para compradores que necesitan opciones de fábrica y ejecución de exportación.",
    whyText: "El sourcing B2B de muebles depende de precio, calidad, capacidad, empaque, tiempos y comunicación. Mega Furnit está construido para esas necesidades operativas.",
    whySummary: [
      "4 fábricas propias, más de 300 empleados y capacidad mensual de 500 contenedores 40HQ",
      "Categorías de productos para interior/exterior, muebles tapizados, muebles de panel y muebles de madera maciza",
      "Soporte para condiciones FOB y entrega DDP"
    ],
    whyOneTitle: "Red China + Vietnam",
    whyOneText: "Acceso a más opciones productivas y flexibilidad práctica en dos regiones clave de muebles.",
    whyTwoTitle: "20+ fábricas asociadas",
    whyTwoText: "Conectamos categorías, niveles de calidad y programas de contenedor con una base de suministro enfocada.",
    whyThreeTitle: "Enfoque en importadores y mayoristas",
    whyThreeText: "Soporte para pedidos por lote, programas de producto, contenedores FOB y requisitos regionales.",
    whyFourTitle: "Coordinación integral",
    whyFourText: "De desarrollo a cotización, muestras, producción, QC, documentos y carga con menos pasos desconectados.",
    faqEyebrow: "FAQ",
    faqTitle: "Preguntas frecuentes de sourcing B2B.",
    faqOneQ: "¿Apoyan pedidos FOB de contenedor completo?",
    faqOneA: "Sí. Mega Furnit se enfoca en coordinación B2B FOB de contenedor completo, incluyendo producción, empaque, documentos y carga.",
    faqTwoQ: "¿Pueden ayudar a desarrollar muebles personalizados?",
    faqTwoA: "Sí. Podemos trabajar con imágenes de referencia, especificaciones, muestras, materiales y necesidades de mercado.",
    faqThreeQ: "¿Trabajan con importadores y mayoristas?",
    faqThreeA: "Sí. Nuestro servicio es para importadores, mayoristas, retailers, distribuidores, empresas de sourcing y compradores regionales.",
    faqFourQ: "¿Pueden coordinar QC y documentos de exportación?",
    faqFourA: "Sí. Coordinamos comunicación de calidad, revisión de empaque, cajas y etiquetas, documentos de exportación y carga.",
    faqFiveQ: "¿Qué mercados apoyan?",
    faqFiveA: "Apoyamos compradores en Norteamérica, Europa, Latinoamérica, Sudeste Asiático, Medio Oriente y otros mercados internacionales.",
    inquiryEyebrow: "Consulta",
    inquiryTitle: "¿Busca un socio confiable de cadena de suministro de muebles?",
    inquiryText: "Cuéntenos su mercado objetivo, categoría, tamaño de pedido y necesidades. Mega Furnit ayudará a encontrar productos y soluciones adecuadas.",
    contactMega: "Contactar Mega Furnit",
    contactEyebrow: "Contacto",
    contactTitle: "Envíe sus requisitos de sourcing.",
    contactText: "Incluya categoría, mercado objetivo, tamaño estimado de pedido y referencias. Revisaremos su solicitud y responderemos con próximos pasos.",
    emailLabel: "Email",
    marketsLine: "Mercados: Norteamérica, Europa, Latinoamérica, Sudeste Asiático, Medio Oriente",
    formName: "Nombre",
    formCompany: "Empresa",
    formEmail: "Email",
    formPhone: "WhatsApp / Teléfono",
    formCountry: "País / Región",
    formCategory: "Categoría o necesidad de sourcing",
    formCategoryPlaceholder: "Sofás, comedor, dormitorio, muebles de panel...",
    formOrderSize: "Tamaño estimado de pedido",
    formOrderPlaceholder: "Ejemplo: 1 x 40HQ, contenedores mensuales, pedido piloto",
    formMessage: "Mensaje",
    footerDescription: "Fabricación B2B de muebles y coordinación de cadena de suministro"
  },
  zh: {
    skipLink: "跳转到内容",
    menu: "菜单",
    brandSubtitle: "B2B家具供应链协调",
    navServices: "服务",
    navCapabilities: "能力",
    navProcess: "流程",
    navWhy: "优势",
    navFaq: "常见问题",
    navContact: "联系",
    sendInquiry: "发送询盘",
    viewCapabilities: "查看能力",
    heroEyebrow: "B2B家具供应链伙伴",
    heroTitle: "为全球买家提供专业家具制造与供应链支持。",
    heroText: "Mega Furnit连接中国和越南产能，并整合20+合作工厂网络，支持FOB整柜订单、产品开发、质量检验、出口文件和装柜协调。",
    heroCardTop: "整柜订单支持",
    heroCardBottom: "合作工厂网络",
    metricFactories: "合作工厂",
    metricNetworkTitle: "中国与越南",
    metricNetwork: "生产网络",
    metricFob: "FOB整柜订单",
    metricRegionsShort: "北美 / 欧洲 / 拉美 / 东南亚 / 中东",
    metricRegions: "区域买家支持",
    servicesEyebrow: "服务",
    servicesTitle: "围绕进口商、批发商和分销商的供应链服务。",
    servicesText: "Mega Furnit专注B2B协调，而不是零售购物流程。我们帮助买家从采购需求进入生产和出货执行。",
    serviceOneTitle: "产品开发",
    serviceOneText: "支持家具概念、参考样、材料选择、结构细节和适合工厂执行的规格整理。",
    serviceTwoTitle: "工厂与供应链匹配",
    serviceTwoText: "根据品类、质量、目标价格和订单规模匹配中国、越南及合作工厂产能。",
    serviceThreeTitle: "质量检验协调",
    serviceThreeText: "协调检验节点、包装审核、生产进度和装柜前质量沟通。",
    serviceFourTitle: "出口文件与装柜",
    serviceFourText: "支持出口文件、装柜计划和FOB整柜订单交付衔接。",
    serviceFiveTitle: "海外库存 / 分销支持",
    serviceFiveText: "如有需要，可讨论区域库存项目、分销需求，以及北美、欧洲、拉美、东南亚和中东市场支持。",
    productsEyebrow: "产品项目",
    productsTitle: "面向全球买家的家具项目",
    productsText: "展示可通过Mega Furnit制造网络开发、采购和协调的家具品类与风格样例。",
    capabilitiesEyebrow: "能力",
    capabilitiesTitle: "整合生产资源与供应链协调。",
    capabilitiesText: "Mega Furnit结合自有生产资源和合作工厂网络，帮助全球买家更顺畅地推进家具项目。",
    discussRequirements: "沟通需求",
    capOneTitle: "自有与合作生产资源",
    capOneText: "协调中国和越南产能，并结合20+合作工厂，适配不同品类和订单需求。",
    capTwoTitle: "材料与品类采购",
    capTwoText: "支持软体家具、板式家具、实木项目、包装方案及相关材料采购。",
    capThreeTitle: "样品开发与报价支持",
    capThreeText: "将买家需求转化为样品方向、工厂报价请求和可比较的采购方案。",
    capFourTitle: "QC、包装和FOB出货协调",
    capFourText: "协调质量沟通、纸箱与标签要求、出口文件和装柜安排。",
    processEyebrow: "流程",
    processTitle: "从采购需求到装柜出货的实用流程。",
    processText: "该流程面向需要可靠协调的B2B买家，而不是零售购物车。",
    stepOneTitle: "需求沟通",
    stepOneText: "提供目标市场、产品品类、订单规模、质量水平和时间计划。",
    stepTwoTitle: "产品匹配或开发",
    stepTwoText: "评估现有工厂方案，或根据参考图和规格开发产品。",
    stepThreeTitle: "报价与样品确认",
    stepThreeText: "比较合适方案，确认材料、包装、交期和样品方向。",
    stepFourTitle: "生产协调",
    stepFourText: "协调订单细节、工厂沟通、生产进度和买家要求。",
    stepFiveTitle: "质量检验与包装",
    stepFiveText: "支持QC协调、包装审核、箱唛、标签及相关合规细节。",
    stepSixTitle: "出口文件与装柜",
    stepSixText: "协调FOB出货文件、装柜计划、柜容利用和最终交付。",
    stepSevenTitle: "交付支持",
    stepSevenText: "为进口商、批发商、分销商和区域买家提供出货后的实际跟进。",
    whyEyebrow: "为什么选择Mega Furnit",
    whyTitle: "为需要工厂选择和出口执行的买家提供协调伙伴。",
    whyText: "B2B家具采购取决于价格、质量、产能匹配、包装、交期和沟通。Mega Furnit围绕这些实际需求建立服务。",
    whySummary: [
      "4个自有工厂，超过300名员工，月产500条40HQ货柜",
      "产品类型覆盖室内/室外、软体家具、板式家具、实木家具",
      "支持FOB账期和DDP交付"
    ],
    whyOneTitle: "中国 + 越南采购网络",
    whyOneText: "在两个主要家具供应区域获得更多生产选择和灵活性。",
    whyTwoTitle: "20+工厂合作",
    whyTwoText: "将不同家具品类、质量层级和整柜项目匹配到合适供应资源。",
    whyThreeTitle: "聚焦进口商和批发商",
    whyThreeText: "支持批量订单、产品项目、FOB整柜和区域买家需求。",
    whyFourTitle: "一站式协调",
    whyFourText: "从开发、报价、样品、生产、QC、文件到装柜，减少割裂环节。",
    faqEyebrow: "常见问题",
    faqTitle: "B2B采购常见问题。",
    faqOneQ: "是否支持FOB整柜订单？",
    faqOneA: "是。Mega Furnit专注B2B FOB整柜订单协调，包括生产沟通、包装要求、出口文件和装柜支持。",
    faqTwoQ: "可以开发定制家具产品吗？",
    faqTwoA: "可以。我们可根据参考图片、规格、样品要求、材料方向和目标市场需求进行协调开发。",
    faqThreeQ: "你们服务进口商和批发商吗？",
    faqThreeA: "是。我们的服务面向进口商、批发商、零售商、分销商、采购公司和区域家具买家。",
    faqFourQ: "可以协调QC和出口文件吗？",
    faqFourA: "可以。我们协助协调质量沟通、包装审核、箱唛标签、出口文件和装柜安排。",
    faqFiveQ: "支持哪些市场？",
    faqFiveA: "我们支持北美、欧洲、拉美、东南亚、中东及其他适合中国和越南家具采购的国际市场。",
    inquiryEyebrow: "询盘",
    inquiryTitle: "正在寻找可靠的家具供应链伙伴？",
    inquiryText: "告诉我们目标市场、产品品类、订单规模和采购需求。Mega Furnit将帮助匹配合适的家具产品和供应方案。",
    contactMega: "联系Mega Furnit",
    contactEyebrow: "联系",
    contactTitle: "发送您的采购需求。",
    contactText: "请包含产品品类、目标市场、预计订单规模和参考信息。我们会评估需求并回复下一步方案。",
    emailLabel: "邮箱",
    marketsLine: "市场：北美、欧洲、拉美、东南亚、中东",
    formName: "姓名",
    formCompany: "公司",
    formEmail: "邮箱",
    formPhone: "WhatsApp / 电话",
    formCountry: "国家 / 地区",
    formCategory: "产品品类或采购需求",
    formCategoryPlaceholder: "沙发、餐厅、卧室、板式家具...",
    formOrderSize: "预计订单规模",
    formOrderPlaceholder: "例如：1个40HQ、每月整柜、试单",
    formMessage: "留言",
    footerDescription: "B2B家具制造与供应链协调"
  }
};

function closeMobileMenu(header, toggle) {
  header.classList.remove("is-open");
  toggle?.setAttribute("aria-expanded", "false");
}

function setupMobileNavigation() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  if (!header || !toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => closeMobileMenu(header, toggle));
  });
}

function setLanguage(language) {
  const nextLanguage = translations[language] ? language : DEFAULT_LANGUAGE;
  const dictionary = translations[nextLanguage];
  document.documentElement.lang = nextLanguage === "zh" ? "zh-CN" : nextLanguage;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = dictionary[element.dataset.i18n];
    if (typeof value === "string") element.textContent = value;
  });
  document.querySelectorAll("[data-i18n-list]").forEach((element) => {
    const value = dictionary[element.dataset.i18nList];
    if (!Array.isArray(value)) return;
    element.innerHTML = "";
    value.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      element.append(listItem);
    });
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const value = dictionary[element.dataset.i18nPlaceholder];
    if (value) element.placeholder = value;
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === nextLanguage;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  localStorage.setItem(LANGUAGE_KEY, nextLanguage);
}

function setupLanguageSwitcher() {
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });
  setLanguage(localStorage.getItem(LANGUAGE_KEY) || DEFAULT_LANGUAGE);
}

function setupAnchorFocus() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      window.setTimeout(() => {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }, 450);
    });
  });
}

function setupFaqBehavior() {
  document.querySelectorAll(".faq-list details").forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (!detail.open) return;
      document.querySelectorAll(".faq-list details").forEach((other) => {
        if (other !== detail) other.open = false;
      });
    });
  });
}

function setupFormHelpers() {
  const form = document.querySelector('form[name="inquiry"]');
  if (!form) return;
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  if (category) {
    const categoryInput = form.querySelector("#category");
    if (categoryInput && !categoryInput.value) categoryInput.value = category;
  }
}

function setupExpectedImages() {
  document.querySelectorAll("[data-expected-src]").forEach((element) => {
    const expectedSrc = element.dataset.expectedSrc;
    if (!expectedSrc) return;
    const probe = new Image();
    probe.addEventListener("load", () => {
      const image = element.matches("img") ? element : element.querySelector("img");
      if (image) image.src = expectedSrc;
      if (element.dataset.lightboxSrc !== undefined) element.dataset.lightboxSrc = expectedSrc;
    });
    probe.src = expectedSrc;
  });
}

function openLightbox(src, alt = "") {
  const lightbox = document.querySelector("[data-lightbox]");
  const image = document.querySelector("[data-lightbox-image]");
  if (!lightbox || !image) return;
  image.src = src;
  image.alt = alt;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = document.querySelector("[data-lightbox]");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function setupLightbox() {
  document.querySelectorAll("[data-lightbox-src]").forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.querySelector("img");
      openLightbox(button.dataset.lightboxSrc || image?.src, image?.alt || "");
    });
  });
  document.querySelector("[data-lightbox-close]")?.addEventListener("click", closeLightbox);
  document.querySelector("[data-lightbox]")?.addEventListener("click", (event) => {
    if (event.target.matches("[data-lightbox]")) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}

function setupCarousel() {
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const slides = [...carousel.querySelectorAll(".carousel-slide")];
    const dotsWrap = carousel.querySelector(".carousel-dots");
    let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));
    let timer;

    const dots = slides.map((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Show slide ${index + 1}`);
      dot.addEventListener("click", () => showSlide(index));
      dotsWrap?.append(dot);
      return dot;
    });

    function showSlide(index) {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === activeIndex));
      dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === activeIndex));
      restart();
    }

    function restart() {
      window.clearInterval(timer);
      timer = window.setInterval(() => showSlide(activeIndex + 1), 4200);
    }

    carousel.querySelector("[data-carousel-prev]")?.addEventListener("click", () => showSlide(activeIndex - 1));
    carousel.querySelector("[data-carousel-next]")?.addEventListener("click", () => showSlide(activeIndex + 1));
    showSlide(activeIndex);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupMobileNavigation();
  setupLanguageSwitcher();
  setupAnchorFocus();
  setupFaqBehavior();
  setupFormHelpers();
  setupExpectedImages();
  setupLightbox();
  setupCarousel();
});
