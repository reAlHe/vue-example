<template>
  <div>
    <div class="display">{{ display }}</div>
    <div class="buttons">
      <button @click="appendToDisplay('1')">1</button>
      <button @click="appendToDisplay('2')">2</button>
      <button @click="appendToDisplay('3')">3</button>
      <button @click="setOperation('ADD')">+</button>
      <button @click="appendToDisplay('4')">4</button>
      <button @click="appendToDisplay('5')">5</button>
      <button @click="appendToDisplay('6')">6</button>
      <button @click="setOperation('SUB')">-</button>
      <button @click="appendToDisplay('7')">7</button>
      <button @click="appendToDisplay('8')">8</button>
      <button @click="appendToDisplay('9')">9</button>
      <button @click="setOperation('MUL')">*</button>
      <button @click="appendToDisplay('0')">0</button>
      <button @click="clearDisplay()">C</button>
      <button @click="setOperation('DIV')">/</button>
      <button @click="calculateResult()">=</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      display: '',
      number1: null,
      number2: null,
      operation: '',
      baseUrl: 'http://localhost:3000'
    };
  },
  methods: {
    appendToDisplay(char) {
      this.display += char;
    },
    setOperation(op) {
      if (this.display !== '') {
        this.number1 = parseInt(this.display, 10);
        this.operation = op;
        this.display = '';
      }
    },
    clearDisplay() {
      this.display = '';
      this.number1 = null;
      this.number2 = null;
      this.operation = '';
    },
    async calculateResult() {
      if (this.operation && this.display !== '') {
        this.number2 = parseInt(this.display, 10);

        const payload = {
          number1: this.number1,
          number2: this.number2,
          operation: this.operation
        };

        const url = `${this.baseUrl}/calculate`;

        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });

          if (response.status === 400) {
            const errorData = await response.json();
            if (errorData.error === 'Division by 0') {
              this.display = 'ERROR: Division by 0!';
            } else {
              this.display = 'ERROR';
            }
          } else {
            const data = await response.json();
            this.display = data.result.toString();
          }
        } catch (error) {
          console.error('Error:', error);
          this.display = 'ERROR';
        }

        this.operation = '';
      }
    }
  }
};
</script>

<style scoped>
.display {
  font-size: 24px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
}
.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
button {
  font-size: 18px;
  padding: 10px;
  cursor: pointer;
}
</style>