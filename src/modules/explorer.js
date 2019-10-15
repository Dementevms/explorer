export default class Explorer {
  content(item) {
    if (item) {
      if (Array.isArray(item.content)) {
        return item.title;
      }
      return item.content;
    }
    return null;
  }
  root(items) {
    items.forEach(item => {
      item.hide = false;
    });
  }
  clear(items) {
    const callback = item => {
      item.open = false;
      item.hide = true;
    };
    this.executeAll(items, callback);
  }
  toogle(item) {
    item.open = !item.open;
    if (Array.isArray(item.content) && item.content.length > 0) {
      item.content.forEach(_item => {
        _item.hide = !item.open;
      });
    }
  }
  route(items, item) {
    const compare = (title, level, callback, item, result) => {
      if (item.level === level && item.title === title) {
        result.match = true;
        result.data = item;
        callback ? callback(item, result) : null;
      }
    };
    const result = this.execute(items, item.title, item.level, compare);
    return result.path + item.title;
  }
  router(items, path) {
    const array = path.split("/");
    array.shift();
    const level = array.length - 1;
    if (!array[level]) {
      array.pop();
    }
    const title = array[level];
    const compare = (title, level, callback, item, result) => {
      if (item.level === level && item.title === title) {
        result.match = true;
        result.data = item;
        callback ? callback(item, result) : null;
      }
    };
    const callback = item => {
      item.open = true;
      item.hide = false;
      if (Array.isArray(item.content)) {
        item.content.forEach(item => {
          item.hide = false;
        });
      }
    };
    const result = this.execute(items, title, level, compare, callback);
    this.root(items);
    return result.data;
  }
  search(items, str) {
    const regEx = new RegExp(str, "gi");
    const compare = (title, level, callback, item, result) => {
      if (item.title.match(regEx)) {
        result.match = true;
        result.data = item;
        callback ? callback(item, result) : null;
      }
    };
    const callback = _item => {
      _item.open = true;
      _item.hide = false;
    };
    this.execute(items, null, null, compare, callback);
  }

  execute(items, title, level, compare, callback) {
    const result = {
      match: false,
      path: "/",
      data: null
    };
    items.forEach(item => {
      compare(title, level, callback, item, result);
      if (Array.isArray(item.content)) {
        const _result = this.execute(
          item.content,
          title,
          level,
          compare,
          callback
        );
        if (_result.match) {
          result.match = true;
          result.data = _result.data;
          result.path += item.title + _result.path;
          callback ? callback(item, _result) : null;
        }
      }
    });
    return result;
  }

  executeAll(items, callback) {
    items.forEach(item => {
      callback(item);
      if (Array.isArray(item.content)) {
        this.executeAll(item.content, callback);
      }
    });
  }
}
