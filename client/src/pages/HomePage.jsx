import FilterSidebar from "../components/FilterSidebar";
import ProductList from "../components/ProductList";

function HomePage() {
  return (
    <div className="app-shell">
      <FilterSidebar />
      <main className="content">
        <ProductList />
      </main>
    </div>
  );
}

export default HomePage;
