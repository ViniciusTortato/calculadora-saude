# Calculadora de Jornada de Peso

Uma calculadora de saúde profissional para ajudar usuários a alcançar seus objetivos de peso.

## Estrutura do Projeto

```
src/
├── components/          # Componentes UI reutilizáveis
│   ├── HeaderComponent.js
│   ├── InputSectionComponent.js
│   ├── ResultsSectionComponent.js
│   └── ModalComponent.js
├── services/           # Lógica de negócio e cálculos
│   └── CalculatorService.js
├── utils/             # Utilitários e helpers
│   ├── EventBus.js
│   └── ValidationService.js
├── styles/            # Estilos e configurações CSS
│   └── main.css
└── main.js            # Ponto de entrada da aplicação
```

## Funcionalidades

- Cálculo de IMC (Índice de Massa Corporal)
- Cálculo de TMB (Taxa Metabólica Basal) usando fórmula Mifflin-St Jeor
- Cálculo de TDEE (Gasto Energético Total Diário)
- Recomendações personalizadas baseadas nos resultados
- Interface responsiva com Tailwind CSS
- Validação de dados de entrada
- Sistema de modais para feedback

## Tecnologias

- HTML5
- CSS3 (Tailwind CSS)
- JavaScript ES6+
- Vite (build tool)

## Como executar

```bash
npm install
npm run dev
```

## Padrões Arquiteturais

- **Separation of Concerns**: Lógica separada em serviços, componentes e utilitários
- **Event-Driven Architecture**: Comunicação entre componentes via EventBus
- **Modular Design**: Componentes reutilizáveis e independentes
- **Service Layer**: Cálculos e lógica de negócio isolados em serviços
