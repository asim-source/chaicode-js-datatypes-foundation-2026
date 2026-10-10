/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  // Your code here
  let t;
  if (typeof thali !== "object" || Array.isArray(thali) || thali === null)
    return "";
  if (
    !thali.hasOwnProperty("name") ||
    !thali.hasOwnProperty("items") ||
    !thali.hasOwnProperty("price") ||
    !thali.hasOwnProperty("isVeg")
  )
    return "";
  let newNamingSystem = thali.name.toUpperCase();

  let pricing = thali.price.toFixed(2);
  if (thali.isVeg === true) {
    t = "Veg";
  } else {
    t = "Non-Veg";
  }
  let iteming = thali.items.join(", ");

  let ultimate = `${newNamingSystem} (${t}) - Items: ${iteming} - Rs.${pricing}`;
  return ultimate;
}

export function getThaliStats(thalis) {
  // Your code here

  if (!Array.isArray(thalis) || thalis.length === 0) return null;
  let countV = thalis.filter((counting) => {
    if (counting.isVeg === true) return counting;
  });
  let countVeg = countV.length;
  console.log(countVeg);

  let countNV = thalis.filter((NVegi) => {
    if (NVegi.isVeg === false) return NVegi;
  });
  let countNonVeg = countNV.length;

  let countTotal = thalis.length;

  let AvgCount = 0;
  let reduceAnswer = thalis.reduce((acc, obj) => {
    ++AvgCount;
    return acc + obj.price;
  }, 0);

  let totalAverage = reduceAnswer / AvgCount;
  let totalAverageDecimal = totalAverage.toFixed(2);
  let decimalString = String(totalAverageDecimal);

  let totalName = thalis.map((naming) => naming.name);

  let Mpricing = thalis.map((p) => p.price);
  let Minimum = Math.min(...Mpricing);
  let Maximum = Math.max(...Mpricing);

  return {
    totalThalis: countTotal,
    vegCount: countVeg,
    nonVegCount: countNonVeg,
    avgPrice: decimalString,
    cheapest: Minimum,
    costliest: Maximum,
    names: totalName,
  };
}

export function searchThaliMenu(thalis, query) {
  // Your code here
  if (!Array.isArray(thalis) || typeof query !== "string") return [];
  const caseQuery = query.toLowerCase();

  const findThali = thalis.filter((naming) => {
    if (
      naming.name.toLowerCase().includes(caseQuery) ||
      naming.items.some((item) => item.toLowerCase().includes(caseQuery))
    )
      return naming;
  });
  return findThali;
}

export function generateThaliReceipt(customerName, thalis) {
  // Your code here
  if (
    typeof customerName !== "string" ||
    !Array.isArray(thalis) ||
    thalis.length === 0
  )
    return "";
  const newNamingSystem = customerName.toUpperCase();
  const Np = thalis
    .map((Npricing) => {
      return `- ${Npricing.name} x Rs.${Npricing.price}`;
    })
    .join("\n");
  console.log(Np);

  const totality = thalis.reduce((accumulator, tota) => {
    return accumulator + tota.price;
  }, 0);
  const countTotal = thalis.filter((counterPart) => counterPart);
  const totalcount = countTotal.length;

  return `THALI RECEIPT\n---\nCustomer: ${newNamingSystem}\n${Np}\n---\nTotal: Rs.${totality}\nItems: ${totalcount}`;
}
