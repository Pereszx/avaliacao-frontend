/**
 * AVENTURA TRAVEL - SISTEMA DE CONTATO
 * Validação e processamento do formulário de contato
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de contato inicializado');
    
    // Verificar se estamos na página de contato
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.log('Formulário de contato não encontrado nesta página');
        return;
    }
    
    initializeContactForm();
});

/**
 * INICIALIZAÇÃO DO FORMULÁRIO DE CONTATO
 */
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Adicionar event listeners para validação em tempo real
    addRealTimeValidation();
    
    // Event listener para o submit do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Formulário submetido');
        
        // Executar validação completa
        if (validateForm()) {
            // Se válido, processar envio
            processFormSubmission();
        } else {
            console.log('Formulário contém erros de validação');
            showMessage('Por favor, corrija os erros antes de enviar.', 'error');
        }
    });
    
    console.log('Formulário de contato configurado com sucesso');
}

/**
 * VALIDAÇÃO EM TEMPO REAL
 */
function addRealTimeValidation() {
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const assunto = document.getElementById('assunto');
    const mensagem = document.getElementById('mensagem');
    
    // Validação do nome
    nome.addEventListener('input', function() {
        validateNome(this.value);
    });
    
    nome.addEventListener('blur', function() {
        validateNome(this.value);
    });
    
    // Validação do email
    email.addEventListener('input', function() {
        validateEmail(this.value);
    });
    
    email.addEventListener('blur', function() {
        validateEmail(this.value);
    });
    
    // Validação do assunto
    assunto.addEventListener('change', function() {
        validateAssunto(this.value);
    });
    
    // Validação da mensagem
    mensagem.addEventListener('input', function() {
        validateMensagem(this.value);
        updateCharacterCount(this.value.length);
    });
    
    mensagem.addEventListener('blur', function() {
        validateMensagem(this.value);
    });
    
    console.log('Validação em tempo real configurada');
}

/**
 * FUNÇÕES DE VALIDAÇÃO INDIVIDUAIS
 */

// Validar nome completo
function validateNome(nome) {
    const nomeError = document.getElementById('nomeError');
    const isValid = nome.trim().length >= 2 && /^[a-zA-ZÀ-ÿ\s]+$/.test(nome.trim());
    
    if (!nome.trim()) {
        showFieldError('nomeError', 'Nome é obrigatório');
        return false;
    } else if (nome.trim().length < 2) {
        showFieldError('nomeError', 'Nome deve ter pelo menos 2 caracteres');
        return false;
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nome.trim())) {
        showFieldError('nomeError', 'Nome deve conter apenas letras e espaços');
        return false;
    } else {
        clearFieldError('nomeError');
        return true;
    }
}

// Validar formato do email
function validateEmail(email) {
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.trim()) {
        showFieldError('emailError', 'E-mail é obrigatório');
        return false;
    } else if (!emailRegex.test(email.trim())) {
        showFieldError('emailError', 'Por favor, insira um e-mail válido');
        return false;
    } else {
        clearFieldError('emailError');
        return true;
    }
}

// Validar seleção do assunto
function validateAssunto(assunto) {
    const assuntoError = document.getElementById('assuntoError');
    
    if (!assunto) {
        showFieldError('assuntoError', 'Por favor, selecione um assunto');
        return false;
    } else {
        clearFieldError('assuntoError');
        return true;
    }
}

// Validar mensagem (mínimo 20 caracteres)
function validateMensagem(mensagem) {
    const mensagemError = document.getElementById('mensagemError');
    const minLength = 20;
    
    if (!mensagem.trim()) {
        showFieldError('mensagemError', 'Mensagem é obrigatória');
        return false;
    } else if (mensagem.trim().length < minLength) {
        showFieldError('mensagemError', `Mensagem deve ter pelo menos ${minLength} caracteres`);
        return false;
    } else {
        clearFieldError('mensagemError');
        return true;
    }
}

/**
 * VALIDAÇÃO COMPLETA DO FORMULÁRIO
 */
function validateForm() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;
    
    // Executar todas as validações
    const nomeValid = validateNome(nome);
    const emailValid = validateEmail(email);
    const assuntoValid = validateAssunto(assunto);
    const mensagemValid = validateMensagem(mensagem);
    
    const isFormValid = nomeValid && emailValid && assuntoValid && mensagemValid;
    
    console.log('Validação completa:', {
        nome: nomeValid,
        email: emailValid,
        assunto: assuntoValid,
        mensagem: mensagemValid,
        formValid: isFormValid
    });
    
    return isFormValid;
}

/**
 * PROCESSAMENTO DO ENVIO DO FORMULÁRIO
 */
function processFormSubmission() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');
    
    // Mostrar estado de carregamento
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    
    console.log('Processando envio do formulário...');
    
    // Simular envio (substituir por integração real)
    setTimeout(() => {
        // Coletar dados do formulário
        const formData = collectFormData();
        
        // Simular sucesso (90% das vezes) ou erro
        const isSuccess = Math.random() > 0.1;
        
        if (isSuccess) {
            handleSubmissionSuccess(formData);
        } else {
            handleSubmissionError();
        }
        
        // Restaurar estado do botão
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
        
    }, 2000); // Simular 2 segundos de processamento
}

/**
 * COLETA DOS DADOS DO FORMULÁRIO
 */
function collectFormData() {
    const formData = {
        nome: document.getElementById('nome').value.trim(),
        email: document.getElementById('email').value.trim(),
        assunto: document.getElementById('assunto').value,
        mensagem: document.getElementById('mensagem').value.trim(),
        newsletter: document.getElementById('newsletter').checked,
        timestamp: new Date().toISOString()
    };
    
    console.log('Dados coletados do formulário:', formData);
    return formData;
}

/**
 * TRATAMENTO DE SUCESSO NO ENVIO
 */
function handleSubmissionSuccess(formData) {
    console.log('Formulário enviado com sucesso!', formData);
    
    // Mostrar mensagem de sucesso
    showMessage(
        `Obrigado, ${formData.nome}! Sua mensagem foi enviada com sucesso. Nossa equipe entrará em contato em breve através do e-mail ${formData.email}.`,
        'success'
    );
    
    // Limpar formulário
    document.getElementById('contactForm').reset();
    
    // Limpar todas as mensagens de erro
    clearAllFieldErrors();
    
    // Rolar para o topo da página
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Log para analytics (opcional)
    logFormSubmission(formData);
}

/**
 * TRATAMENTO DE ERRO NO ENVIO
 */
function handleSubmissionError() {
    console.error('Erro ao enviar formulário');
    
    showMessage(
        'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato conosco diretamente pelo telefone (11) 9999-9999.',
        'error'
    );
}

/**
 * FUNÇÕES UTILITÁRIAS
 */

// Mostrar erro em campo específico
function showFieldError(errorElementId, message) {
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Adicionar classe de erro ao campo
        const fieldId = errorElementId.replace('Error', '');
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = 'var(--error-color)';
        }
    }
}

// Limpar erro de campo específico
function clearFieldError(errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        
        // Remover classe de erro do campo
        const fieldId = errorElementId.replace('Error', '');
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = 'var(--border-color)';
        }
    }
}

// Limpar todos os erros de campo
function clearAllFieldErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
    
    // Limpar estilos de erro dos campos
    const fields = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    fields.forEach(field => {
        field.style.borderColor = 'var(--border-color)';
    });
}

// Mostrar mensagem de feedback geral
function showMessage(message, type) {
    const messageElement = document.getElementById('formMessage');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        messageElement.style.display = 'block';
        
        // Auto-ocultar mensagem após 10 segundos
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 10000);
    }
}

// Atualizar contador de caracteres (se necessário)
function updateCharacterCount(currentLength) {
    const minLength = 20;
    const remaining = minLength - currentLength;
    
    // Você pode adicionar um contador visual aqui se desejar
    if (remaining > 0) {
        console.log(`Faltam ${remaining} caracteres para o mínimo`);
    }
}

// Log de envio do formulário para analytics
function logFormSubmission(formData) {
    // Aqui você enviaria dados para Google Analytics, etc.
    console.log('Log de envio do formulário:', {
        event: 'form_submission',
        form_name: 'contact_form',
        user_data: {
            has_newsletter_opt_in: formData.newsletter,
            subject_category: formData.assunto
        }
    });
}

console.log('Sistema de contato carregado com sucesso!');