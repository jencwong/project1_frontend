export async function getReservations() {
  return fetch("/reservations", {
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
}

export async function postReservation(name, slot) {
  return fetch("/reservation/create", {
    method: "POST",
    body: JSON.stringify({
      name,
      slot
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
}
