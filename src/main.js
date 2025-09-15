import { HeaderComponent } from './components/HeaderComponent.js'
import { InputSectionComponent } from './components/InputSectionComponent.js'
import { ResultsSectionComponent } from './components/ResultsSectionComponent.js'
import { ModalComponent } from './components/ModalComponent.js'
import { CalculatorService } from './services/CalculatorService.js'
import { EventBus } from './utils/EventBus.js'

class WeightCalculatorApp {
  constructor() {
    this.eventBus = new EventBus()
    this.calculatorService = new CalculatorService()
    this.initializeComponents()
    this.setupEventListeners()
  }

  initializeComponents() {
    this.headerComponent = new HeaderComponent()
    this.inputSectionComponent = new InputSectionComponent(this.eventBus)
    this.resultsSectionComponent = new ResultsSectionComponent(this.eventBus)
    this.modalComponent = new ModalComponent(this.eventBus)
  }

  setupEventListeners() {
    this.eventBus.on('calculateRequest', (data) => {
      this.handleCalculation(data)
    })

    this.eventBus.on('showResults', () => {
      this.resultsSectionComponent.show()
    })

    this.eventBus.on('showError', (message) => {
      this.modalComponent.showError(message)
    })
  }

  handleCalculation(data) {
    try {
      const results = this.calculatorService.calculateAllMetrics(data)
      this.resultsSectionComponent.updateResults(results)
      this.eventBus.emit('showResults')
    } catch (error) {
      this.eventBus.emit('showError', error.message)
    }
  }
}

// Initialize application when DOM is loaded with error handling
document.addEventListener('DOMContentLoaded', () => {
  try {
    new WeightCalculatorApp()
  } catch (error) {
    console.error('Error initializing application:', error)
  }
})
