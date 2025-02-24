import { useState, useEffect, useContext } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { CartContext } from "../contexts";
import Cart from "../Cart";
import Pizza from "../Pizza";

// format kurs --> intl menerima sebuah angka dan kemudian dia akan nge-format berdasarkan kurs yang dipilih.
const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const Route = createLazyFileRoute("/order")({
  component: Order,
});

function Order() {
  const [ukuranPizza, aturUkuranPizza] = useState("M");
  const [jenisPizza, aturJenisPizza] = useState("");
  const [jenis2Pizza, aturJenis2Pizza] = useState([]);
  const [loading, aturLoading] = useState(true);
  const [cart, aturCart] = useContext(CartContext);
  const [kategoriPizza, aturKategoriPizza] = useState("");

  let price, selectedPizza;
  if (!loading && jenisPizza) {
    selectedPizza = jenis2Pizza.find((pizza) => pizza.id === jenisPizza);
    price = intl.format(selectedPizza.sizes?.[ukuranPizza] || 0);
  }

  async function fetchPizzaTypes() {
    await new Promise((res) => setTimeout(res, 3000));
    const pizzaRes = await fetch("/api/pizzas");
    const pizzasJson = await pizzaRes.json();

    aturJenis2Pizza(pizzasJson);

    // Set kategori default sebagai kategori pertama dari data API
    if (pizzasJson.length > 0) {
      aturKategoriPizza(pizzasJson[0].category);
    }

    aturLoading(false);
  }

  async function checkout() {
    aturLoading(true);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  // Filter jenis pizza berdasarkan kategori yang dipilih
  const filteredPizzas = jenis2Pizza.filter(
    (pizza) => pizza.category === kategoriPizza,
  );

  // Pastikan jenisPizza tetap valid setelah kategori berubah
  useEffect(() => {
    if (filteredPizzas.length > 0) {
      aturJenisPizza(filteredPizzas[0].id);
    }
  }, [kategoriPizza]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading articles...</p>
      </div>
    ); // Tampilkan animasi loading
  }

  return (
    <div className="order">
      <h2>Buat Order Baru</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          aturCart([
            ...cart,
            { pizza: selectedPizza, size: ukuranPizza, price },
          ]);
        }}
      >
        <div>
          <div>
            <label>Kategori Pizza:</label>
            <select
              name="kategori_pizza"
              value={kategoriPizza}
              onChange={(e) => aturKategoriPizza(e.target.value)}
            >
              {[...new Set(jenis2Pizza.map((pizza) => pizza.category))].map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ),
              )}
            </select>
          </div>
          <div>
            <label>Jenis Pizza:</label>
            <select
              name="jenis_pizza"
              value={jenisPizza}
              onChange={(e) => aturJenisPizza(e.target.value)}
            >
              {filteredPizzas.map((pizza) => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.category} - {pizza.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Ukuran Pizza:</label>
            <span>
              <input
                type="radio"
                name="ukuran_pizza"
                value="S"
                id="small"
                checked={ukuranPizza === "S"}
                onChange={(e) => aturUkuranPizza(e.target.value)}
              />
              <label htmlFor="small">Small</label>
            </span>
            <span>
              <input
                type="radio"
                name="ukuran_pizza"
                value="M"
                id="medium"
                checked={ukuranPizza === "M"}
                onChange={(e) => aturUkuranPizza(e.target.value)}
              />
              <label htmlFor="medium">Medium</label>
            </span>
            <span>
              <input
                type="radio"
                name="ukuran_pizza"
                value="L"
                id="large"
                checked={ukuranPizza === "L"}
                onChange={(e) => aturUkuranPizza(e.target.value)}
              />
              <label htmlFor="large">Large</label>
            </span>
          </div>
          <button type="submit">Tambahkan ke Keranjang</button>
        </div>
        selectedPizza && (
        <div className="order-pizza">
          <Pizza
            nama_pizza={selectedPizza.name}
            deskripsi={selectedPizza.description}
            image={selectedPizza.image}
          />
          <p>{price}</p>
        </div>
        )
      </form>
      {loading ? <h2>Loading...</h2> : <Cart cart={cart} checkout={checkout} />}
    </div>
  );
}
