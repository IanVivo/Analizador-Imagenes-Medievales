const extensionesSoportadas = new Set(['.jpg', '.jpeg', '.png', '.bmp', '.gif', '.tiff', '.webp']);

// Objeto para almacenar todos los elementos del DOM
const domElements = {
  dropArea: document.getElementById('dropArea'),
  fileInput: document.getElementById('fileInput'),
  imagePreview: document.getElementById('imagePreview'),
  previewImage: document.getElementById('previewImage'),
  uploadMessage: document.getElementById('uploadMessage'),
  analyzing: document.getElementById('analyzing'),
  results: document.getElementById('results'),
  resultsCards: document.getElementById('resultsCards'),
  resultTitle: document.getElementById('resultTitle'),
  resultSubtitle: document.getElementById('resultSubtitle'),
  resultBadge: document.getElementById('resultBadge'),
  resetButton: document.getElementById('resetButton')
};

// Datos completos de cada categoría
const categoryData = {
  'weapon': {
    name: 'Arma medieval',
    description: 'Las armas medievales incluyen espadas, hachas, mazas y otras herramientas de combate utilizadas por guerreros y caballeros durante la Edad Media.',
    color: '#ef4444', // Rojo
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sword-icon lucide-sword"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/></svg>`
  },
  'armor': {
    name: 'Armadura',
    description: 'Las armaduras medievales consistían en cubiertas protectoras hechas de metal, cuero o tela, usadas por soldados y caballeros para protegerse contra ataques.',
    color: '#3b82f6', // Azul
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="0.9">
    <path d="M25,21.5c0,-0.319 -0.152,-0.619 -0.409,-0.807c-0.258,-0.188 -0.589,-0.243 -0.893,-0.146l-7.698,2.44c-0,0 -7.698,-2.44 -7.698,-2.44c-0.304,-0.097 -0.635,-0.042 -0.893,0.146c-0.257,0.188 -0.409,0.488 -0.409,0.807l0,6c0,0.552 0.448,1 1,1l16,0c0.552,0 1,-0.448 1,-1l0,-6Zm-2,1.366l0,3.634l-14,0c0,-0 0,-3.634 0,-3.634c0,0 6.698,2.123 6.698,2.123c0.196,0.063 0.408,0.063 0.604,0l6.698,-2.123Zm-2.002,-14.31c0.02,-0.341 -0.137,-0.668 -0.414,-0.868c-0.278,-0.199 -0.638,-0.243 -0.955,-0.116l-2.5,1c-0.38,0.151 -0.629,0.519 -0.629,0.928l0,11c0,0.317 0.151,0.616 0.406,0.804c0.255,0.189 0.585,0.245 0.888,0.152l6.5,-2c0.42,-0.129 0.706,-0.517 0.706,-0.956l0,-6c0,-0.552 -0.448,-1 -1,-1c-0.892,0 -1.663,-0.246 -2.203,-0.739c-0.516,-0.472 -0.797,-1.166 -0.797,-2.02c0,-0.062 -0.005,-0.124 -0.002,-0.185Zm-8.627,-0.984c-0.317,-0.127 -0.677,-0.083 -0.955,0.116c-0.277,0.2 -0.434,0.527 -0.414,0.868c0.003,0.061 -0.002,0.123 -0.002,0.185c0,0.854 -0.281,1.548 -0.797,2.02c-0.54,0.493 -1.311,0.739 -2.203,0.739c-0.552,0 -1,0.448 -1,1l0,6c0,0.439 0.286,0.827 0.706,0.956l6.5,2c0.303,0.093 0.633,0.037 0.888,-0.152c0.255,-0.188 0.406,-0.487 0.406,-0.804l0,-11c0,-0.409 -0.249,-0.777 -0.629,-0.928l-2.5,-1Zm6.756,2.354c0.21,0.942 0.675,1.72 1.32,2.31c0.666,0.609 1.537,1.023 2.553,1.186c0,0 0,4.339 0,4.339c0,0 -4.5,1.385 -4.5,1.385c0,0 0,-8.969 0,-8.969l0.627,-0.251Zm-6.254,0l0.627,0.251c0,0 0,8.969 0,8.969c-0,0 -4.5,-1.385 -4.5,-1.385c0,0 0,-4.339 0,-4.339c1.016,-0.163 1.887,-0.577 2.553,-1.186c0.645,-0.59 1.11,-1.368 1.32,-2.31Zm-1.892,-5.23c0.058,-0.294 -0.018,-0.598 -0.208,-0.83c-0.19,-0.232 -0.473,-0.366 -0.773,-0.366c-1.611,0 -3.965,1.17 -5.569,2.638c-1.191,1.089 -1.931,2.354 -1.931,3.362c0,0.552 0.448,1 1,1l5.5,0l0.981,-0.804l1,-5Zm11.019,-1.196c-0.3,0 -0.583,0.134 -0.773,0.366c-0.19,0.232 -0.266,0.536 -0.208,0.83l1,5l0.981,0.804l5.5,0c0.552,0 1,-0.448 1,-1c-0,-1.008 -0.74,-2.273 -1.931,-3.362c-1.604,-1.468 -3.958,-2.638 -5.569,-2.638Zm-13.82,5l-3.216,0c0.222,-0.299 0.501,-0.598 0.816,-0.886c0.847,-0.775 1.944,-1.485 2.948,-1.852l-0.548,2.738Zm15.64,0l-0.548,-2.738c1.004,0.367 2.101,1.078 2.948,1.852c0.315,0.288 0.594,0.587 0.816,0.886l-3.216,0Z"/>
</svg>`
  },
  'shield': {
    name: 'Escudo',
    description: 'Los escudos medievales eran equipos defensivos sostenidos en la mano o montados en el brazo, diseñados para interceptar ataques y proteger a los guerreros durante la batalla.',
    color: '#f59e0b', // Amarillo
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <path d="M12 8v4"></path>
      <path d="M12 16h.01"></path>
      <path d="M8 12h8"></path>
      <path d="M8 16h8"></path>
    </svg>`
  }
};

// Función para verificar elementos críticos del DOM
function verifyDomElements() {
  const criticalElements = ['analyzing', 'results', 'resultsCards', 'resultTitle', 'resetButton'];
  criticalElements.forEach(id => {
    if (!domElements[id]) {
      throw new Error(`Elemento crítico no encontrado: ${id}`);
    }
  });
}

// Función para capitalizar la primera letra
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Función para mostrar los resultados del análisis
function displayResults(results) {
  try {
    console.log('Mostrando resultados:', results);
    
    // Verificar elementos del DOM
    if (!domElements.analyzing || !domElements.results || !domElements.resultsCards) {
      throw new Error('Elementos del DOM no disponibles');
    }

    // Validar resultados
    if (!results || !Array.isArray(results)) {
      throw new Error('Formato de resultados inválido');
    }

    // Ocultar sección de análisis y mostrar resultados
    domElements.analyzing.style.display = 'none';
    domElements.results.style.display = 'block';

    // Ordenar resultados por confianza
    const sortedResults = [...results].sort((a, b) => b.confidence - a.confidence);
    const topResult = sortedResults[0];

    // Actualizar título principal
    if (domElements.resultTitle) {
      domElements.resultTitle.textContent = `Resultado: ${categoryData[topResult.category].name}`;
    }

    // Actualizar subtítulo
    if (domElements.resultSubtitle) {
      domElements.resultSubtitle.textContent = 'Desglose del análisis:';
    }

    // Mostrar badge de completado
    if (domElements.resultBadge) {
      domElements.resultBadge.textContent = 'Análisis completado';
      domElements.resultBadge.style.display = 'block';
    }

    // Limpiar resultados anteriores
    domElements.resultsCards.innerHTML = '';

    // Crear y mostrar cada tarjeta de resultado
    sortedResults.forEach((result, index) => {
      const percentage = Math.round(result.confidence * 100);
      const categoryInfo = categoryData[result.category] || categoryData['weapon'];
      
      const card = document.createElement('div');
      card.className = 'analysis-card animate-slide-up';
      card.setAttribute('data-category', result.category);
      card.style.animationDelay = `${index * 0.15}s`;
      card.style.setProperty('--card-color', categoryInfo.color);
      
      card.innerHTML = `
        <div class="analysis-card-content">
          <div class="analysis-card-header">
            <div class="analysis-card-title">
              <div class="analysis-card-icon">${categoryInfo.icon}</div>
              <h3>${capitalizeFirstLetter(categoryInfo.name)}</h3>
            </div>
            <div class="analysis-card-confidence">${percentage}%</div>
          </div>
          
          <div class="analysis-card-progress">
            <div class="analysis-card-progress-bar" style="width: 0%"></div>
          </div>
          
          <div class="analysis-card-description">
            ${categoryInfo.description}
          </div>
        </div>
      `;
      
      domElements.resultsCards.appendChild(card);
      
      // Animar la barra de progreso
      setTimeout(() => {
        const progressBar = card.querySelector('.analysis-card-progress-bar');
        if (progressBar) {
          progressBar.style.width = `${percentage}%`;
        }
      }, 100);
    });

  } catch (error) {
    console.error('Error al mostrar resultados:', error);
    
    // Mostrar mensaje de error en la interfaz
    if (domElements.resultsCards) {
      domElements.resultsCards.innerHTML = `
        <div class="error-message">
          <p>Ocurrió un error al mostrar los resultados:</p>
          <p>${error.message}</p>
        </div>
      `;
    }
    
    if (domElements.analyzing) domElements.analyzing.style.display = 'none';
    if (domElements.results) domElements.results.style.display = 'block';
  }
}

// Función para analizar la imagen enviándola al servidor
function analyzeImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  // Mostrar estado de análisis
  domElements.uploadMessage.style.display = 'none';
  domElements.analyzing.style.display = 'flex';
  domElements.results.style.display = 'none';

  fetch('/predict', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }
    return response.json();
  })
  .then(data => {
    console.log('Datos recibidos del backend:', data);
    
    // Mapear los resultados del backend al formato esperado
    const apiResults = [
      { 
        category: 'weapon', 
        confidence: data['Arma medieval'] || 0,
      },
      { 
        category: 'armor', 
        confidence: data['Armadura'] || 0,
      },
      { 
        category: 'shield', 
        confidence: data['Escudo'] || 0,
      }
    ];
    
    displayResults(apiResults);
  })
  .catch(error => {
    console.error('Error:', error);
    domElements.analyzing.style.display = 'none';
    
    // Mostrar mensaje de error
    if (domElements.resultsCards) {
      domElements.resultsCards.innerHTML = `
        <div class="error-message">
          <p>Error al analizar la imagen:</p>
          <p>${error.message}</p>
        </div>
      `;
    }
    domElements.results.style.display = 'block';
  });
}

// Función para mostrar la vista previa de la imagen
function displayImage(file) {
  const reader = new FileReader();
  
  reader.onload = function(e) {
    domElements.previewImage.src = e.target.result;
    domElements.imagePreview.style.display = 'flex';
    domElements.dropArea.style.display = 'none';
    
    // Mostrar estado de análisis
    domElements.uploadMessage.style.display = 'none';
    domElements.analyzing.style.display = 'flex';
    domElements.results.style.display = 'none';
  }
  
  reader.readAsDataURL(file);
}

// Función para reiniciar el analizador
function resetAnalyzer() {
  // Restablecer UI
  domElements.imagePreview.style.display = 'none';
  domElements.dropArea.style.display = 'flex';
  domElements.results.style.display = 'none';
  domElements.uploadMessage.style.display = 'block';
  
  // Ocultar badge
  if (domElements.resultBadge) {
    domElements.resultBadge.style.display = 'none';
  }
  
  // Limpiar entrada de archivo
  domElements.fileInput.value = '';
}

// Función para prevenir comportamientos por defecto en eventos de arrastre
function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

// Función para resaltar el área de drop
function highlight() {
  domElements.dropArea.classList.add('active');
}

// Función para quitar el resaltado del área de drop
function unhighlight() {
  domElements.dropArea.classList.remove('active');
}

// Función para manejar archivos soltados
function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  
  if (files.length) {
    handleFiles(files);
  }
}

// Función para manejar archivos seleccionados
function handleFiles(files) {
  if (files[0]) {
    const file = files[0];
    const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!extensionesSoportadas.has(extension)) {
      mostrarPopupError();
      return;
    }
    
    if (!file.type.match('image.*')) {
      mostrarPopupError();
      return;
    }
    
    displayImage(file);
    analyzeImage(file);
  }
}

function mostrarPopupError() {
  // Crear elementos del pop-up
  const backdrop = document.createElement('div');
  backdrop.className = 'popup-backdrop';
  
  const popup = document.createElement('div');
  popup.className = 'extension-error-popup';
  popup.innerHTML = `
    <h4>Extensión no soportada</h4>
    <p>Solo se admiten archivos de imagen con las siguientes extensiones:</p>
    <p><strong>JPG, JPEG, PNG, BMP, GIF, TIFF, WEBP</strong></p>
    <button id="closePopup">Entendido</button>
  `;
  
  // Añadir al cuerpo del documento
  document.body.appendChild(backdrop);
  document.body.appendChild(popup);
  
  // Configurar evento de cierre
  const closeButton = document.getElementById('closePopup');
  closeButton.addEventListener('click', () => {
    document.body.removeChild(backdrop);
    document.body.removeChild(popup);
  });
  
  // Cerrar al hacer clic fuera del pop-up
  backdrop.addEventListener('click', () => {
    document.body.removeChild(backdrop);
    document.body.removeChild(popup);
  });
}

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
  try {
    verifyDomElements();
    
    // Configurar event listeners para drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      domElements.dropArea.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      domElements.dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      domElements.dropArea.addEventListener(eventName, unhighlight, false);
    });

    domElements.dropArea.addEventListener('drop', handleDrop, false);
    domElements.fileInput.addEventListener('change', () => handleFiles(domElements.fileInput.files));
    domElements.resetButton.addEventListener('click', resetAnalyzer);

  } catch (error) {
    console.error('Error inicial:', error);
    // Mostrar mensaje de error al usuario
    document.body.innerHTML = `
      <div style="padding: 2rem; color: red; font-family: sans-serif;">
        <h1>Error de configuración</h1>
        <p>${error.message}</p>
        <p>Por favor, recarga la página o contacta al soporte.</p>
      </div>
    `;
  }
});