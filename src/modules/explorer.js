export default class Explorer {
  clear(items) {
    items.forEach(item => {
      item.open = false;
      item.hide = true;
      if (item.type === "folder" && item.content) {
        this.clear(item.content);
      }
    });
  }
  toogle(item) {
    item.open = !item.open;
    if (item.type === "folder" && item.content) {
      item.content.forEach(_item => {
        _item.hide = !item.open;
      });
    }
  }
  route(items, title) {
    const result = this.execute(items, title);
    return result.path + title;
  }
  router(items, path) {
    const array = path.split("/");
    if (!array[array.length - 1]){
      array.pop();
    }
    const title = array[array.length - 1];
    const callback = (item) => {
      item.open = true;
      item.hide = false;
      if (item.type === "folder" && item.content) {
        item.content.forEach(item => {
          item.hide = false;
        });
      }
    };
    this.execute(items, title, callback);
  }
  search(items, title) {
    const callback = (item) => {
      item.open = true;
      item.hide = false;
      if (item.title === title && item.type === "folder" && item.content) {
        item.content.forEach(item => {
          item.hide = false;
        });
      }
    };
    const result = this.execute(items, title, callback);
    return result.path + title;
  }

  execute(items, title, callback) {
    const result = {
      match: false,
      path: '/'
    };
    items.forEach(item => {
      if (item.title === title) {
        result.match = true;
        callback ? callback(item, result) : null;
      }
      if (item.type === "folder" && item.content) {
        const _result = this.execute(item.content, title, callback);
        if (_result.match) {
          result.match = true;
          result.path += item.title + _result.path;
          callback ? callback(item, _result) : null;
        }
      }
    });
    return result;
  }
};