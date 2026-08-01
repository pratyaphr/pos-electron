const truncateText = (text, maxLength = 25) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const formatNumber = (value) => {
  if (value >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(1).replace(".0", "")}T`;
  }

  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1).replace(".0", "")}B`;
  }

  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(".0", "")}M`;
  }

  if (value >= 10_000) {
    return `${(value / 1_000).toFixed(1).replace(".0", "")}K`;
  }

  return value.toLocaleString();
};

function money(number) {
  return Number(number || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

function formatDateTime(date = new Date()) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

module.exports = {
  money,
  formatDate,
  formatDateTime,
  truncateText,
  formatNumber,
};
