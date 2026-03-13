/****************************************************
 * Rana's Pav Bhaji Junction - Final POS System
 * HTML + CSS + JS + localStorage
 * - Mobile hamburger sidebar
 * - Sample real image links
 * - Custom item add with image
 * - Table full protection
 ****************************************************/

window.addEventListener("load", function () {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("hide");
  }, 1200);
});


const STORAGE_KEYS = {
  ORDERS: "rana_pos_running_orders",
  BILLS: "rana_pos_completed_bills",
  TABLES: "rana_pos_table_status",
  BILL_COUNTER: "rana_pos_bill_counter",
  CUSTOM_MENU: "rana_pos_custom_menu",
  BRANDING: "rana_pos_branding"
};

const DEFAULT_TABLES = [
  { id: "Table 1", status: "Available" },
  { id: "Table 2", status: "Available" },
  { id: "Table 3", status: "Available" },
  { id: "Table 4", status: "Available" },
  { id: "Table 5", status: "Available" },
  { id: "Table 6", status: "Available" },
  { id: "Parcel", status: "Available" }
];

/*
  SAMPLE PUBLIC IMAGE LINKS
  Tame aa badha links ne tamara own links sathe replace pan kari shako.
*/
const BASE_MENU_ITEMS = [
  // Bhaji
  {
    id: 1,
    name: "Regular Bhaji",
    category: "Bhaji Items",
    price: 100,
    image: "https://imgs.search.brave.com/7leLpfqY49Slg1r0dX_S_8ggPwPQqKGfwMsrnioFJZE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQz/ODg2NzU3Mi9waG90/by9wYXYtYmhhamkt/aXMtYS1mYXN0LWZv/b2QtZGlzaC1mcm9t/LWluZGlhLWNvbnNp/c3Rpbmctb2YtYS10/aGljay12ZWdldGFi/bGUtY3Vycnktc2Vy/dmVkLXdpdGguanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPXZN/RDFZV1RxN3RmNWlH/dFVBYTRJcXNmR1kt/UWpETFczaWkwT2Rp/WldIdWM9"
  },
  {
    id: 2,
    name: "Green Bhaji",
    category: "Bhaji Items",
    price: 110,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Indian%20Pav%20Bhaji.jpg"
  },
  {
    id: 3,
    name: "Regular Butter Bhaji",
    category: "Bhaji Items",
    price: 120,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Home%20made%20Pav%20Bhaji.jpg"
  },
  {
    id: 4,
    name: "Green Butter Bhaji",
    category: "Bhaji Items",
    price: 130,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Pav%20bhaji%20from%20Mumbai.JPG"
  },
  {
    id: 5,
    name: "Jain Regular Bhaji",
    category: "Bhaji Items",
    price: 100,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Pav%20bhaji.jpg"
  },
  {
    id: 6,
    name: "Jain Green Bhaji",
    category: "Bhaji Items",
    price: 110,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Indian%20Pav%20Bhaji.jpg"
  },
  {
    id: 7,
    name: "Jain Regular Butter Bhaji",
    category: "Bhaji Items",
    price: 120,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Home%20made%20Pav%20Bhaji.jpg"
  },
  {
    id: 8,
    name: "Jain Green Butter Bhaji",
    category: "Bhaji Items",
    price: 130,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Pav%20bhaji%20from%20Mumbai.JPG"
  },

  // Gotala
  {
    id: 9,
    name: "Regular Gotala",
    category: "Gotala Items",
    price: 150,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Home%20made%20Pav%20Bhaji.jpg"
  },
  {
    id: 10,
    name: "Green Gotala",
    category: "Gotala Items",
    price: 160,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Indian%20Pav%20Bhaji.jpg"
  },
  {
    id: 11,
    name: "Regular Butter Gotala",
    category: "Gotala Items",
    price: 170,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Pav%20bhaji%20from%20Mumbai.JPG"
  },
  {
    id: 12,
    name: "Green Butter Gotala",
    category: "Gotala Items",
    price: 180,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Pav%20bhaji.jpg"
  },
  {
    id: 13,
    name: "Jain Regular Gotala",
    category: "Gotala Items",
    price: 150,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Home%20made%20Pav%20Bhaji.jpg"
  },
  {
    id: 14,
    name: "Jain Green Gotala",
    category: "Gotala Items",
    price: 160,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Indian%20Pav%20Bhaji.jpg"
  },
  {
    id: 15,
    name: "Jain Regular Butter Gotala",
    category: "Gotala Items",
    price: 170,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Pav%20bhaji%20from%20Mumbai.JPG"
  },
  {
    id: 16,
    name: "Jain Green Butter Gotala",
    category: "Gotala Items",
    price: 180,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Pav%20bhaji.jpg"
  },

  // Pulav
  {
    id: 17,
    name: "Veg Pulav",
    category: "Pulav Items",
    price: 100,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Veg%20Rice%20Pulao.jpg"
  },
  {
    id: 18,
    name: "Butter Pulav",
    category: "Pulav Items",
    price: 120,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Vegetable%20pulao.JPG"
  },
  {
    id: 19,
    name: "Cheese Pulav",
    category: "Pulav Items",
    price: 140,
    image: "https://imgs.search.brave.com/3vcTQDya2WccAb8XUGV_Hf9cYwmh4IpJ_mB_7sWhNsg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTYv/NTg1Lzg0MS9zbWFs/bC9rYXNobWlyaS1z/d2VldC1tb2R1ci1w/dWxhby1tYWRlLW9m/LXJpY2UtY29va2Vk/LXdpdGgtc3VnYXIt/d2F0ZXItZmxhdm9y/ZWQtd2l0aC1zYWZm/cm9uLWFuZC1kcnkt/ZnJ1aXRzLWZyZWUt/cGhvdG8uanBn"
  },
  {
    id: 20,
    name: "Paneer Pulav",
    category: "Pulav Items",
    price: 160,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Indian%20Veg%20Pulao.jpg"
  },
  {
    id: 21,
    name: "Jain Pulav",
    category: "Pulav Items",
    price: 100,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Veg%20Rice%20Pulao.jpg"
  },

  // Cold Drinks
  {
    id: 22,
    name: "Water",
    category: "Cold Drinks",
    price: 20,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Glass-of-water.jpg"
  },
  {
    id: 23,
    name: "Masala Chaas",
    category: "Cold Drinks",
    price: 20,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Buttermilk%20-%20Home%20-%20Uttar%20Pradesh.jpg"
  },
  {
    id: 24,
    name: "Thums Up",
    category: "Cold Drinks",
    price: 20,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Thum%27s%20Up%20%2815124224444%29.jpg"
  },
  {
    id: 25,
    name: "Sprite",
    category: "Cold Drinks",
    price: 20,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Spritejf.JPG"
  },
  {
    id: 26,
    name: "Maaza",
    category: "Cold Drinks",
    price: 20,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Maaza%20bottles.jpg"
  },
  {
    id: 27,
    name: "Sosyo",
    category: "Cold Drinks",
    price: 20,
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cool%20drink.jpg"
  }
];

let appState = {
  baseMenu: [...BASE_MENU_ITEMS],
  customMenu: [],
  runningOrders: [],
  bills: [],
  tables: [],
  activeOrderId: null,
  menuSearch: "",
  selectedCategory: "All",
  tempQuantities: {},
  branding: {
    restaurantName: "Rana's Pav Bhaji Junction",
    logoUrl: "images/logo.png"
  }
};

/* ----------------------------
   DOM
---------------------------- */
const pageTitle = document.getElementById("pageTitle");
const liveDateTime = document.getElementById("liveDateTime");
const dashboardCards = document.getElementById("dashboardCards");
const recentBills = document.getElementById("recentBills");
const salesSummaryCards = document.getElementById("salesSummaryCards");

const categoryFilters = document.getElementById("categoryFilters");
const menuGrid = document.getElementById("menuGrid");
const menuSearch = document.getElementById("menuSearch");

const orderType = document.getElementById("orderType");
const tableSelect = document.getElementById("tableSelect");
const tableSelectWrap = document.getElementById("tableSelectWrap");
const tableAvailabilityNote = document.getElementById("tableAvailabilityNote");
const tableFullAlert = document.getElementById("tableFullAlert");
const discountInput = document.getElementById("discountInput");
const paymentMethod = document.getElementById("paymentMethod");

const activeOrdersTabs = document.getElementById("activeOrdersTabs");
const orderItemsBody = document.getElementById("orderItemsBody");
const subtotalValue = document.getElementById("subtotalValue");
const discountValue = document.getElementById("discountValue");
const finalTotalValue = document.getElementById("finalTotalValue");

const tablesGrid = document.getElementById("tablesGrid");
const fromTable = document.getElementById("fromTable");
const toTable = document.getElementById("toTable");

const billHistoryTable = document.getElementById("billHistoryTable");
const billSearch = document.getElementById("billSearch");
const billDateFilter = document.getElementById("billDateFilter");

const reportStats = document.getElementById("reportStats");
const itemWiseSales = document.getElementById("itemWiseSales");
const categoryWiseSales = document.getElementById("categoryWiseSales");

const restaurantNameInput = document.getElementById("restaurantNameInput");
const logoUrlInput = document.getElementById("logoUrlInput");
const saveBrandBtn = document.getElementById("saveBrandBtn");
const sidebarLogo = document.getElementById("sidebarLogo");

const newItemName = document.getElementById("newItemName");
const newItemCategory = document.getElementById("newItemCategory");
const newItemPrice = document.getElementById("newItemPrice");
const newItemImage = document.getElementById("newItemImage");
const addNewItemBtn = document.getElementById("addNewItemBtn");
const customItemsTable = document.getElementById("customItemsTable");

const sidebar = document.getElementById("sidebar");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const closeSidebarBtn = document.getElementById("closeSidebarBtn");
const mobileOverlay = document.getElementById("mobileOverlay");

/* ----------------------------
   HELPERS
---------------------------- */
function getAllMenuItems() {
  return [...appState.baseMenu, ...appState.customMenu];
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(appState.runningOrders));
  localStorage.setItem(STORAGE_KEYS.BILLS, JSON.stringify(appState.bills));
  localStorage.setItem(STORAGE_KEYS.TABLES, JSON.stringify(appState.tables));
  localStorage.setItem(STORAGE_KEYS.CUSTOM_MENU, JSON.stringify(appState.customMenu));
  localStorage.setItem(STORAGE_KEYS.BRANDING, JSON.stringify(appState.branding));
}

function loadFromStorage() {
  appState.runningOrders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
  appState.bills = JSON.parse(localStorage.getItem(STORAGE_KEYS.BILLS)) || [];
  appState.tables = JSON.parse(localStorage.getItem(STORAGE_KEYS.TABLES)) || [...DEFAULT_TABLES];
  appState.customMenu = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_MENU)) || [];
  appState.branding = JSON.parse(localStorage.getItem(STORAGE_KEYS.BRANDING)) || appState.branding;

  if (!localStorage.getItem(STORAGE_KEYS.BILL_COUNTER)) {
    localStorage.setItem(STORAGE_KEYS.BILL_COUNTER, "1000");
  }
}

function formatCurrency(amount) {
  return `₹${Number(amount).toFixed(0)}`;
}

function getTodayDateString() {
  return new Date().toISOString().split("T")[0];
}

function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

function generateBillNumber() {
  let current = Number(localStorage.getItem(STORAGE_KEYS.BILL_COUNTER) || "1000");
  current += 1;
  localStorage.setItem(STORAGE_KEYS.BILL_COUNTER, String(current));
  return `RBJ-${current}`;
}

function getCategories() {
  return ["All", ...new Set(getAllMenuItems().map(item => item.category))];
}

function getOrderById(orderId) {
  return appState.runningOrders.find(order => order.id === orderId);
}

function getActiveOrder() {
  return getOrderById(appState.activeOrderId);
}

function calculateOrderSubtotal(order) {
  if (!order || !order.items) return 0;
  return order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function calculateOrderFinalTotal(order) {
  const subtotal = calculateOrderSubtotal(order);
  const discount = Number(order.discount || 0);
  return Math.max(subtotal - discount, 0);
}

function todayBills() {
  const today = getTodayDateString();
  return appState.bills.filter(bill => bill.date.startsWith(today));
}

function todaySales() {
  return todayBills().reduce((sum, bill) => sum + bill.finalTotal, 0);
}

function todayOrdersCount() {
  return todayBills().length;
}

function runningOrdersCount() {
  return appState.runningOrders.length;
}

function completedOrdersToday() {
  return todayBills().length;
}

function getAvailableDiningTables() {
  return appState.tables.filter(t => t.id !== "Parcel" && t.status === "Available");
}

function availableTablesCount() {
  return getAvailableDiningTables().length;
}

function occupiedTablesCount() {
  return appState.tables.filter(t => t.id !== "Parcel" && t.status === "Occupied").length;
}

function getMostSoldItemFromBills(bills) {
  const itemCount = {};
  bills.forEach(bill => {
    bill.items.forEach(item => {
      itemCount[item.name] = (itemCount[item.name] || 0) + item.quantity;
    });
  });

  let topItem = "N/A";
  let maxQty = 0;

  Object.entries(itemCount).forEach(([name, qty]) => {
    if (qty > maxQty) {
      maxQty = qty;
      topItem = name;
    }
  });

  return topItem;
}

function syncTablesWithOrders() {
  appState.tables.forEach(table => {
    if (table.id === "Parcel") {
      const hasParcelOrder = appState.runningOrders.some(
        order => order.orderType === "Parcel" && order.status === "Running"
      );
      table.status = hasParcelOrder ? "Occupied" : "Available";
    } else {
      const hasOrder = appState.runningOrders.some(
        order =>
          order.orderType === "Table" &&
          order.table === table.id &&
          order.status === "Running"
      );
      table.status = hasOrder ? "Occupied" : "Available";
    }
  });

  saveToStorage();
}

function applyBranding() {
  document.title = `${appState.branding.restaurantName} - POS System`;
  sidebarLogo.src = appState.branding.logoUrl || "images/logo.png";
  document.querySelector(".brand-text h1").textContent = appState.branding.restaurantName;
  restaurantNameInput.value = appState.branding.restaurantName;
  logoUrlInput.value = appState.branding.logoUrl;
}

/* ----------------------------
   MOBILE SIDEBAR
---------------------------- */
function openSidebar() {
  if (window.innerWidth <= 900) {
    sidebar.classList.add("show");
    mobileOverlay.classList.add("show");
    document.body.style.overflow = "hidden";
  }
}

function closeSidebar() {
  sidebar.classList.remove("show");
  mobileOverlay.classList.remove("show");
  document.body.style.overflow = "";
}

/* ----------------------------
   FALLBACK IMAGE
---------------------------- */
function getFallbackGradient(category) {
  if (category === "Bhaji Items") return ["#7a1324", "#e0ac51"];
  if (category === "Gotala Items") return ["#5d0f1f", "#d9963c"];
  if (category === "Pulav Items") return ["#8a311f", "#d1b36c"];
  if (category === "Cold Drinks") return ["#295670", "#79c6fb"];
  return ["#5d0e1a", "#d9a441"];
}

function getCategoryEmoji(category) {
  if (category === "Bhaji Items") return "🍛";
  if (category === "Gotala Items") return "🍲";
  if (category === "Pulav Items") return "🍚";
  if (category === "Cold Drinks") return "🥤";
  return "🍽️";
}

function generateFallbackImage(item) {
  const [c1, c2] = getFallbackGradient(item.category);
  const icon = getCategoryEmoji(item.category);

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="${c1}" />
        <stop offset="100%" stop-color="${c2}" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)" />
    <circle cx="300" cy="180" r="90" fill="rgba(255,255,255,0.18)" />
    <text x="300" y="205" text-anchor="middle" font-size="78">${icon}</text>
    <rect x="35" y="300" width="530" height="60" rx="14" fill="rgba(0,0,0,0.18)" />
    <text x="300" y="338" text-anchor="middle" font-family="Poppins, Arial" font-size="24" font-weight="700" fill="white">${item.name}</text>
  </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getItemImage(item) {
  return item.image && item.image.trim() !== "" ? item.image : generateFallbackImage(item);
}

/* ----------------------------
   NAVIGATION
---------------------------- */
function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".content-section");

  navLinks.forEach(btn => {
    btn.addEventListener("click", () => {
      navLinks.forEach(link => link.classList.remove("active"));
      btn.classList.add("active");

      const sectionId = btn.dataset.section;
      sections.forEach(sec => sec.classList.remove("active"));
      document.getElementById(sectionId).classList.add("active");
      pageTitle.textContent = btn.textContent;

      closeSidebar();
    });
  });
}

/* ----------------------------
   DASHBOARD
---------------------------- */
function renderDashboard() {
  const todayBillsData = todayBills();
  const cards = [
    { label: "Today Total Sales", value: formatCurrency(todaySales()) },
    { label: "Total Orders Today", value: todayOrdersCount() },
    { label: "Running Orders", value: runningOrdersCount() },
    { label: "Completed Orders", value: completedOrdersToday() },
    { label: "Most Sold Item", value: getMostSoldItemFromBills(todayBillsData) },
    { label: "Available Tables", value: availableTablesCount() },
    { label: "Occupied Tables", value: occupiedTablesCount() },
    { label: "Dining Status", value: availableTablesCount() === 0 ? "Full" : "Open" }
  ];

  dashboardCards.innerHTML = cards.map(card => `
    <div class="stat-card">
      <p>${card.label}</p>
      <h3>${card.value}</h3>
    </div>
  `).join("");

  const recent = [...appState.bills].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

  if (!recent.length) {
    recentBills.innerHTML = `<p class="muted">No bills generated yet.</p>`;
  } else {
    recentBills.innerHTML = `
      <table class="data-table">
        <thead>
          <tr>
            <th>Bill No.</th>
            <th>Date</th>
            <th>Table/Parcel</th>
            <th>Total</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          ${recent.map(bill => `
            <tr>
              <td>${bill.billNumber}</td>
              <td>${formatDateTime(bill.date)}</td>
              <td>${bill.tableOrParcel}</td>
              <td>${formatCurrency(bill.finalTotal)}</td>
              <td>${bill.paymentMethod}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  const summaryCards = [
    {
      title: "Average Bill Today",
      value: todayBillsData.length ? formatCurrency(todaySales() / todayBillsData.length) : "₹0"
    },
    {
      title: "Total Bills Saved",
      value: appState.bills.length
    },
    {
      title: "Parcel Orders Running",
      value: appState.runningOrders.filter(o => o.orderType === "Parcel").length
    },
    {
      title: "Total Menu Items",
      value: getAllMenuItems().length
    }
  ];

  salesSummaryCards.innerHTML = summaryCards.map(card => `
    <div class="summary-mini-card">
      <h4>${card.title}</h4>
      <p>${card.value}</p>
    </div>
  `).join("");
}

/* ----------------------------
   MENU
---------------------------- */
function renderCategoryFilters() {
  const categories = getCategories();

  categoryFilters.innerHTML = categories.map(cat => `
    <button class="filter-btn ${appState.selectedCategory === cat ? "active" : ""}" data-category="${cat}">
      ${cat}
    </button>
  `).join("");

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      appState.selectedCategory = btn.dataset.category;
      renderCategoryFilters();
      renderMenu();
    });
  });
}

function getFilteredMenuItems() {
  return getAllMenuItems().filter(item => {
    const matchesCategory = appState.selectedCategory === "All" || item.category === appState.selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(appState.menuSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

function renderMenu() {
  const items = getFilteredMenuItems();

  if (!items.length) {
    menuGrid.innerHTML = `<p class="muted">No menu items found.</p>`;
    return;
  }

  menuGrid.innerHTML = items.map(item => {
    const qty = appState.tempQuantities[item.id] || 1;

    return `
      <div class="menu-card">
        <div class="menu-image" style="background-image:url('${getItemImage(item)}')"></div>
        <div class="menu-content">
          <div class="menu-category">${item.category}</div>
          <div class="menu-title">${item.name}</div>
          <div class="menu-price">${formatCurrency(item.price)}</div>

          <div class="qty-control">
            <button class="qty-btn" onclick="changeTempQty(${item.id}, -1)">-</button>
            <span class="qty-value">${qty}</span>
            <button class="qty-btn" onclick="changeTempQty(${item.id}, 1)">+</button>
          </div>

          <button class="btn btn-primary" onclick="addItemToActiveOrder(${item.id})">
            Add to Order
          </button>
        </div>
      </div>
    `;
  }).join("");
}

window.changeTempQty = function(itemId, delta) {
  const current = appState.tempQuantities[itemId] || 1;
  const next = Math.max(1, current + delta);
  appState.tempQuantities[itemId] = next;
  renderMenu();
};

window.addItemToActiveOrder = function(itemId) {
  const order = getActiveOrder();

  if (!order) {
    alert("Please start or select an order first.");
    return;
  }

  const menuItem = getAllMenuItems().find(item => item.id === itemId);
  if (!menuItem) return;

  const qtyToAdd = appState.tempQuantities[itemId] || 1;
  const existing = order.items.find(i => i.id === itemId);

  if (existing) {
    existing.quantity += qtyToAdd;
  } else {
    order.items.push({
      id: menuItem.id,
      name: menuItem.name,
      category: menuItem.category,
      price: menuItem.price,
      image: menuItem.image || "",
      quantity: qtyToAdd
    });
  }

  saveToStorage();
  renderAll();
};

/* ----------------------------
   TABLE SELECT
---------------------------- */
function getCurrentEditableTableOptions() {
  const activeOrder = getActiveOrder();
  const available = getAvailableDiningTables().map(t => t.id);

  if (
    activeOrder &&
    activeOrder.orderType === "Table" &&
    activeOrder.table &&
    !available.includes(activeOrder.table)
  ) {
    available.unshift(activeOrder.table);
  }

  return [...new Set(available)];
}

function renderTableSelectOptions() {
  const options = getCurrentEditableTableOptions();

  if (!options.length) {
    tableSelect.innerHTML = `<option value="">No table available</option>`;
    tableAvailabilityNote.textContent = "All 6 tables are occupied. Use Parcel or free a table.";
  } else {
    tableSelect.innerHTML = options.map(table => `
      <option value="${table}">${table}</option>
    `).join("");
    tableAvailabilityNote.textContent = `${getAvailableDiningTables().length} table(s) available for new dining order.`;
  }

  const allDiningTables = DEFAULT_TABLES.filter(t => t.id !== "Parcel").map(t => t.id);
  fromTable.innerHTML = `<option value="">Select Table</option>` + allDiningTables.map(table => `<option value="${table}">${table}</option>`).join("");
  toTable.innerHTML = `<option value="">Select Table</option>` + allDiningTables.map(table => `<option value="${table}">${table}</option>`).join("");

  if (getAvailableDiningTables().length === 0) {
    tableFullAlert.style.display = "block";
    tableFullAlert.textContent = "All 6 tables are full. New Table order cannot start until one table is free. You can open an occupied table, switch tables, complete payment, or create a Parcel order.";
  } else {
    tableFullAlert.style.display = "none";
  }
}

/* ----------------------------
   ORDER MANAGEMENT
---------------------------- */
function createOrder(orderTypeValue, tableValue) {
  const id = "order_" + Date.now();

  const newOrder = {
    id,
    orderType: orderTypeValue,
    table: orderTypeValue === "Table" ? tableValue : "Parcel",
    status: "Running",
    items: [],
    discount: 0,
    createdAt: new Date().toISOString(),
    paymentMethod: "Cash"
  };

  appState.runningOrders.push(newOrder);
  appState.activeOrderId = id;
  syncTablesWithOrders();
  saveToStorage();
  renderAll();
}

function startNewOrder() {
  const selectedOrderType = orderType.value;

  if (selectedOrderType === "Table") {
    const availableTables = getAvailableDiningTables();

    if (!availableTables.length) {
      alert(
        "Badha 6 table occupied che.\n\n" +
        "Tame aa kari shako cho:\n" +
        "1. Existing occupied table open karo\n" +
        "2. Parcel order banao\n" +
        "3. Payment complete kari ne table free karo\n" +
        "4. Switch table feature use karo"
      );
      return;
    }

    const selectedTable = tableSelect.value || availableTables[0].id;

    const existingTableOrder = appState.runningOrders.find(
      o => o.orderType === "Table" && o.table === selectedTable
    );

    if (existingTableOrder) {
      appState.activeOrderId = existingTableOrder.id;
      renderAll();
      alert(`${selectedTable} already has a running order. Switched to that order.`);
      return;
    }

    createOrder("Table", selectedTable);
    return;
  }

  const existingParcelOrder = appState.runningOrders.find(o => o.orderType === "Parcel");
  if (existingParcelOrder) {
    appState.activeOrderId = existingParcelOrder.id;
    renderAll();
    alert("Parcel order already running. Switched to parcel order.");
    return;
  }

  createOrder("Parcel", "Parcel");
}

function renderActiveOrderTabs() {
  if (!appState.runningOrders.length) {
    activeOrdersTabs.innerHTML = `<p class="muted">No running orders.</p>`;
    return;
  }

  activeOrdersTabs.innerHTML = appState.runningOrders.map(order => `
    <button class="order-tab ${appState.activeOrderId === order.id ? "active" : ""}" data-id="${order.id}">
      ${order.orderType === "Table" ? order.table : "Parcel"} · ${order.items.length} items
    </button>
  `).join("");

  document.querySelectorAll(".order-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      appState.activeOrderId = tab.dataset.id;
      renderAll();
    });
  });
}

function renderOrderPanel() {
  const order = getActiveOrder();
  renderTableSelectOptions();

  if (!order) {
    orderItemsBody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-state">Start or select an order to begin.</td>
      </tr>
    `;
    subtotalValue.textContent = "₹0";
    discountValue.textContent = "₹0";
    finalTotalValue.textContent = "₹0";
    discountInput.value = 0;
    paymentMethod.value = "Cash";

    if (orderType.value === "Parcel") {
      tableSelectWrap.style.display = "none";
    } else {
      tableSelectWrap.style.display = "flex";
    }
    return;
  }

  orderType.value = order.orderType;
  discountInput.value = order.discount || 0;
  paymentMethod.value = order.paymentMethod || "Cash";

  if (order.orderType === "Table") {
    tableSelectWrap.style.display = "flex";
    renderTableSelectOptions();
    if ([...tableSelect.options].some(opt => opt.value === order.table)) {
      tableSelect.value = order.table;
    }
  } else {
    tableSelectWrap.style.display = "none";
  }

  if (!order.items.length) {
    orderItemsBody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-state">No items added yet.</td>
      </tr>
    `;
  } else {
    orderItemsBody.innerHTML = order.items.map(item => `
      <tr>
        <td>${item.name}</td>
        <td>
          <div class="qty-inline">
            <button class="qty-btn" onclick="updateOrderItemQty('${order.id}', ${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="updateOrderItemQty('${order.id}', ${item.id}, 1)">+</button>
          </div>
        </td>
        <td>${formatCurrency(item.price)}</td>
        <td>${formatCurrency(item.price * item.quantity)}</td>
        <td>
          <button class="action-btn action-remove" onclick="removeOrderItem('${order.id}', ${item.id})">
            Remove
          </button>
        </td>
      </tr>
    `).join("");
  }

  const subtotal = calculateOrderSubtotal(order);
  const discount = Number(order.discount || 0);
  const finalTotal = calculateOrderFinalTotal(order);

  subtotalValue.textContent = formatCurrency(subtotal);
  discountValue.textContent = formatCurrency(discount);
  finalTotalValue.textContent = formatCurrency(finalTotal);
}

window.updateOrderItemQty = function(orderId, itemId, delta) {
  const order = getOrderById(orderId);
  if (!order) return;

  const item = order.items.find(i => i.id === itemId);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    order.items = order.items.filter(i => i.id !== itemId);
  }

  saveToStorage();
  renderAll();
};

window.removeOrderItem = function(orderId, itemId) {
  const order = getOrderById(orderId);
  if (!order) return;

  order.items = order.items.filter(i => i.id !== itemId);
  saveToStorage();
  renderAll();
};

function saveActiveOrder() {
  const order = getActiveOrder();
  if (!order) {
    alert("No active order selected.");
    return;
  }

  order.discount = Math.max(Number(discountInput.value || 0), 0);
  order.paymentMethod = paymentMethod.value;

  if (order.orderType === "Table") {
    const selectedTable = tableSelect.value;
    if (!selectedTable) {
      alert("No table available.");
      return;
    }

    const conflict = appState.runningOrders.find(
      o => o.id !== order.id && o.orderType === "Table" && o.table === selectedTable
    );

    if (conflict) {
      alert("Selected table is already occupied by another running order.");
      return;
    }

    order.table = selectedTable;
  }

  syncTablesWithOrders();
  saveToStorage();
  renderAll();
  alert("Order saved successfully.");
}

function holdActiveOrder() {
  const order = getActiveOrder();
  if (!order) {
    alert("No active order selected.");
    return;
  }

  order.discount = Math.max(Number(discountInput.value || 0), 0);
  order.paymentMethod = paymentMethod.value;

  saveToStorage();
  renderAll();
  alert("Order held successfully.");
}

function resumeOrder() {
  if (!appState.runningOrders.length) {
    alert("No running orders available.");
    return;
  }

  if (!appState.activeOrderId) {
    appState.activeOrderId = appState.runningOrders[0].id;
  }

  renderAll();
  alert("Order resumed.");
}

function cancelActiveOrder() {
  const order = getActiveOrder();
  if (!order) {
    alert("No active order selected.");
    return;
  }

  const confirmCancel = confirm("Are you sure you want to cancel this order?");
  if (!confirmCancel) return;

  appState.runningOrders = appState.runningOrders.filter(o => o.id !== order.id);

  if (appState.activeOrderId === order.id) {
    appState.activeOrderId = appState.runningOrders[0]?.id || null;
  }

  syncTablesWithOrders();
  saveToStorage();
  renderAll();
  alert("Order cancelled.");
}

function completePayment() {
  const order = getActiveOrder();
  if (!order) {
    alert("No active order selected.");
    return;
  }

  if (!order.items.length) {
    alert("Cannot complete payment for an empty order.");
    return;
  }

  order.discount = Math.max(Number(discountInput.value || 0), 0);
  order.paymentMethod = paymentMethod.value;

  const subtotal = calculateOrderSubtotal(order);
  const finalTotal = calculateOrderFinalTotal(order);

  const bill = {
    billNumber: generateBillNumber(),
    date: new Date().toISOString(),
    tableOrParcel: order.orderType === "Table" ? order.table : "Parcel",
    orderType: order.orderType,
    items: JSON.parse(JSON.stringify(order.items)),
    subtotal,
    discount: order.discount,
    finalTotal,
    paymentMethod: order.paymentMethod
  };

  appState.bills.push(bill);
  appState.runningOrders = appState.runningOrders.filter(o => o.id !== order.id);

  if (appState.activeOrderId === order.id) {
    appState.activeOrderId = appState.runningOrders[0]?.id || null;
  }

  syncTablesWithOrders();
  saveToStorage();
  renderAll();
  printBillData(bill);
}

function printBillForActiveOrder() {
  const order = getActiveOrder();
  if (!order) {
    alert("No active order selected.");
    return;
  }

  if (!order.items.length) {
    alert("No items in current order.");
    return;
  }

  order.discount = Math.max(Number(discountInput.value || 0), 0);
  order.paymentMethod = paymentMethod.value;

  const previewBill = {
    billNumber: "PREVIEW",
    date: new Date().toISOString(),
    tableOrParcel: order.orderType === "Table" ? order.table : "Parcel",
    items: order.items,
    subtotal: calculateOrderSubtotal(order),
    discount: order.discount,
    finalTotal: calculateOrderFinalTotal(order),
    paymentMethod: order.paymentMethod
  };

  printBillData(previewBill);
}

function printBillData(bill) {
  const rows = bill.items.map(item => `
    <tr>
      <td style="padding:6px 0;">${item.name}</td>
      <td style="padding:6px 0; text-align:center;">${item.quantity}</td>
      <td style="padding:6px 0; text-align:right;">₹${item.price}</td>
      <td style="padding:6px 0; text-align:right;">₹${item.price * item.quantity}</td>
    </tr>
  `).join("");

  const billWindow = window.open("", "_blank", "width=420,height=760");

  billWindow.document.write(`
    <html>
      <head>
        <title>${bill.billNumber}</title>
      </head>
      <body style="font-family:Arial,sans-serif; padding:20px; color:#222;">
        <div style="text-align:center; margin-bottom:20px;">
          <h2 style="margin:0;">${appState.branding.restaurantName}</h2>
          <p style="margin:6px 0;">Restaurant Bill</p>
        </div>

        <p><strong>Bill No:</strong> ${bill.billNumber}</p>
        <p><strong>Date & Time:</strong> ${formatDateTime(bill.date)}</p>
        <p><strong>Table/Parcel:</strong> ${bill.tableOrParcel}</p>
        <p><strong>Payment:</strong> ${bill.paymentMethod}</p>

        <table style="width:100%; border-collapse:collapse; margin-top:16px;">
          <thead>
            <tr>
              <th style="text-align:left; border-bottom:1px solid #ccc; padding-bottom:8px;">Item</th>
              <th style="text-align:center; border-bottom:1px solid #ccc; padding-bottom:8px;">Qty</th>
              <th style="text-align:right; border-bottom:1px solid #ccc; padding-bottom:8px;">Price</th>
              <th style="text-align:right; border-bottom:1px solid #ccc; padding-bottom:8px;">Total</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>

        <hr style="margin:16px 0;">
        <p><strong>Subtotal:</strong> ₹${bill.subtotal}</p>
        <p><strong>Discount:</strong> ₹${bill.discount}</p>
        <h3 style="margin-top:10px;">Final Total: ₹${bill.finalTotal}</h3>

        <p style="text-align:center; margin-top:30px;">Thank you! Visit again.</p>
      </body>
    </html>
  `);

  billWindow.document.close();
  billWindow.focus();
  billWindow.print();
}

/* ----------------------------
   TABLES
---------------------------- */
function renderTables() {
  syncTablesWithOrders();

  tablesGrid.innerHTML = appState.tables.map(table => {
    const order =
      table.id === "Parcel"
        ? appState.runningOrders.find(o => o.orderType === "Parcel")
        : appState.runningOrders.find(o => o.table === table.id);

    const total = order ? calculateOrderFinalTotal(order) : 0;

    return `
      <div class="table-card ${table.status.toLowerCase()}">
        <h4>${table.id}</h4>
        <div class="table-status">
          ${
            table.status === "Available"
              ? `<span class="badge badge-success">Available</span>`
              : `<span class="badge badge-warning">Occupied</span>`
          }
        </div>
        <div class="table-total">Current Total: ${formatCurrency(total)}</div>
        <button class="btn btn-primary btn-sm" onclick="openTableOrder('${table.id}')">
          Open ${table.id}
        </button>
      </div>
    `;
  }).join("");
}

window.openTableOrder = function(tableId) {
  if (tableId === "Parcel") {
    let parcelOrder = appState.runningOrders.find(o => o.orderType === "Parcel");
    if (!parcelOrder) {
      createOrder("Parcel", "Parcel");
    } else {
      appState.activeOrderId = parcelOrder.id;
      renderAll();
    }
    document.querySelector('[data-section="ordersSection"]').click();
    return;
  }

  let order = appState.runningOrders.find(o => o.orderType === "Table" && o.table === tableId);

  if (!order) {
    orderType.value = "Table";
    renderTableSelectOptions();

    if ([...tableSelect.options].some(opt => opt.value === tableId)) {
      tableSelect.value = tableId;
      createOrder("Table", tableId);
    } else {
      alert("This table is not available for new order right now.");
    }
  } else {
    appState.activeOrderId = order.id;
    renderAll();
  }

  document.querySelector('[data-section="ordersSection"]').click();
};

function switchOrderTable() {
  const from = fromTable.value;
  const to = toTable.value;

  if (!from || !to) {
    alert("Please select both source and destination tables.");
    return;
  }

  if (from === to) {
    alert("Source and destination tables cannot be same.");
    return;
  }

  const fromOrder = appState.runningOrders.find(
    o => o.orderType === "Table" && o.table === from
  );

  if (!fromOrder) {
    alert("No running order found on selected source table.");
    return;
  }

  const toHasOrder = appState.runningOrders.find(
    o => o.orderType === "Table" && o.table === to
  );

  if (toHasOrder) {
    alert("Destination table already has a running order.");
    return;
  }

  fromOrder.table = to;

  if (appState.activeOrderId === fromOrder.id) {
    tableSelect.value = to;
  }

  syncTablesWithOrders();
  saveToStorage();
  renderAll();
  alert(`Order switched from ${from} to ${to}.`);
}

/* ----------------------------
   BILL HISTORY
---------------------------- */
function renderBillHistory() {
  const searchValue = billSearch.value.trim().toLowerCase();
  const selectedDate = billDateFilter.value;

  let bills = [...appState.bills].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (searchValue) {
    bills = bills.filter(bill => bill.billNumber.toLowerCase().includes(searchValue));
  }

  if (selectedDate) {
    bills = bills.filter(bill => bill.date.startsWith(selectedDate));
  }

  if (!bills.length) {
    billHistoryTable.innerHTML = `<p class="muted">No matching bills found.</p>`;
    return;
  }

  billHistoryTable.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Bill No.</th>
          <th>Date</th>
          <th>Table/Parcel</th>
          <th>Total</th>
          <th>Payment</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${bills.map(bill => `
          <tr>
            <td>${bill.billNumber}</td>
            <td>${formatDateTime(bill.date)}</td>
            <td>${bill.tableOrParcel}</td>
            <td>${formatCurrency(bill.finalTotal)}</td>
            <td>${bill.paymentMethod}</td>
            <td>
              <button class="btn btn-secondary btn-sm" onclick="viewBillDetails('${bill.billNumber}')">View</button>
              <button class="btn btn-primary btn-sm" onclick="reprintBill('${bill.billNumber}')">Reprint</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

window.viewBillDetails = function(billNumber) {
  const bill = appState.bills.find(b => b.billNumber === billNumber);
  if (!bill) return;

  const itemsText = bill.items
    .map(item => `${item.name} × ${item.quantity} = ${formatCurrency(item.price * item.quantity)}`)
    .join("\n");

  alert(
    `Bill Number: ${bill.billNumber}\n` +
    `Date: ${formatDateTime(bill.date)}\n` +
    `Table/Parcel: ${bill.tableOrParcel}\n` +
    `Payment: ${bill.paymentMethod}\n\n` +
    `Items:\n${itemsText}\n\n` +
    `Subtotal: ${formatCurrency(bill.subtotal)}\n` +
    `Discount: ${formatCurrency(bill.discount)}\n` +
    `Final Total: ${formatCurrency(bill.finalTotal)}`
  );
};

window.reprintBill = function(billNumber) {
  const bill = appState.bills.find(b => b.billNumber === billNumber);
  if (!bill) return;
  printBillData(bill);
};

/* ----------------------------
   REPORTS
---------------------------- */
function renderReports() {
  const todayBillsData = todayBills();
  const mostSold = getMostSoldItemFromBills(todayBillsData);

  reportStats.innerHTML = `
    <div class="stat-card">
      <p>Today Sales</p>
      <h3>${formatCurrency(todaySales())}</h3>
    </div>
    <div class="stat-card">
      <p>Total Orders Today</p>
      <h3>${todayOrdersCount()}</h3>
    </div>
    <div class="stat-card">
      <p>Most Sold Item</p>
      <h3 style="font-size:18px">${mostSold}</h3>
    </div>
    <div class="stat-card">
      <p>Total Revenue Saved</p>
      <h3>${formatCurrency(appState.bills.reduce((sum, bill) => sum + bill.finalTotal, 0))}</h3>
    </div>
  `;

  const itemMap = {};
  appState.bills.forEach(bill => {
    bill.items.forEach(item => {
      if (!itemMap[item.name]) {
        itemMap[item.name] = { qty: 0, sales: 0 };
      }
      itemMap[item.name].qty += item.quantity;
      itemMap[item.name].sales += item.quantity * item.price;
    });
  });

  const itemEntries = Object.entries(itemMap).sort((a, b) => b[1].sales - a[1].sales);

  itemWiseSales.innerHTML = itemEntries.length
    ? `<div class="report-list">
        ${itemEntries.map(([name, data]) => `
          <div class="report-item">
            <div>
              <strong>${name}</strong>
              <p class="muted">Qty Sold: ${data.qty}</p>
            </div>
            <div class="text-right">
              <strong>${formatCurrency(data.sales)}</strong>
            </div>
          </div>
        `).join("")}
      </div>`
    : `<p class="muted">No item-wise sales available yet.</p>`;

  const categoryMap = {};
  appState.bills.forEach(bill => {
    bill.items.forEach(item => {
      if (!categoryMap[item.category]) {
        categoryMap[item.category] = { qty: 0, sales: 0 };
      }
      categoryMap[item.category].qty += item.quantity;
      categoryMap[item.category].sales += item.quantity * item.price;
    });
  });

  const categoryEntries = Object.entries(categoryMap).sort((a, b) => b[1].sales - a[1].sales);

  categoryWiseSales.innerHTML = categoryEntries.length
    ? `<div class="report-list">
        ${categoryEntries.map(([name, data]) => `
          <div class="report-item">
            <div>
              <strong>${name}</strong>
              <p class="muted">Qty Sold: ${data.qty}</p>
            </div>
            <div class="text-right">
              <strong>${formatCurrency(data.sales)}</strong>
            </div>
          </div>
        `).join("")}
      </div>`
    : `<p class="muted">No category-wise sales available yet.</p>`;
}

/* ----------------------------
   CUSTOM ITEMS
---------------------------- */
function renderCustomItemsTable() {
  if (!appState.customMenu.length) {
    customItemsTable.innerHTML = `<p class="muted">No custom items added yet.</p>`;
    return;
  }

  customItemsTable.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Item Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${appState.customMenu.map(item => `
          <tr>
            <td>
              <img src="${getItemImage(item)}" alt="${item.name}" style="width:60px;height:40px;object-fit:cover;border-radius:8px;">
            </td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${formatCurrency(item.price)}</td>
            <td>
              <button class="btn btn-danger btn-sm" onclick="deleteCustomItem(${item.id})">Delete</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

window.deleteCustomItem = function(itemId) {
  const itemUsed = appState.runningOrders.some(order =>
    order.items.some(orderItem => orderItem.id === itemId)
  );

  if (itemUsed) {
    alert("This custom item is currently used in a running order. Remove it from order first.");
    return;
  }

  appState.customMenu = appState.customMenu.filter(item => item.id !== itemId);
  saveToStorage();
  renderAll();
};

function addCustomItem() {
  const name = newItemName.value.trim();
  const category = newItemCategory.value;
  const price = Number(newItemPrice.value);
  const image = newItemImage.value.trim();

  if (!name) {
    alert("Please enter item name.");
    return;
  }

  if (!price || price <= 0) {
    alert("Please enter valid item price.");
    return;
  }

  const duplicate = getAllMenuItems().find(
    item => item.name.toLowerCase() === name.toLowerCase()
  );

  if (duplicate) {
    alert("Item with same name already exists.");
    return;
  }

  const nextId = Math.max(...getAllMenuItems().map(item => item.id), 0) + 1;

  appState.customMenu.push({
    id: nextId,
    name,
    category,
    price,
    image
  });

  newItemName.value = "";
  newItemPrice.value = "";
  newItemImage.value = "";
  newItemCategory.value = "Bhaji Items";

  saveToStorage();
  renderAll();
  alert("New item added successfully.");
}

/* ----------------------------
   CLOCK
---------------------------- */
function startClock() {
  function update() {
    liveDateTime.textContent = new Date().toLocaleString("en-IN", {
      dateStyle: "full",
      timeStyle: "medium"
    });
  }
  update();
  setInterval(update, 1000);
}

/* ----------------------------
   EVENTS
---------------------------- */
function bindEvents() {
  menuSearch.addEventListener("input", (e) => {
    appState.menuSearch = e.target.value;
    renderMenu();
  });

  orderType.addEventListener("change", () => {
    if (orderType.value === "Parcel") {
      tableSelectWrap.style.display = "none";
    } else {
      tableSelectWrap.style.display = "flex";
      renderTableSelectOptions();
    }
  });

  discountInput.addEventListener("input", () => {
    const order = getActiveOrder();
    if (!order) return;
    order.discount = Math.max(Number(discountInput.value || 0), 0);
    saveToStorage();
    renderOrderPanel();
    renderDashboard();
  });

  paymentMethod.addEventListener("change", () => {
    const order = getActiveOrder();
    if (!order) return;
    order.paymentMethod = paymentMethod.value;
    saveToStorage();
  });

  document.getElementById("startOrderBtn").addEventListener("click", startNewOrder);

  document.getElementById("quickNewOrderBtn").addEventListener("click", () => {
    document.querySelector('[data-section="ordersSection"]').click();
    startNewOrder();
  });

  document.getElementById("saveOrderBtn").addEventListener("click", saveActiveOrder);
  document.getElementById("holdOrderBtn").addEventListener("click", holdActiveOrder);
  document.getElementById("resumeOrderBtn").addEventListener("click", resumeOrder);
  document.getElementById("cancelOrderBtn").addEventListener("click", cancelActiveOrder);
  document.getElementById("completePaymentBtn").addEventListener("click", completePayment);
  document.getElementById("printBillBtn").addEventListener("click", printBillForActiveOrder);
  document.getElementById("switchTableBtn").addEventListener("click", switchOrderTable);

  billSearch.addEventListener("input", renderBillHistory);
  billDateFilter.addEventListener("change", renderBillHistory);

  saveBrandBtn.addEventListener("click", () => {
    const name = restaurantNameInput.value.trim();
    const logo = logoUrlInput.value.trim();

    if (!name) {
      alert("Restaurant name cannot be empty.");
      return;
    }

    appState.branding.restaurantName = name;
    appState.branding.logoUrl = logo || "images/logo.png";

    saveToStorage();
    applyBranding();
    alert("Branding saved successfully.");
  });

  addNewItemBtn.addEventListener("click", addCustomItem);

  hamburgerBtn.addEventListener("click", openSidebar);
  closeSidebarBtn.addEventListener("click", closeSidebar);
  mobileOverlay.addEventListener("click", closeSidebar);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeSidebar();
    }
  });

  document.getElementById("resetDemoBtn").addEventListener("click", () => {
    const ok = confirm("This will remove all saved running orders, bills, custom items and table states. Continue?");
    if (!ok) return;

    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.BILLS);
    localStorage.removeItem(STORAGE_KEYS.TABLES);
    localStorage.removeItem(STORAGE_KEYS.BILL_COUNTER);
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_MENU);
    localStorage.removeItem(STORAGE_KEYS.BRANDING);
    location.reload();
  });
}

/* ----------------------------
   RENDER ALL
---------------------------- */
function renderAll() {
  syncTablesWithOrders();
  applyBranding();
  renderCategoryFilters();
  renderMenu();
  renderActiveOrderTabs();
  renderOrderPanel();
  renderDashboard();
  renderTables();
  renderBillHistory();
  renderReports();
  renderCustomItemsTable();
}

/* ----------------------------
   INIT
---------------------------- */
function init() {
  loadFromStorage();
  initNavigation();
  bindEvents();
  startClock();

  if (appState.runningOrders.length && !appState.activeOrderId) {
    appState.activeOrderId = appState.runningOrders[0].id;
  }

  renderAll();
}

init();