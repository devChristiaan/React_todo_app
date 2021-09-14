import axios from "axios";

const fetchNotes = (url) => {
  axios.get(url)
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    console.log(err);
  })
}

export { fetchNotes };