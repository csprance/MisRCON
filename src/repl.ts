const main = () => {
  const dateTime = '2019-01-24T10:30:15';
  const date = new Date(Date.parse(dateTime));
  console.log(date.toISOString());
};
const results = main();
console.log(results);
