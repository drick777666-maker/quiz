document.addEventListener("DOMContentLoaded", () => {
    
    
    const questoes = [
        { pergunta: "Em qual filme de 1997 uma orfã é enviada para estudar magia em Hogwarts?", alternativas: ["As Crônicas de Nárnia", "Harry Potter e a Pedra Filosofal", "O Senhor dos Anéis", "Matilda"], respostaCorreta: "Harry Potter e a Pedra Filosofal" },
        { pergunta: "Qual ator é conhecido por interpretar o Homem de Ferro (Tony Stark) no Universo Cinematográfico Marvel?", alternativas: ["Chris Evans", "Mark Ruffalo", "Robert Downey Jr.", "Chris Hemsworth"], respostaCorreta: "Robert Downey Jr." },
        { pergunta: "Qual filme ganhou mais estatuetas do Oscar na história, empatado com 'Ben-Hur' e 'Titanic'?", alternativas: ["O Poderoso Chefão", "Forrest Gump", "O Senhor dos Anéis: O Retorno do Rei", "A Lista de Schindler"], respostaCorreta: "O Senhor dos Anéis: O Retorno do Rei" },
        { pergunta: "No filme 'Vingadores: Ultimato', qual frase icônica o Homem de Ferro diz antes de estalar os dedos?", alternativas: ["Eu sou o inevitável.", "Eu sou a sua vingança.", "Eu sou o Homem de Ferro.", "Eu sou invencível."], respostaCorreta: "Eu sou o Homem de Ferro." },
        { pergunta: "Qual é o nome da cafeteria onde os personagens de 'Friends' frequentemente se reúnem?", alternativas: ["Monk's Diner", "Central Perk", "Luke's Diner", "The Krusty Krab"], respostaCorreta: "Central Perk" },
        { pergunta: "Em 'Game of Thrones', qual família tem como lema a frase 'O Inverno Está Chegando'?", alternativas: ["Lannister", "Targaryen", "Baratheon", "Stark"], respostaCorreta: "Stark" },
        { pergunta: "Qual cientista de química se transforma em um chefão do tráfico de drogas na série 'Breaking Bad'?", alternativas: ["Jesse Pinkman", "Saul Goodman", "Walter White", "Gustavo Fring"], respostaCorreta: "Walter White" },
        { pergunta: "Qual série da Netflix se passa na cidade fictícia de Hawkins e envolve o Mundo Invertido?", alternativas: ["The Umbrella Academy", "Dark", "Stranger Things", "Ozark"], respostaCorreta: "Stranger Things" },
        { pergunta: "Quem é o autor do best-seller 'O Alquimista'?", alternativas: ["Machado de Assis", "José Saramago", "Paulo Coelho", "Jorge Amado"], respostaCorreta: "Paulo Coelho" },
        { pergunta: "Qual personagem é conhecido por amar os segundos cafés da manhã e viver no Condado, na obra de Tolkien?", alternativas: ["Gandalf", "Aragorn", "Frodo Bolseiro", "Legolas"], respostaCorreta: "Frodo Bolseiro" },
        { pergunta: "Qual livro de George Orwell descreve uma sociedade vigiada pelo 'Grande Irmão'?", alternativas: ["Revolução dos Bichos", "Fahrenheit 451", "Admirável Mundo Novo", "1984"], respostaCorreta: "1984" },
        { pergunta: "Em 'Dom Casmurro', de Machado de Assis, o narrador Bento Santiago acusa sua esposa de traição. Qual é o nome dela?", alternativas: ["Virgília", "Capitu", "Sofia", "Helena"], respostaCorreta: "Capitu" },
        { pergunta: "Qual é a capital do Brasil?", alternativas: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"], respostaCorreta: "Brasília" },
        { pergunta: "Quantos planetas 'oficiais' fazem parte do nosso Sistema Solar?", alternativas: ["7", "8", "9", "10"], respostaCorreta: "8" },
        { pergunta: "Qual rede social é conhecida por ter vídeos curtos com formato vertical e músicas populares?", alternativas: ["X (Twitter)", "Facebook", "TikTok", "LinkedIn"], respostaCorreta: "TikTok" },
        { pergunta: "Qual artista pop é conhecida por hits como 'Bad Romance', 'Shallow' e 'Poker Face'?", alternativas: ["Rihanna", "Beyoncé", "Lady Gaga", "Taylor Swift"], respostaCorreta: "Lady Gaga" }
    
    ];

    // Variáveis estado atual
    let questoesEmbaralhadas = [];
    let indiceQuestaoAtual = 0;
    let acertos = 0;
    let nomeUsuario = "";
    let alternativaSelecionada = null; 

    // elementos
    const inicioTela = document.getElementById("inicio-tela");
    const quizTela = document.getElementById("quiz-tela");
    const resultadoTela = document.getElementById("resultado-tela");
    const nomeInput = document.getElementById("nome-usuario");
    const iniciarBtn = document.getElementById("iniciar-quiz-btn");
    const proximaBtn = document.getElementById("proxima-btn");
    const alternativasContainer = document.getElementById("alternativas-container");
    const feedbackErro = document.getElementById("feedback-erro");
    const tituloQuestao = document.getElementById("titulo-questao");


    
    // Diagnostico de buttom(por ia)
    if (!iniciarBtn) {
        console.error("ERRO CRÍTICO: O botão 'iniciar-quiz-btn' não foi encontrado no HTML. Verifique se o ID está EXATAMENTE igual.");
        return; // Impede a execução do restante do código
    }
    


    // Função de utilidade para embaralhar arrays
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    
    // Logica
    iniciarBtn.addEventListener("click", () => {
        const nome = nomeInput.value.trim();
        
        if (nome) {
            nomeUsuario = nome;
            questoesEmbaralhadas = shuffleArray([...questoes]); 
            indiceQuestaoAtual = 0;
            acertos = 0;
            
            inicioTela.classList.remove("ativa");
            quizTela.classList.add("ativa");
            carregarQuestao();
        } else {
            
            alert("Por favor, digite seu nome para iniciar.");
        }
    });


    function carregarQuestao() {
        if (indiceQuestaoAtual >= questoesEmbaralhadas.length) {
            finalizarQuiz();
            return;
        }

        const questao = questoesEmbaralhadas[indiceQuestaoAtual];
        tituloQuestao.textContent = `Questão ${indiceQuestaoAtual + 1}: ${questao.pergunta}`;
        
        alternativasContainer.innerHTML = "";
        proximaBtn.disabled = true;

        const alternativasEmbaralhadas = shuffleArray([...questao.alternativas]); 

        alternativasEmbaralhadas.forEach(alternativa => {
            const btn = document.createElement("button");
            btn.textContent = alternativa;
            btn.classList.add("alternativa-btn");
            btn.onclick = () => selecionarAlternativa(btn, alternativa, questao.respostaCorreta);
            alternativasContainer.appendChild(btn);
        });

        alternativaSelecionada = null;
        feedbackErro.style.display = "none";
    }
    
    function selecionarAlternativa(btn, respostaDada, respostaCorreta) {
        if (alternativaSelecionada) return;

        alternativaSelecionada = btn;
        
        const todosBotoes = alternativasContainer.querySelectorAll('.alternativa-btn');
        todosBotoes.forEach(b => {
            b.classList.add('selecionada'); 
        });
        
        if (respostaDada === respostaCorreta) {
            btn.classList.add("correta");
            acertos++;
        } else {
            btn.classList.add("errada");
            todosBotoes.forEach(b => {
                if (b.textContent === respostaCorreta) {
                    b.classList.add("correta");
                }
            });
        }

        proximaBtn.disabled = false;
    }


    proximaBtn.addEventListener("click", () => {
        if (alternativaSelecionada) {
            indiceQuestaoAtual++;
            carregarQuestao();
        } else {
            feedbackErro.textContent = "Por favor, selecione uma alternativa.";
            feedbackErro.style.display = "block";
        }
    });


    // grafico
    function finalizarQuiz() {
        if (window.myChart) {
            window.myChart.destroy();
        }
        
        quizTela.classList.remove("ativa");
        resultadoTela.classList.add("ativa");

        const totalQuestoes = questoes.length;
        const erros = totalQuestoes - acertos;
        const percentual = (acertos / totalQuestoes) * 100;
        
        document.getElementById("resultado-nome").textContent = nomeUsuario;
        document.getElementById("resultado-acertos").textContent = acertos;
        document.getElementById("resultado-erros").textContent = erros;
        document.getElementById("resultado-percentual").textContent = `${percentual.toFixed(2)}%`;
        
        const mensagemDesempenho = document.getElementById("mensagem-desempenho");
        if (percentual >= 80) {
            mensagemDesempenho.textContent = "Excelente! Você é um expert!";
            mensagemDesempenho.style.color = "#28a745";
        } else if (percentual >= 50) {
            mensagemDesempenho.textContent = "Bom desempenho! Quase lá.";
            mensagemDesempenho.style.color = "#ffc107";
        } else {
            mensagemDesempenho.textContent = "Precisa melhorar. Tente novamente!";
            mensagemDesempenho.style.color = "#dc3545";
        }

        gerarGrafico(acertos, erros);
    }

    function gerarGrafico(acertos, erros) {
        const ctx = document.getElementById('grafico-desempenho').getContext('2d');
        
        window.myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Acertos', 'Erros'],
                datasets: [{
                    data: [acertos, erros],
                    backgroundColor: [
                        'rgba(40, 167, 69, 0.8)',
                        'rgba(220, 53, 69, 0.8)'
                    ],
                    borderColor: [
                        'rgba(40, 167, 69, 1)',
                        'rgba(220, 53, 69, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Proporção de Desempenho'
                    }
                }
            }
        });
    }
});