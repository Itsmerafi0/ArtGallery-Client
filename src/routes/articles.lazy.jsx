import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getArticles } from "../api/articlesApi"; // Pastikan fungsi ini sudah diimplementasikan
import "/src/styling/articles.css"; // File CSS untuk styling
import "/src/styling/hotarticles.css"; // File CSS untuk styling
import Pagination from "../components/pagination";
import { getHotArticles } from "../api/highlightsApi";

export const Route = createLazyFileRoute("/articles")({
  component: Article,
});

function Article() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [hotArticles, setHotArticles] = useState([]); // Tambahkan state ini

  async function fetchArticlesData(page = 1) {
    setLoading(true);

    try {
      const data = await getArticles(page); // Ambil data dari API
      if (data) {
        const formattedItems = data.data.map((item) => ({
          id: item.id,
          name: item.title,
          description: item.copy,
          update: item.updated_at,
        }));
        setFilteredItems(formattedItems); // Set state dengan data yang diformat
        setNextPageUrl(data.pagination?.next_url || null);
        setPrevPageUrl(data.pagination?.prev_url || null);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchHotArticlesData() {
    try {
      const data = await getHotArticles(); // Ambil data dari API
      if (data) {
        const formattedItems = data.data.map((hot_item) => ({
          id: hot_item.id,
          name: hot_item.title,
          update: hot_item.updated_at,
        }));
        setHotArticles(formattedItems); // Set state dengan data yang diformat
      }
    } catch (error) {
      console.error("Error fetching hot articles:", error);
    }
  }

  useEffect(() => {
    fetchArticlesData();
    fetchHotArticlesData();
  }, []);

  function getPageNumber(url) {
    if (!url) return 1;
    const urlParams = new URLSearchParams(url.split("?")[1]);
    return parseInt(urlParams.get("page")) || 1;
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading articles...</p>
      </div>
    ); // Tampilkan animasi loading
  }

  return (
    <div className="article-container">
      <h1 className="main-title">Articles</h1>
      <div className="content-wrapper">
        {/* Bagian Tengah (Artikel) */}
        <div className="article-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="article-detail">
              <Link
                to="/articlesDetail"
                state={{ itemId: item.id }} // Kirim item.id sebagai state
                className="article-title"
              >
                {item.name} {/* Nama artikel yang bisa diklik */}
              </Link>
              <p className="article-meta">
                Last Updated: {new Date(item.update).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
        <div className="sidebar">
          <h2>Hot Articles</h2>
          <ul>
            {hotArticles.map((hot_item) => (
              <li key={hot_item.id} className="hot-article-item">
                <Link
                  to="/articlesDetail"
                  state={{ itemId: hot_item.id }} // Kirim item.id sebagai state
                  className="hot-article-title"
                >
                  {hot_item.name} {/* Nama artikel yang bisa diklik */}
                </Link>
                <p className="hot-article-meta">
                  Last Updated: {new Date(hot_item.update).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>

          <h2>The Latest</h2>
          <p>Berita terbaru akan ditampilkan di sini.</p>
        </div>{" "}
      </div>

      <Pagination
        prevPageUrl={prevPageUrl}
        nextPageUrl={nextPageUrl}
        fetchData={fetchArticlesData}
        getPageNumber={getPageNumber}
      />
    </div>
  );
}

export default Article;
