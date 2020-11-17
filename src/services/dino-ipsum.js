export default class DinoIpsum {
  static async getIpsum() {
    return fetch(`http://dinoipsum.herokuapp.com/api/?format=html&paragraphs=1&words=1`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.status);
        }
        return response.json();
      })
      .catch(function(error) {
        return Error(error);
      })
  }
}