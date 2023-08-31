function setStatus(data) {
  if (Array.isArray(data)) {//kiểm tra data là obj hay array
    data.forEach((obj) => {
      obj.status = obj.status.readInt8();
    });
  }else{
    data.status = data.status.readInt8();
  }
}

module.exports = {
  setStatus: setStatus,
};
