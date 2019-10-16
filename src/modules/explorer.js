export default class Explorer {
  getContent(item) {
    if (item) {
      if (Array.isArray(item.content)) {
        return item.title;
      }
      return item.content;
    }
    return null;
  }

  getPath(items, item) {
    const compare = (title, level, callback, item, result) => {
      if (item.level === level && item.title === title) {
        result.match = true;
        result.data = item;
        callback ? callback(item, result) : null;
      }
    };
    const result = this._execute(items, item.title, item.level, compare);
    return result.path + item.title;
  }

  onRouter(items, path) {
    const init = item => {
      item.open = false;
      item.hide = false;
    };
    this._executeAll(items, init);
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
    const result = this._execute(items, title, level, compare, callback);
    return result.data;
  }

  onSearch(items, str) {
    const init = item => {
      item.open = false;
      item.hide = true;
    };
    this._executeAll(items, init);
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
    const result = this._execute(items, null, null, compare, callback);
    return result.data;
  }

  _execute(items, title, level, compare, callback) {
    const result = {
      match: false,
      path: "/",
      data: null
    };
    items.forEach(item => {
      compare(title, level, callback, item, result);
      if (Array.isArray(item.content)) {
        const _result = this._execute(
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

  _executeAll(items, callback) {
    items.forEach(item => {
      callback(item);
      if (Array.isArray(item.content)) {
        this._executeAll(item.content, callback);
      }
    });
  }
}
