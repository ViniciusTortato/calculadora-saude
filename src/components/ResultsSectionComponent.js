/**
 * Results section component with calculation results
 */
export class ResultsSectionComponent {
  constructor(eventBus) {
    this.eventBus = eventBus
    this.render()
  }

  render() {
    const resultsSection = document.getElementById('results-section-component')
    if (resultsSection) {
      resultsSection.innerHTML = this.getTemplate()
    }
  }

  getTemplate() {
    return `
      <section id="results-section" class="hidden mt-10">
        <!-- Título de Resultados -->
        <header class="text-center mb-8">
          <h2 class="text-2xl md:text-3xl font-bold text-primary-600 mb-2">Seus Resultados</h2>
          <p class="text-neutral-600">Informações e recomendações personalizadas para sua meta de saúde.</p>
        </header>

        <div class="space-y-6">
          <!-- Card de IMC -->
          <div class="bg-primary-100 p-6 rounded-2xl shadow-md">
            <h3 class="text-xl font-semibold text-primary-700 mb-2">Seu IMC</h3>
            <p id="imc-result" class="text-3xl font-bold text-primary-600 mb-1"></p>
            <p id="imc-classification" class="text-lg text-primary-800"></p>
          </div>

          <!-- Card de TMB -->
          <div class="bg-secondary-100 p-6 rounded-2xl shadow-md">
            <h3 class="text-xl font-semibold text-secondary-700 mb-2">Sua Taxa Metabólica Basal (TMB)</h3>
            <p id="tmb-result" class="text-3xl font-bold text-secondary-600">0 kcal/dia</p>
            <p class="text-secondary-800 text-sm mt-2">É a quantidade de calorias que seu corpo queima em repouso.</p>
          </div>

          <!-- Card de Gasto Calórico Total -->
          <div class="bg-primary-100 p-6 rounded-2xl shadow-md">
            <h3 class="text-xl font-semibold text-primary-700 mb-2">Seu Gasto Calórico Diário Total</h3>
            <p id="tdee-result" class="text-3xl font-bold text-primary-600">0 kcal/dia</p>
            <p class="text-primary-800 text-sm mt-2">Este valor considera seu nível de atividade física e é a sua estimativa diária de gasto calórico.</p>
          </div>

          <!-- Card de Plano de Peso -->
          <div class="bg-accent-100 p-6 rounded-2xl shadow-md">
            <h3 class="text-xl font-semibold text-accent-700 mb-2">Plano de Perda de Peso</h3>
            <p id="caloric-goal-result" class="text-3xl font-bold text-accent-600">0 kcal/dia</p>
            <p class="text-accent-800 text-sm mt-2">Ingestão calórica diária recomendada para atingir sua meta de perda de peso de <span id="weight-goal"></span> por semana.</p>
          </div>

          <!-- Seção de Recomendações -->
          <div class="bg-neutral-100 p-6 rounded-2xl shadow-md">
            <h3 class="text-xl font-semibold text-neutral-800 mb-4">Recomendações Personalizadas</h3>
            <div id="recommendations-content" class="space-y-4 text-neutral-700">
              <!-- Conteúdo de recomendações será inserido aqui pelo JavaScript -->
            </div>
          </div>
        </div>
      </section>
    `
  }

  updateResults(results) {
    const safeSetText = (elementId, text) => {
      const element = document.getElementById(elementId)
      if (element) element.textContent = text
    }

    const safeSetHTML = (elementId, html) => {
      const element = document.getElementById(elementId)
      if (element) element.innerHTML = html
    }

    safeSetText('imc-result', results.imc.value)
    safeSetText('imc-classification', results.imc.classification)
    safeSetText('tmb-result', `${results.tmb} kcal/dia`)
    safeSetText('tdee-result', `${results.tdee} kcal/dia`)
    safeSetText('caloric-goal-result', `${results.caloricGoal} kcal/dia`)
    safeSetText('weight-goal', `${results.weightGoal} kg`)
    safeSetHTML('recommendations-content', results.recommendations)
  }

  show() {
    const inputSection = document.getElementById('input-section')
    const resultsSection = document.getElementById('results-section')
    
    if (inputSection) inputSection.classList.add('hidden')
    if (resultsSection) {
      resultsSection.classList.remove('hidden')
      resultsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
