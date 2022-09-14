<pre style='height: 15em; background-color: rgba(255, 255, 128, .5);'>
  <code>
  // Каким будет результат?
    const foo = () => console.log("First");
    const bar = () => setTimeout(() => console.log("Second"));
    const baz = () => console.log("Third");

    bar();
    foo();
    baz();
  </code>
  </pre>