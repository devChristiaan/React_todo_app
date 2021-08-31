import axios from "axios"

const deleteToDo = (ItemId, ListId, url) => {
  axios.delete(url + ItemId, {data:{ListID: ListId}})
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    console.log(err);
  })
}

export { deleteToDo }