const thaiMap: Record<string, string> = {
  ๅ: "1",
  "/": "2",
  "-": "3",
  ภ: "4",
  ถ: "5",
  "ุ": "6",
  "ึ": "7",
  ค: "8",
  ต: "9",
  จ: "0",
};

export function normalizeBarcode(value: string) {
  return value
    .split("")
    .map((char) => thaiMap[char] ?? char)
    .join("");
}
