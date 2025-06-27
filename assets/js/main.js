/**
 * AVENTURA TRAVEL - JAVASCRIPT PRINCIPAL
 * Sistema de interações e funcionalidades gerais do site
 */

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aventura Travel - Site carregado com sucesso!');
    
    // Inicializar funcionalidades
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    
    console.log('Todas as funcionalidades foram inicializadas');
});

/**
 * SISTEMA DE NAVEGAÇÃO
 * Controla o menu responsivo e navegação suave
 */
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle do menu mobile
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            console.log('Menu mobile toggled');
        });
    }
    
    // Fechar menu ao clicar em um link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                console.log('Menu mobile fechado após clique em link');
            }
        });
    });
    
    // Fechar menu ao redimensionar janela
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Destacar link ativo baseado na página atual
    highlightActiveNavLink();
    
    console.log('Sistema de navegação inicializado');
}

/**
 * Destaca o link de navegação ativo baseado na URL atual
 */
function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // Remove classe active de todos os links
        link.classList.remove('active');
        
        // Adiciona classe active ao link correspondente
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
            console.log(`Link ativo definido para: ${linkPage}`);
        }
    });
}

/**
 * EFEITOS DE SCROLL
 * Controla animações e efeitos baseados na rolagem da página
 */
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    
    // Efeito de scroll no header
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // Scroll suave para âncoras internas
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log(`Scroll suave para elemento: ${targetId}`);
            }
        });
    });
    
    console.log('Efeitos de scroll inicializados');
}

/**
 * SISTEMA DE ANIMAÇÕES
 * Controla animações de entrada e interações visuais
 */
function initializeAnimations() {
    // Configurar IntersectionObserver para animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                console.log(`Elemento animado: ${entry.target.className}`);
            }
        });
    }, observerOptions);
    
    // Elementos para animar
    const animatedElements = document.querySelectorAll(
        '.highlight-card, .destination-card, .team-member, .mvv-card, .stat-item'
    );
    
    // Aplicar estado inicial e observar elementos
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
    
    // Animações de hover para cards
    const cards = document.querySelectorAll('.highlight-card, .destination-card, .team-member, .info-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    console.log(`${animatedElements.length} elementos configurados para animação`);
}

/**
 * UTILITÁRIOS GERAIS
 */

// Função para formatar números (usado nas estatísticas)
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

// Função para detectar dispositivo mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Função para log de interações do usuário
function logUserInteraction(action, element) {
    console.log(`Interação do usuário: ${action} em ${element}`);
    
    // Aqui você poderia enviar dados para analytics
    // Analytics.track(action, { element: element });
}

// Debounce function para otimizar eventos de scroll/resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce aos eventos de scroll e resize
const debouncedScrollHandler = debounce(function() {
    // Handlers de scroll otimizados
}, 10);

const debouncedResizeHandler = debounce(function() {
    // Handlers de resize otimizados
    console.log('Janela redimensionada');
}, 250);

window.addEventListener('scroll', debouncedScrollHandler);
window.addEventListener('resize', debouncedResizeHandler);

/**
 * TRATAMENTO DE ERROS
 */
window.addEventListener('error', function(e) {
    console.error('Erro JavaScript capturado:', e.error);
    // Aqui você poderia enviar erros para um serviço de monitoramento
});

// Capturar erros de promises rejeitadas
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promise rejeitada não tratada:', e.reason);
    e.preventDefault();
});

console.log('Sistema JavaScript da Aventura Travel carregado com sucesso!');