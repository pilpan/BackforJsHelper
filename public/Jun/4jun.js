<pre style='height: 20em; background-color: rgba(255, 255, 128, .5);'>
  <code>
  // Какое будет значение на выходе?
  const client = {
    name: "Mr. Smith",
    age: 21
  }
  const increaseAge = (x = { ...client }) => x.age += 1
  const changeAgeAndName = (x = { ...client }) => {
    x.age += 1
    x.name = "Ivan"
  }
  increaseAge(client)
  changeAgeAndName()
  console.log(client)
  </code>
  </pre>