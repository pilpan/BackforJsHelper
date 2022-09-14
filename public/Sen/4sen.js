<pre style='height: 10em; background-color: rgba(255, 255, 128, .5);'>
  <code>
    //Что будет в консоли?
    const shape = {
    radius: 10,
    diameter() {
      return this.radius * 2;
    },
    perimeter: () => 2 * Math.PI * this.radius
  };

  shape.diameter();
  shape.perimeter();
  </code>
  </pre>