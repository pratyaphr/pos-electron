import type { CreateReceiptDto, ReceiptQuery } from "../types";

export async function createReceipt(data: CreateReceiptDto) {
  const result = await window.api.receipts.create(data);
  console.log("createReceipt", result);

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.data;
}

export async function getReceiptList(query: ReceiptQuery) {
  const result = await window.api.receipts.list(query);

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.data;
}

export async function getReceipt(id: string) {
  const result = await window.api.receipts.getById(id);

  if (!result.success) {
    throw new Error(result.message);
  }

  return result;
}

export async function deleteReceipt(id: number) {
  const result = await window.api.receipts.delete(id);

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.data;
}
