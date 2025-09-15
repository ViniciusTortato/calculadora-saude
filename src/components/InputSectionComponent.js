/**
 * Input section component with form fields
 */
export class InputSectionComponent {
  constructor(eventBus) {
    this.eventBus = eventBus
    this.render()
    this.setupEventListeners()
  }

  render() {
    const inputSection = document.getElementById('input-section-component')
    if (inputSection) {
      inputSection.innerHTML = this.getTemplate()
    }
  }

  getTemplate() {
    return `
      <section id="input-section">
        <div class="space-y-6">
          <!-- Dados Gerais -->
          <div class="bg-neutral-100 p-6 rounded-2xl">
            <h2 class="text-xl font-semibold text-primary-600 mb-4">Seus Dados Pessoais</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="peso" class="block text-sm font-medium text-neutral-700">Peso (kg)</label>
                <input type="number" id="peso" class="mt-1 block w-full rounded-xl border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3" placeholder="Ex: 70">
              </div>
              <div>
                <label for="altura" class="block text-sm font-medium text-neutral-700">Altura (cm)</label>
                <input type="number" id="altura" class="mt-1 block w-full rounded-xl border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3" placeholder="Ex: 175">
              </div>
              <div>
                <label for="idade" class="block text-sm font-medium text-neutral-700">Idade</label>
                <input type="number" id="idade" class="mt-1 block w-full rounded-xl border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3" placeholder="Ex: 30">
              </div>
              <div>
                <label for="sexo" class="block text-sm font-medium text-neutral-700">Sexo</label>
                <select id="sexo" class="mt-1 block w-full rounded-xl border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3">
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Nível de Atividade Física e Meta de Peso -->
          <div class="bg-neutral-100 p-6 rounded-2xl">
            <h2 class="text-xl font-semibold text-primary-600 mb-4">Nível de Atividade e Meta</h2>
            <div class="space-y-4">
              <div>
                <label for="atividade" class="block text-sm font-medium text-neutral-700">Nível de Atividade Física</label>
                <select id="atividade" class="mt-1 block w-full rounded-xl border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3">
                  <option value="1.2">Sedentário (pouco ou nenhum exercício)</option>
                  <option value="1.375">Leve (exercício 1-3 dias/semana)</option>
                  <option value="1.55">Moderado (exercício 3-5 dias/semana)</option>
                  <option value="1.725">Muito Ativo (exercício 6-7 dias/semana)</option>
                  <option value="1.9">Extremamente Ativo (trabalho físico pesado)</option>
                </select>
              </div>
              <div>
                <label for="meta-peso" class="block text-sm font-medium text-neutral-700">Selecione sua meta semanal</label>
                <select id="meta-peso" class="mt-1 block w-full rounded-xl border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3">
                  <option value="0.25">0.25 kg por semana (lento e sustentável)</option>
                  <option value="0.5">0.5 kg por semana (moderado)</option>
                  <option value="1">1.0 kg por semana (rápido)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Botão de Cálculo -->
        <div class="flex justify-center mt-8">
          <button id="calculate-button" class="px-8 py-4 bg-primary-500 text-white font-semibold rounded-full shadow-lg hover:bg-primary-600 transition-all duration-300 transform hover:scale-105">Calcular Resultados</button>
        </div>
      </section>
    `
  }

  setupEventListeners() {
    const calculateButton = document.getElementById('calculate-button')
    if (calculateButton) {
      calculateButton.addEventListener('click', () => {
        this.handleCalculate()
      })
    }
  }

  handleCalculate() {
    const data = {
      peso: parseFloat(document.getElementById('peso')?.value || 0),
      altura: parseFloat(document.getElementById('altura')?.value || 0),
      idade: parseFloat(document.getElementById('idade')?.value || 0),
      sexo: document.getElementById('sexo')?.value || 'masculino',
      activityFactor: parseFloat(document.getElementById('atividade')?.value || 1.2),
      metaPeso: parseFloat(document.getElementById('meta-peso')?.value || 0.5)
    }

    this.eventBus.emit('calculateRequest', data)
  }
}
