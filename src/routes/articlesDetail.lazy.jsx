import {
  createLazyFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getDetailArticles } from "../api/articlesApi";
import { getDetailHotArticles } from "../api/highlightsApi";
import "/src/styling/detailarticles.css";
import "/src/styling/loadinganimation.css";

export const Route = createLazyFileRoute("/articlesDetail")({
  component: ArticelDetailPage,
});

function ArticelDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemId } = location.state || {};

  const [article, setArticle] = useState(null);
  const [hotArticle, setHotArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticleData() {
      if (!itemId) {
        setLoading(true);
        return;
      }

      try {
        // Ambil data dari API pertama (getDetailArticles)
        const articleData = await getDetailArticles(itemId);
        setArticle(articleData?.data || null);

        // Ambil data dari API kedua (getDetailHotArticles)
        const hotArticleData = await getDetailHotArticles(itemId);
        setHotArticle(hotArticleData?.data || null);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticle(null);
        setHotArticle(null);
      } finally {
        setLoading(false);
      }
    }

    fetchArticleData();
  }, [itemId]);

  const handleClose = () => {
    navigate({ to: "/articles" }); // Arahkan ke halaman daftar artikel
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading articles...</p>
      </div>
    ); // Tampilkan animasi loading
  }

  return (
    <div className="article-detail">
      <button className="close-button" onClick={handleClose}>
        &times;
      </button>

      {article && (
        <div className="article-section">
          <h1>{article.title}</h1>
          <p className="meta">
            <span>
              Last Updated: {new Date(article.updated_at).toLocaleDateString()}
            </span>
          </p>
          <div className="content">
            <p>{article.copy}</p>
          </div>
        </div>
      )}

      {hotArticle && (
        <div className="article-section">
          <h1>{hotArticle.title}</h1>
          <p className="meta">
            <span>
              Last Updated:{" "}
              {new Date(hotArticle.updated_at).toLocaleDateString()}
            </span>
          </p>
          <div className="content">
            <p>{hotArticle.copy}</p>
          </div>
        </div>
      )}
    </div>
  );
}
