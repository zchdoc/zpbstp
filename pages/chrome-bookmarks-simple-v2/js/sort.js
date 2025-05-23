// 排序模块 - 使用全局函数

// 排序选项
window.sortOptions = {
  method: "date", // 排序方法：date(添加时间), name(名称), url(链接), visits(访问次数)
  order: "desc"   // 排序顺序：desc(降序), asc(升序)
};

// 渲染排序面板
function renderSortPanel() {
  const sidebarContent = document.getElementById("sidebar-content");
  sidebarContent.innerHTML = "";

  // 创建排序面板容器
  const sortPanel = document.createElement("div");
  sortPanel.className = "sort-panel";

  // 创建排序方法选择器
  const methodContainer = document.createElement("div");
  methodContainer.className = "sort-section";

  const methodTitle = document.createElement("h3");
  methodTitle.textContent = "排序方式";
  methodContainer.appendChild(methodTitle);

  const methodOptions = [
    { value: "date", label: "添加时间" },
    { value: "name", label: "名称" },
    { value: "url", label: "链接地址" }
  ];

  methodOptions.forEach(option => {
    const methodOption = document.createElement("div");
    methodOption.className = "sort-option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "sort-method";
    radio.value = option.value;
    radio.id = `sort-method-${option.value}`;
    radio.checked = window.sortOptions.method === option.value;

    radio.addEventListener("change", () => {
      if (radio.checked) {
        window.sortOptions.method = option.value;
        applySorting();
      }
    });

    const label = document.createElement("label");
    label.htmlFor = `sort-method-${option.value}`;
    label.textContent = option.label;

    methodOption.appendChild(radio);
    methodOption.appendChild(label);
    methodContainer.appendChild(methodOption);
  });

  sortPanel.appendChild(methodContainer);

  // 创建排序顺序选择器
  const orderContainer = document.createElement("div");
  orderContainer.className = "sort-section";

  const orderTitle = document.createElement("h3");
  orderTitle.textContent = "排序顺序";
  orderContainer.appendChild(orderTitle);

  const orderOptions = [
    { value: "desc", label: "降序 (新→旧/Z→A)" },
    { value: "asc", label: "升序 (旧→新/A→Z)" }
  ];

  orderOptions.forEach(option => {
    const orderOption = document.createElement("div");
    orderOption.className = "sort-option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "sort-order";
    radio.value = option.value;
    radio.id = `sort-order-${option.value}`;
    radio.checked = window.sortOptions.order === option.value;

    radio.addEventListener("change", () => {
      if (radio.checked) {
        window.sortOptions.order = option.value;
        applySorting();
      }
    });

    const label = document.createElement("label");
    label.htmlFor = `sort-order-${option.value}`;
    label.textContent = option.label;

    orderOption.appendChild(radio);
    orderOption.appendChild(label);
    orderContainer.appendChild(orderOption);
  });

  sortPanel.appendChild(orderContainer);

  // 添加应用按钮
  const applyButton = document.createElement("button");
  applyButton.className = "sort-apply-btn";
  applyButton.textContent = "应用排序";
  applyButton.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation(); // 阻止事件冒泡
    console.log("应用排序按钮被点击");
    applySorting();
  });

  // 添加鼠标悬停事件处理
  applyButton.addEventListener("mouseenter", function() {
    console.log("鼠标进入应用排序按钮");
    // 确保按钮在鼠标悬停时不会消失
    this.style.opacity = "1";
    this.style.visibility = "visible";
  });

  // 创建一个包装容器，确保按钮不会被其他元素的事件影响
  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "sort-button-wrapper";
  buttonWrapper.appendChild(applyButton);

  sortPanel.appendChild(buttonWrapper);

  sidebarContent.appendChild(sortPanel);
}

// 应用排序
function applySorting() {
  try {
    console.log(`应用排序: 方法=${window.sortOptions.method}, 顺序=${window.sortOptions.order}`);

    // 获取所有书签项目
    const allBookmarks = getAllBookmarks();
    console.log(`找到 ${allBookmarks.length} 个书签项目用于排序`);

    // 应用排序
    const sortedItems = sortBookmarkItems(allBookmarks);

    // 切换到排序标签页
    window.currentRootFolder = "sort";
    window.currentPath = [];

    // 渲染排序结果到主内容区域
    renderSortedContent(sortedItems);

    // 显示成功消息
    console.log("排序应用成功！");

    // 确保按钮保持可见
    const applyButton = document.querySelector('.sort-apply-btn');
    if (applyButton) {
      applyButton.style.opacity = "1";
      applyButton.style.visibility = "visible";
    }
  } catch (error) {
    console.error("应用排序时出错:", error);
    // 显示错误消息
    const bookmarkContent = document.getElementById("bookmark-content");
    if (bookmarkContent) {
      bookmarkContent.innerHTML = `<p class='error'>应用排序时出错: ${error.message}</p>`;
    }
  }
}

// 获取所有书签项目（包括文件夹和URL）
function getAllBookmarks() {
  const allItems = [];

  // 递归函数，用于遍历书签树
  function traverseBookmarks(items) {
    if (!items || !Array.isArray(items)) return;

    items.forEach(item => {
      // 添加当前项目
      allItems.push(item);

      // 如果是文件夹，递归遍历其子项
      if (item.children) {
        traverseBookmarks(item.children);
      }
    });
  }

  // 遍历所有根文件夹
  ["bookmark_bar", "other", "synced"].forEach(rootKey => {
    if (window.bookmarksData &&
        window.bookmarksData.roots &&
        window.bookmarksData.roots[rootKey] &&
        window.bookmarksData.roots[rootKey].children) {
      traverseBookmarks(window.bookmarksData.roots[rootKey].children);
    }
  });

  return allItems;
}

// 渲染排序后的内容
function renderSortedContent(items) {
  const bookmarkContent = document.getElementById("bookmark-content");
  bookmarkContent.innerHTML = "";

  // 创建视图切换控件
  createViewToggle(bookmarkContent);

  // 创建排序结果容器
  const sortResultContainer = document.createElement("div");
  sortResultContainer.className = "sort-result-container";

  // 添加排序结果标题
  const sortResultTitle = document.createElement("h2");
  sortResultTitle.className = "sort-result-title";
  sortResultTitle.textContent = `排序结果 (${items.length} 个项目)`;
  sortResultContainer.appendChild(sortResultTitle);

  // 添加排序方式说明
  const sortMethodInfo = document.createElement("div");
  sortMethodInfo.className = "sort-method-info";
  const methodName = window.sortOptions.method === "date" ? "添加时间" :
                    window.sortOptions.method === "name" ? "名称" : "链接地址";
  const orderName = window.sortOptions.order === "desc" ? "降序" : "升序";
  sortMethodInfo.textContent = `排序方式: ${methodName}, 顺序: ${orderName}`;
  sortResultContainer.appendChild(sortMethodInfo);

  // 创建瀑布流容器
  const waterfallContainer = document.createElement("div");
  waterfallContainer.className = "waterfall-container";
  sortResultContainer.appendChild(waterfallContainer);

  // 渲染排序后的项目
  if (items && items.length > 0) {
    renderBookmarkItems(items, waterfallContainer);
  } else {
    waterfallContainer.innerHTML = "<p>没有找到书签内容</p>";
  }

  bookmarkContent.appendChild(sortResultContainer);
}

// 对书签项目进行排序
function sortBookmarkItems(items) {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return items;
  }

  // 创建副本以避免修改原始数据
  const sortedItems = [...items];

  sortedItems.sort((a, b) => {
    let comparison = 0;

    // 根据排序方法比较
    switch (window.sortOptions.method) {
      case "date":
        // 使用Chrome的添加时间戳进行比较
        comparison = (a.date_added || 0) - (b.date_added || 0);
        break;
      case "name":
        // 按名称字母顺序比较
        comparison = (a.name || "").localeCompare(b.name || "");
        break;
      case "url":
        // 按URL比较
        comparison = (a.url || "").localeCompare(b.url || "");
        break;
      default:
        comparison = 0;
    }

    // 应用排序顺序
    return window.sortOptions.order === "asc" ? comparison : -comparison;
  });

  return sortedItems;
}

// 导出为全局函数
window.renderSortPanel = renderSortPanel;
window.sortBookmarkItems = sortBookmarkItems;
window.applySorting = applySorting;
window.getAllBookmarks = getAllBookmarks;
window.renderSortedContent = renderSortedContent;