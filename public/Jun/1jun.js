<pre style='height: 15em; background-color: rgba(255, 255, 128, .5);'>
  <code>
    const first = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, "один");
    });

    const second = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, "два");
    });

    Promise.race([first, second]).then(res => console.log(res));
  </code>
  </pre>