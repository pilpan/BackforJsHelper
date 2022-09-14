<pre style='height: 15em; background-color: rgba(255, 255, 128, .5);'>
  <code>
  // Каким будет результат?
    
    const obj = { 1: "a", 2: "b", 3: "c" };
    const set = new Set([1, 2, 3, 4, 5]);

    obj.hasOwnProperty("1");
    obj.hasOwnProperty(1);
    set.has("1");
    set.has(1);
  </code>
  </pre>