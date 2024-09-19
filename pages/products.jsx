import { Fragment, useEffect, useRef, useState } from "react";
import CardProduct from "../components/Fragments/CardProduct";
import Button from "../components/Elements/Button";

const products = [
  {
    id: 1,
    name: "Hoodie",
    harga: 85000,
    images: "/images/hoodie.png",
    description: `Hoodie ini terbuat dari bahan katun premium yang lembut dan nyaman, memberikan kehangatan serta sirkulasi udara yang baik. Bahan katun ini juga menyerap keringat dengan efektif.`,
  },
  {
    id: 2,
    name: "Baju Labelling Wanita",
    harga: 105000,
    images: "/images/baju-labelling.png",
    description: `Baju labelling ini terbuat dari bahan berkualitas tinggi seperti katun, polyester, atau campuran keduanya, yang memberikan kenyamanan dan daya tahan saat dipakai.`,
  },
  {
    id: 1,
    name: "Hoodie",
    harga: 85000,
    images: "/images/hoodie.png",
    description: `Hoodie ini terbuat dari bahan katun premium yang lembut dan nyaman, memberikan kehangatan serta sirkulasi udara yang baik. Bahan katun ini juga menyerap keringat dengan efektif.`,
  },
];

const email = localStorage.getItem("email");

const ProductsPage = () => {
  const [cart, setCart] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.harga * item.qty;
      }, 0);
      setTotalHarga(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    window.location.href = "/login";
  };

  const handleAddToCart = (id) => {
    if (cart.find((item) => item.id === id)) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { id, qty: 1 }]);
    }
  };

  // useRef
  const cartRef = useRef(JSON.parse(localStorage.getItem("cart")) || []);
  const handleAddToCartRef = (id) => {
    cartRef.current = [...cartRef.current, { id, qty: 1 }];
    localStorage.setItem("cart", JSON.stringify(cartRef.current));
  };

  const totalHargaRef = useRef(null);

  useEffect(() => { 
    if (cart.length > 0) {
      totalHargaRef.current.style.display = "table-row";
    } else {
      totalHargaRef.current.style.display = "none";
    }
  }, [cart]);

  return (
    <Fragment>
      <div
        className="flex justify-end h-20 bg-blue-600 text-white items-center px-10 rounded-full  ml-5 mr-5 my-5"
        onClick={handleLogout}
      >
        {email}
        <Button classname="ml-5 bg-slate-800 hover:bg-yellow-500 rounded-full">
          Logout
        </Button>
      </div>
      <div className="flex justify-center py-5">
        <div className="w-3/4 flex flex-wrap mx-7">
          {products.map((products) => (
            <CardProduct key={products.id}>
              <CardProduct.Header images={products.images} />
              <CardProduct.Body name={products.name}>
                {products.description}
              </CardProduct.Body>
              <CardProduct.Footer
                harga={products.harga}
                id={products.id}
                handleAddToCart={handleAddToCart}
              />
            </CardProduct>
          ))}
        </div>
        <div className="w-1/4 mr-12">
          <h1 className="text-3xl font-bold text-blue-500 mb-2 pl-5">Cart</h1>
          <table className="table-auto  text-left border-separate border-spacing-x-5 border-spacing-y-3 border-4 ">
            <thead>
              <tr>
                <th>Product</th>
                <th>Harga</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const product = products.find(
                  (product) => product.id === item.id
                );
                return (
                  <tr key={item.id}>
                    <td>{product.name}</td>
                    <td>
                      Rp{" "}
                      {product.harga.toLocaleString("id-ID", {
                        styles: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    <td>{item.qty}</td>
                    <td>
                      Rp{" "}
                      {(item.qty * product.harga).toLocaleString("id-ID", {
                        styles: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                );
              })}
              <tr ref={totalHargaRef}>
                  <td colSpan={3}>
                    <b>Total Harga</b>
                  </td>
                  <td>
                    <b>
                      Rp{" "}
                    {totalHarga.toLocaleString("id-ID", {
                      styles: "currency",
                      currency: "IDR",
                    })}
                    </b>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductsPage;
