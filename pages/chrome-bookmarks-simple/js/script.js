// 存储父级目录的历史，每一项是一个代表书签节点的数组
let parentStack = [];
let navTipContent = document.getElementById("nav-tips-content");
let navTipContentFixTxt = document.getElementById("nav-tips-content-fixed");

function createBookmarkElements(bookmarks, parentId, parentBookmark = null) {
  const parent = document.getElementById(parentId);
  parent.innerHTML = ""; // Clear the parent container
  // 创建一个用于folder的group
  let foldersGroup = document.createElement("div");
  foldersGroup.className = "foldersDiv";
  // 创建一个新的用于urls的group
  let urlsGroup = document.createElement("div");
  urlsGroup.className = "urlsDiv";
  let urlsGroupUl = document.createElement("ul"); // 创建用于urls的ul
  urlsGroupUl.className = "urlsUl";
  urlsGroup.appendChild(urlsGroupUl); // 将ul添加到urls的group
  if (parentBookmark) {
    parentStack.push(parentBookmark);
  }
  console.info('bookmarks:', bookmarks, typeof bookmarks);
  console.info('bookmarks.length:', bookmarks.length);
  console.info('bookmarks.isArray:', Array.isArray(bookmarks));
  if (Array.isArray(bookmarks)) {
    bookmarks.forEach((bookmark) => {
      if (bookmark.type === "folder") {
        // 对于folder, 创建div并添加到foldersGroup
        const div = document.createElement("div");
        div.className = "folder";
        div.textContent = bookmark.name;
        div.id = bookmark.guid;
        div.title = bookmark.name;
        // 💼
        div.addEventListener("click", () => {
          console.log(
            "bookmark.type:bookmark.name:",
            bookmark.type + ":" + bookmark.name
          );
          navTipContent.textContent = navTipContent.textContent + "💼" + bookmark.name;
          navTipContentFixTxt.textContent = "current:";
          createBookmarkElements(bookmark.children, parentId, bookmark);
        });
        foldersGroup.appendChild(div);
      }
      else if (bookmark.type === "url") {
        // 对于url, 创建a标签并包装到li标签中
        const li = document.createElement("li");
        li.className = "urlsLi";
        // // 创建一个 img 标签 用于显示图标 favicon.ico
        // const img = document.createElement("img");
        // // 地址是 url 后的第一个 / 加上 favicon.ico 作为图片地址
        // img.src = "http" + "://" + +bookmark.url.split("/")[2] + "/favicon.ico";
        // img.title = bookmark.name + "👉" + bookmark.url;
        // img.className = "custom-zch-favicon";
        // 创建一个p标签用于显示书签名称
        const p = document.createElement("span");
        p.textContent = bookmark.name;
        p.className = "name";
        // 创建一个 a 标签 用于显示书签名称和链接
        const a: HTMLAnchorElement = document.createElement("a");
        a.href = bookmark.url;
        // a.textContent = bookmark.name
        a.textContent = "🔗"+bookmark.name;
        a.title = bookmark.name + "👉" + bookmark.url;
        a.className = "link";
        a.id = bookmark.guid;
        a.target = "_blank";
        a.addEventListener("click", () => {
          navTipContent.textContent = navTipContent.textContent + "🔗" + bookmark.name;
          navTipContentFixTxt.textContent = "current:";
        });
        // a.appendChild(img); // 将img元素添加到li里
        li.appendChild(a); // 将a元素添加到li里
        // li.appendChild(p); // 将p元素添加到li里
        urlsGroupUl.appendChild(li); // 将li元素添加到urlsGroupUl里
      }
    });
  }
  else {
    let bookmark = bookmarks;
    if (bookmark.type === "folder") {
      // 对于folder, 创建div并添加到foldersGroup
      const div = document.createElement("div");
      div.className = "folder";
      div.textContent = bookmark.name;
      div.id = bookmark.guid;
      div.title = bookmark.name;
      // 💼
      div.addEventListener("click", () => {
        console.log(
          "bookmark.type:bookmark.name:",
          bookmark.type + ":" + bookmark.name
        );
        navTipContent.textContent = navTipContent.textContent + "💼" + bookmark.name;
        navTipContentFixTxt.textContent = "current:";
        createBookmarkElements(bookmark.children, parentId, bookmark);
      });
      foldersGroup.appendChild(div);
    }
    else if (bookmark.type === "url") {
      // 对于url, 创建a标签并包装到li标签中
      const li = document.createElement("li");
      li.className = "urlsLi";
      // // 创建一个 img 标签 用于显示图标 favicon.ico
      // const img = document.createElement("img");
      // // 地址是 url 后的第一个 / 加上 favicon.ico 作为图片地址
      // img.src = "http" + "://" + +bookmark.url.split("/")[2] + "/favicon.ico";
      // img.title = bookmark.name + "👉" + bookmark.url;
      // img.className = "custom-zch-favicon";
      // 创建一个p标签用于显示书签名称
      const p = document.createElement("span");
      p.textContent = bookmark.name;
      p.className = "name";
      // 创建一个 a 标签 用于显示书签名称和链接
      const a = document.createElement("a");
      a.href = bookmark.url;
      // a.textContent = bookmark.name
      a.textContent = "🔗"+bookmark.name;
      a.title = bookmark.name + "👉" + bookmark.url;
      a.className = "link";
      a.id = bookmark.guid;
      a.target = "_blank";
      a.addEventListener("click", () => {
        navTipContent.textContent = navTipContent.textContent + "🔗" + bookmark.name;
        navTipContentFixTxt.textContent = "current:";
      });
      // a.appendChild(img); // 将img元素添加到li里
      li.appendChild(a); // 将a元素添加到li里
      // li.appendChild(p); // 将p元素添加到li里
      urlsGroupUl.appendChild(li); // 将li元素添加到urlsGroupUl里
    }
  }

  // 如果foldersGroup有子节点，则将其添加到父级容器
  if (foldersGroup.hasChildNodes()) {
    parent.appendChild(foldersGroup);
  }
  // 如果urlsGroupUl有子节点，则将urlsGroup添加到父级容器
  if (urlsGroupUl.hasChildNodes()) {
    parent.appendChild(urlsGroup);
  }
}

function goBack(parentId) {
  // 确保有多于一个历史记录才能后退
  if (parentStack.length > 1) {
    parentStack.pop(); // 弹出当前目录
    const parentBookmark = parentStack[parentStack.length - 1];
    let currentBookMarkType = parentStack[1]?.type;
    if (currentBookMarkType === "folder") {
      navTipContent.textContent = "💼" + parentStack[1]?.name;
      navTipContentFixTxt.textContent = "current:";
    }
    else if (currentBookMarkType === "url") {
      navTipContent.textContent = "🔗" + parentStack[1]?.name;
      navTipContentFixTxt.textContent = "current:";
    }
    else {
      navTipContent.textContent = "";
      navTipContentFixTxt.textContent = "";
    }
    createBookmarkElements(parentBookmark.children, parentId, null);
  }
  else {
    // 在根目录时的处理
    alert("we are here at the root🤚✋🤙💅👐🙌🤲🤞✌🖖");
  }
}

function loadBookmarkData(loadJsonData) {
  console.log("loadJsonData:", loadJsonData);
  const dataFile = "./data/json/Bookmarks.json";
  fetch(dataFile)
    .then((response) => response.json())
    .then((data) => {
      let data1 = data.roots.bookmark_bar;
      console.log("data1:", data1);
      let data2 = data1.children;
      console.log("data2-1:", data2);
      if (loadJsonData && loadJsonData !== 'all') {
        // const [key, value] of Object.entries(data2)
        // for (const [key, value] of Object.entries(data2)) {
        //   console.info("key:", key, "value:", value);
        // }
        // const data2Element of data2
        for (const data2Element of data2) {
          if (data2Element.name === loadJsonData) {
            console.info("data2Element:", data2Element);
            data2 = data2Element.children;
          }
        }
      }
      const parentId = "container";
      console.log("data2-2:", data2);
      createBookmarkElements(data2, parentId, data1);
      navTipContent.textContent = "";
      navTipContentFixTxt.textContent = "";
    });
}

/**
 * // 转换主域名 有些地址的域名不是主域名
 * 例如 http://zghnzch.gitee.io/favicon.ico 需要转换为 http://www.gitee.io/favicon.ico
 * let mainDomainIcoUrl = "http" + "://" + bookmark.url.split("/")[2] + "/favicon.ico";
 * @param url
 * @returns {*|string}
 */
function convertToMainDomain(url) {
  try {
    // 创建一个新的URL对象，它提供了用于读取和修改URL组件的方法
    const parsedUrl = new URL(url);
    // 获取hostname (不包括subdomain)
    let hostname = parsedUrl.hostname;
    // 分割hostname为各个部分
    const parts = hostname.split(".");
    // 如果hostname包含子域名
    if (parts.length > 2) {
      // 移除子域名，保留后两部分（通常是主域名和顶级域名）
      hostname = parts.slice(-2).join(".");
    }
    // 构造新的URL，替换为www作为子域名
    parsedUrl.hostname = "www." + hostname;
    // 返回修改后的URL字符串
    return parsedUrl.href;
  }
  catch (error) {
    console.error("Error converting domain:", error);
    return url; // 发生错误时，返回原始URL
  }
}
