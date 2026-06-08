import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <AppRoutes />
      </main>

      <Footer />
    </>
  );
}

export default App;