<pre style='height: 15em; background-color: rgba(255, 255, 128, .5);'>
  <code>
  //Каким будет результат?
    class Chameleon {
    static colorChange(newColor) {
      this.newColor = newColor;
      return this.newColor;
    }

    constructor({ newColor = "green" } = {}) {
      this.newColor = newColor;
    }
  }

  const freddie = new Chameleon({ newColor: "purple" });
  freddie.colorChange("orange");
  </code>
  </pre>