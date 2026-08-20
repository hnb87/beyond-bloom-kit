export function waLink(number: string, message: string) {
  const clean = number.replace(/[^\d]/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(number: string, message: string) {
  window.open(waLink(number, message), "_blank", "noopener,noreferrer");
}