const axios = require("axios");
const url = "https://jsonplaceholder.typicode.com/users";

const getData = async url => {
  const options = {
    url: url,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    }
  };

  try {
    const response = await axios(options);
    const data = response.data;
    const names = data.map(a => a.name)
    // const names = data.flatMap(a => a.name.split(' '))
    // const names = data.filter(a => a.name.includes('Glenna'))
    console.log(names);
  } catch (error) {
    console.log(error);
  }
};

getData(url);