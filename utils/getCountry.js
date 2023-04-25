import axios from "axios";

export const getCountry = async () => {
  try {
    const { data } = await axios.get(`https://ipinfo.io/json`);
    if (data.country) {
      const { data: countryInfo } = await axios.get(
        `https://restcountries.com/v3.1/alpha/${data.country}`
      );

      console.log(countryInfo);
      return countryInfo[0]?.name?.common;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
