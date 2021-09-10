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

const deleteList = (ListId, url) => {
  axios.delete(url + ListId)
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    console.log(err);
  })
}

const renameList = (NewTitle, ListId, url) => {
  axios.patch(url + ListId, {data:{title: NewTitle}})
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    console.log(err);
  })
}

const renameItem = (itemId, url, content) => {
  axios.patch(url + itemId, {data:{content: content}})
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    console.log(err);
  })
}

export { deleteToDo, deleteList, renameList, renameItem }