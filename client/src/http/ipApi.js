import axios from 'axios'

export const getClientGeo = async () => {
    const api_key='at_0sitq5Xogpxhk2Sdt4n6ulMUdumrw'
    const url_ip = 'https://api64.ipify.org/?format=json';

    return axios.get(url_ip)
        .then(response => {

            const ip = response.data.ip;

            const url = `https://geo.ipify.org/api/v2/country?apiKey=${api_key}&ipAddress=${ip}`;
            return axios.get(url).then(response => {
                const offset = response.data.location.timezone;
                const country = response.data.location.country
                const [hours, minutes] = offset.split(':').map(Number);

                const date = new Date();
                const adjustedDate = new Date(date.getTime() + (hours * 60 + minutes) * 60000);

                const formattedDate = adjustedDate.toLocaleString('en-US', { timeZone: 'UTC' });

                return {formattedDate, country, offset}
            })
        })
        .catch(error => console.error(error.message))
}

export const getDog = async () => {
    return axios.get('https://dog.ceo/api/breeds/image/random')
}