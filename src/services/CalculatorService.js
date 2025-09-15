import { ValidationService } from '../utils/ValidationService.js'

/**
 * Calculator service for health metrics calculations
 */
export class CalculatorService {
  calculateAllMetrics(data) {
    ValidationService.validateCalculationData(data)

    const { peso, altura, idade, sexo, activityFactor, metaPeso } = data
    const alturaMetros = altura / 100

    const imcData = this.calculateIMC(peso, alturaMetros)
    const tmb = this.calculateTMB(peso, altura, idade, sexo)
    const tdee = this.calculateTDEE(tmb, activityFactor)
    const caloricGoal = this.calculateCaloricGoal(tdee, metaPeso)
    const recommendations = this.generateRecommendations(imcData, tdee, caloricGoal)

    return {
      imc: imcData,
      tmb: Math.round(tmb),
      tdee: Math.round(tdee),
      caloricGoal: Math.round(caloricGoal),
      weightGoal: metaPeso,
      recommendations
    }
  }

  calculateIMC(peso, altura) {
    const imc = peso / (altura * altura)
    let classification = ''

    if (imc < 18.5) {
      classification = 'Abaixo do Peso'
    } else if (imc >= 18.5 && imc <= 24.9) {
      classification = 'Peso Normal'
    } else if (imc >= 25 && imc <= 29.9) {
      classification = 'Sobrepeso'
    } else if (imc >= 30 && imc <= 34.9) {
      classification = 'Obesidade Grau I'
    } else if (imc >= 35 && imc <= 39.9) {
      classification = 'Obesidade Grau II'
    } else {
      classification = 'Obesidade Grau III'
    }

    return {
      value: imc.toFixed(2),
      classification
    }
  }

  calculateTMB(peso, altura, idade, sexo) {
    if (sexo === 'masculino') {
      return (10 * peso) + (6.25 * altura) - (5 * idade) + 5
    } else {
      return (10 * peso) + (6.25 * altura) - (5 * idade) - 161
    }
  }

  calculateTDEE(tmb, activityFactor) {
    return tmb * activityFactor
  }

  calculateCaloricGoal(tdee, metaPeso) {
    const caloriesPerKg = 7700
    const dailyCaloricDeficit = (metaPeso * caloriesPerKg) / 7
    return tdee - dailyCaloricDeficit
  }

  generateRecommendations(imcData, tdee, caloricGoal) {
    return `
      <div>
        <h4 class="font-bold text-primary-600 mb-1">Alimentação:</h4>
        <p class="mb-2">Focar em uma alimentação balanceada é crucial. Inclua mais proteínas magras, fibras e gorduras saudáveis. Mantenha-se longe de alimentos processados e açúcares adicionados. Considere dividir suas calorias diárias (${Math.round(caloricGoal)} kcal) em 3 a 5 refeições menores para manter o metabolismo ativo.</p>
      </div>
      <div>
        <h4 class="font-bold text-primary-600 mb-1">Atividade Física:</h4>
        <p class="mb-2">Combinar exercícios aeróbicos (como caminhada, corrida ou natação) com treino de força (musculação, pesos) é a melhor estratégia. Tente praticar pelo menos 150 minutos de atividade moderada por semana. A consistência é mais importante que a intensidade inicial.</p>
      </div>
      <div>
        <h4 class="font-bold text-primary-600 mb-1">Hábitos de Vida:</h4>
        <p class="mb-2">A hidratação é fundamental para o metabolismo e a saciedade. Beba bastante água ao longo do dia. Priorize 7-9 horas de sono por noite, pois o sono de qualidade regula hormônios relacionados ao apetite. Gerenciar o estresse através de meditação ou hobbies também ajuda a evitar a alimentação emocional.</p>
      </div>
    `
  }
}
