function getUrlParamsToJson() {
  // 获取当前页面的 URL
  const url = window.location.href;

  // 创建一个空对象来存储参数
  const params = {};

  // 使用 URL 对象解析 URL
  const urlObj = new URL(url);

  // 获取查询字符串部分
  const searchParams = urlObj.searchParams;

  // 遍历所有参数
  for (const [key, value] of searchParams) {
    // 如果参数已经存在，将其转换为数组
    if (params.hasOwnProperty(key)) {
      if (!Array.isArray(params[key])) {
        params[key] = [params[key]];
      }
      params[key].push(value);
    }
    else {
      params[key] = value;
    }
  }

  return params;
}

