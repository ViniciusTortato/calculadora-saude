/**
 * Validation service for input data
 */
export class ValidationService {
  static validateCalculationData(data) {
    const { peso, altura, idade, metaPeso } = data

    if (isNaN(peso) || peso <= 0) {
      throw new Error('Peso deve ser um número positivo')
    }

    if (isNaN(altura) || altura <= 0) {
      throw new Error('Altura deve ser um número positivo')
    }

    if (isNaN(idade) || idade <= 0 || idade > 120) {
      throw new Error('Idade deve ser um número entre 1 e 120')
    }

    if (isNaN(metaPeso) || metaPeso <= 0) {
      throw new Error('Meta de peso deve ser um número positivo')
    }

    return true
  }
}
