<pre style='height: 15em; background-color: rgba(255, 255, 128, .5);'>
  <code>
  // Чему будет равно sum?
    const a = {};
    const b = { key: "b" };
    const c = { key: "c" };

    a[b] = 123;
    a[c] = 456;

    console.log(a[b]);
  </code>
  </pre>