import { getWordsCount } from "../../utils";

class Counter {
  quill: any;
  options: any;
  container: any;

  constructor(quill: any, options) {
    this.quill = quill;
    this.options = options;
    this.container = document.querySelector(options.container);
    quill.on("text-change", this.update.bind(this));
    this.update();
  }

  calculate() {
    let text = this.quill.getText().trim();
    if (this.options.unit === "word") {
      text = text.trim();
      const count = getWordsCount(text);

      return text.length > 0 ? count : 0;
    } else {
      return text.length;
    }
  }

  update() {
    const length = this.calculate();
    this.container.innerText = length;
  }
}

export default Counter;
