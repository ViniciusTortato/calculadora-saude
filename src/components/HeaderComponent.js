/**
 * Header component with title and introduction
 */
export class HeaderComponent {
  constructor() {
    this.render()
  }

  render() {
    const headerElement = document.getElementById('header-component')
    if (headerElement) {
      headerElement.innerHTML = this.getTemplate()
    }
  }

  getTemplate() {
    return `
      <header class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-primary-600 mb-2">Sua Jornada de Peso</h1>
        <p class="text-neutral-600">Calculadora de saúde para ajudar você a alcançar seus objetivos.</p>
      </header>
    `
  }
}
