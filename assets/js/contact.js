document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    initializeContactForm();
});

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    addRealTimeValidation();
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            processFormSubmission();
        } else {
            showMessage('Por favor, corrija os erros antes de enviar.', 'error');
        }
    });
}

function addRealTimeValidation() {
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const assunto = document.getElementById('assunto');
    const mensagem = document.getElementById('mensagem');

    nome.addEventListener('input', function() {
        validateNome(this.value);
    });
    nome.addEventListener('blur', function() {
        validateNome(this.value);
    });

    email.addEventListener('input', function() {
        validateEmail(this.value);
    });
    email.addEventListener('blur', function() {
        validateEmail(this.value);
    });

    assunto.addEventListener('change', function() {
        validateAssunto(this.value);
    });

    mensagem.addEventListener('input', function() {
        validateMensagem(this.value);
        updateCharacterCount(this.value.length);
    });
    mensagem.addEventListener('blur', function() {
        validateMensagem(this.value);
    });
}

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

function validateForm() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;
    const nomeValid = validateNome(nome);
    const emailValid = validateEmail(email);
    const assuntoValid = validateAssunto(assunto);
    const mensagemValid = validateMensagem(mensagem);
    return nomeValid && emailValid && assuntoValid && mensagemValid;
}

function processFormSubmission() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    setTimeout(() => {
        const formData = collectFormData();
        const isSuccess = Math.random() > 0.1;
        if (isSuccess) {
            handleSubmissionSuccess(formData);
        } else {
            handleSubmissionError();
        }
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
    }, 2000);
}

function collectFormData() {
    return {
        nome: document.getElementById('nome').value.trim(),
        email: document.getElementById('email').value.trim(),
        assunto: document.getElementById('assunto').value,
        mensagem: document.getElementById('mensagem').value.trim(),
        newsletter: document.getElementById('newsletter').checked,
        timestamp: new Date().toISOString()
    };
}

function handleSubmissionSuccess(formData) {
    showMessage(
        `Obrigado, ${formData.nome}! Sua mensagem foi enviada com sucesso. Nossa equipe entrará em contato em breve através do e-mail ${formData.email}.`,
        'success'
    );
    document.getElementById('contactForm').reset();
    clearAllFieldErrors();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    logFormSubmission(formData);
}

function handleSubmissionError() {
    showMessage(
        'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato conosco diretamente pelo telefone (11) 9999-9999.',
        'error'
    );
}

function showFieldError(errorElementId, message) {
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        const fieldId = errorElementId.replace('Error', '');
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = 'var(--error-color)';
        }
    }
}

function clearFieldError(errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        const fieldId = errorElementId.replace('Error', '');
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = 'var(--border-color)';
        }
    }
}

function clearAllFieldErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
    const fields = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    fields.forEach(field => {
        field.style.borderColor = 'var(--border-color)';
    });
}

function showMessage(message, type) {
    const messageElement = document.getElementById('formMessage');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        messageElement.style.display = 'block';
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 10000);
    }
}

function updateCharacterCount(currentLength) {
    const minLength = 20;
    const remaining = minLength - currentLength;
    if (remaining > 0) {
        console.log(`Faltam ${remaining} caracteres para o mínimo`);
    }
}

function logFormSubmission(formData) {
    console.log('Log de envio do formulário:', {
        event: 'form_submission',
        form_name: 'contact_form',
        user_data: {
            has_newsletter_opt_in: formData.newsletter,
            subject_category: formData.assunto
        }
    });
}
